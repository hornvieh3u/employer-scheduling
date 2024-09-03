const { socket_connections } = require("../service/socket-sender");

const adminSockets = {};
const clientSockets = {};
const socket2adminId = {};
const socket2clientId = {};
// const adminSocketArray = [];
const Channel = require("../models/channel");
const LivechatContact = require("../models/LivechatContact");
const Ticket = require("../models/Ticket");

// const { replyMessage } = require("../controllers/ticket");

// eslint-disable-next-line func-names
const socketRoute = function (io) {
  // eslint-disable-next-line global-require
  const app = require("express");
  const router = app.Router();
  let emitSocket = [];

  router.post("/api/ticket/reply", async (req, res) => {
    const {
      // from,
      to,
      // subject,
      body,
      // date
    } = req.body;
    // Parse toEmail to get UserId
    const ticketId = to.split("@")[0].substring(6);

    const sentences = body.split("\n");
    let resMessage = "";
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sentences.length; i++) {
      if (
        sentences[i].includes("On") &&
        sentences[i].includes("wrote:") &&
        sentences[i].includes("@")
      ) {
        break;
      }
      if (
        sentences[i].includes("On") &&
        sentences[i + 1].includes("wrote:") &&
        sentences[i + 1].includes("@")
      ) {
        break;
      }
      resMessage = resMessage.concat(sentences[i]);
    }

    const result = await Ticket.findByIdAndUpdate(ticketId, {
      $push: {
        messages: {
          sender: "requester_msg",
          msg: resMessage,
        },
      },
    });

    emitSocket.forEach((connection) =>
      connection.emit("newEmail", {
        reqName: result.reqName,
        message: resMessage,
      })
    );

    res.json(result);
  });

  function notifyEmail({ adminId, reqName, message }) {
    if (socket_connections.filter((connection) => connection.adminId === adminId).length > 0) {
      socket_connections.forEach((connection) => {
        connection.socket.emit("newEmail", { reqName, message });
      });
    }
  }

  function notifyStartChat(machineId, adminId, contactInfo) {
    if (adminSockets[adminId]) {
      // eslint-disable-next-line guard-for-in
      for (const key in adminSockets[adminId]) {
        socket.to(key).emit("startChat", { machineId, contactInfo });
      }
    }
    // Broadcast to all clients for starting chat
    if (clientSockets[adminId][machineId]) {
      for (let key in clientSockets[adminId][machineId]) {
        socket.emit("endChat", {});
      }
    }
  }

  io.of(`/${process.env.APPNAME}`).on("connection", function (socket) {
    emitSocket.push(socket);
    socket.on("client-connect", ({ adminId }) => {
      console.log("socket client connect");
      socket_connections.push({ adminId, socket });
    });

    console.log("user COnnection established with namespace", process.env.APPNAME);

    socket.emit("ready-client", {
      message: "Wellcome from server",
    });

    // ** Chat Socket event
    socket.on("adminRegister", (adminId) => {
      if (!adminId) return;
      socket_connections.push({ adminId, socket });
      console.log("[SOCKET] ADMIN REGISTER: ", adminId, socket.id);
      if (!adminId) return;
      if (!adminSockets[adminId]) adminSockets[adminId] = {};
      adminSockets[adminId][socket.id] = adminId;
      socket2adminId[socket.id] = adminId;
      console.log("admin socket status", adminSockets, socket2adminId);
    });

    socket.on("disconnect", () => {
      console.log("[SOCKET] DISCONNECTED");
      console.log("close event");
      emitSocket = emitSocket.filter((connection) => connection.id !== socket.id);
      if (socket2adminId[socket.id]) {
        const adminId = socket2adminId[socket.id];
        delete socket2adminId[socket.id];
        if (adminSockets[adminId] && adminSockets[adminId][socket.id]) {
          delete adminSockets[adminId][socket.id];
        }
      }

      if (socket2clientId[socket.id]) {
        const { adminId, machineId } = socket2clientId[socket.id];
        delete socket2clientId[socket.id];
        if (
          clientSockets[adminId] &&
          clientSockets[adminId][machineId] &&
          clientSockets[adminId][machineId][socket.id]
        ) {
          delete clientSockets[adminId][machineId][socket.id];
        }
      }
    });

    socket.on("clientRegister", ({ adminId, machineId }) => {
      console.log("[SOCKET] Client Register", { adminId, machineId });
      if (!adminId || !machineId) return;
      if (!clientSockets[adminId]) clientSockets[adminId] = {};
      if (!clientSockets[adminId][machineId]) clientSockets[adminId][machineId] = {};
      clientSockets[adminId][machineId][socket.id] = socket.id;
      socket2clientId[socket.id] = { adminId, machineId };
      console.log("clientSocket status", clientSockets, socket2clientId);

      // socket.to(clientSockets[adminId][machineId]).emit('adminMsgRev', 'aaaaaa');
    });

    socket.on("startChat", async ({ adminId, machineId, userInfo, locationInfo, browserInfo }) => {
      // Save the channel to DB.
      // If there exists a old channel which has same machinId and adminId, updates its username and email then add a prechat messsage
      // If no old channel exists, make new channel!!
      console.log("[SOCKET] Start chat: ", {
        adminId,
        machineId,
        userInfo,
        locationInfo,
        browserInfo,
      });
      const oldContact = await LivechatContact.findOne({
        email: userInfo.email,
      });
      if (oldContact) {
        await LivechatContact.findOneAndUpdate(
          { email: userInfo.email },
          {
            adminId: adminId,
            fullName: userInfo.username,
            email: userInfo.email,
            phoneNumber: userInfo.phoneNumber,
            address: userInfo.address,
          }
        );
      } else {
        const newContact = new LivechatContact({
          adminId: adminId,
          fullName: userInfo.username,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
          address: userInfo.address,
        });
        await newContact.save();
      }

      const contact = await LivechatContact.findOne({
        email: userInfo.email,
      });

      const oldChannel = await Channel.findOne({ machineId, adminId });
      if (oldChannel) {
        await Channel.updateOne(
          { machineId, adminId },
          {
            username: userInfo.username,
            email: userInfo.email,
            locationInfo: locationInfo,
            browserInfo: browserInfo,
            contactId: contact.id,
            activated: true,
            $push: {
              messages: {
                type: "PreChatForm",
                msg: JSON.stringify(userInfo),
              },
            },
          }
        );
      } else {
        const newChannel = new Channel({
          machineId,
          adminId,
          username: userInfo.username,
          locationInfo: locationInfo,
          browserInfo: browserInfo,
          email: userInfo.email,
          contactId: contact.id,
          activated: true,
          messages: [
            {
              type: "PreChatForm",
              msg: JSON.stringify(userInfo),
            },
          ],
        });
        await newChannel.save();
      }

      const channel = await Channel.findOne({ machineId, adminId });

      // Broadcast to all admins for starting chat
      if (adminSockets[adminId]) {
        for (let key in adminSockets[adminId]) {
          socket.to(key).emit("startChat", { channelId: channel._id, userInfo });
        }
      }
      console.log("client socket", clientSockets[adminId][machineId]);
      // Broadcast to all clients for starting chat
      if (clientSockets[adminId][machineId]) {
        for (let key in clientSockets[adminId][machineId]) {
          // socket.to(key).emit("startChat", userInfo);
          socket.emit("startChat", { userInfo, channelId: channel._id });
        }
      }
    });

    socket.on("endChat", async ({ machineId, adminId }) => {
      console.log("[SOCKET] End Chat: ", { machineId, adminId });
      const channel = await Channel.findOne({ machineId, adminId });
      if (channel) {
        console.log("old channel found");
        await Channel.updateOne(
          { machineId, adminId },
          {
            activated: false,
            $push: {
              messages: {
                type: "PostChatForm",
                msg: JSON.stringify({
                  rate: 4, // TODO: This is temp rate.
                }),
              },
            },
          }
        );
      }

      // Broadcast to all admins for starting chat
      if (adminSockets[adminId]) {
        for (let key in adminSockets[adminId]) {
          socket.to(key).emit("endChat", { machineId });
        }
      }

      // Broadcast to all clients for starting chat
      if (clientSockets[adminId][machineId]) {
        for (let key in clientSockets[adminId][machineId]) {
          socket.emit("endChat", {});
        }
      }
    });

    socket.on("adminMsgSend", async ({ channelId, message }) => {
      const oldChannle = await Channel.findById(channelId);
      const adminId = oldChannle.adminId;
      const machineId = oldChannle.machineId;

      if (clientSockets[adminId][machineId]) {
        console.log("adminMsg", message, clientSockets[adminId][machineId]);
        for (let key in clientSockets[adminId][machineId]) {
          socket.to(key).emit("adminMsgRev", message);
        }
      }

      if (adminSockets[adminId]) {
        for (let key in adminSockets[adminId]) {
          socket.to(key).emit("adminMsgRev", { channelId, message }); // sent to admin
        }
      }
      socket.emit("adminMsgRev", { channelId, message });

      // Save message to DB.
      await Channel.findByIdAndUpdate(channelId, {
        $push: {
          messages: {
            type: "adminMessage",
            msg: message,
          },
        },
      });
    });

    socket.on("clientMsgSend", async ({ machineId, adminId, msg, userInfo }) => {
      console.log("[SOCKET] Client message: ", machineId, adminId, msg, userInfo);

      // Save client message to DB.

      const channel = await Channel.findOneAndUpdate(
        { machineId, adminId },
        {
          $push: {
            messages: {
              type: "customerMessage",
              msg: msg,
            },
          },
        }
      );

      if (adminSockets[adminId]) {
        for (let key in adminSockets[adminId]) {
          socket.to(key).emit("clientMsgRev", { channelId: channel._id, machineId, msg, userInfo }); // sent to admin
        }
      }

      if (clientSockets[adminId][machineId]) {
        for (let key in clientSockets[adminId][machineId]) {
          socket.emit("clientMsgRev", msg);
        }
      }
    });

    /*************** Task Proof ****************/
    socket.on("uploadProof", async (data) => {
      const { selectedTask, todo, url, employeeInfo } = data;
      if (!selectedTask) return;
      const { userId } = selectedTask;
      let toSendData = {
        taskName: selectedTask.taskName,
        subTaskName: todo.title,
        proofType: todo.proofType,
        startDate: selectedTask.startDate,
        endDate: todo.dateTime,
        employeeInfo: employeeInfo,
        photo: url,
      };
      console.log(toSendData);
      for (let key in adminSockets[userId]) {
        socket.to(key).emit("receiveWorkProof", { ...toSendData }); // sent to admin
      }
    });

    /************* End Task Proof **************/
  });

  return router;
};

module.exports = { socketRoute, adminSockets, clientSockets, socket2adminId, socket2clientId };
