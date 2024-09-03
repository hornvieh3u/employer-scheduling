/* eslint-disable prefer-arrow-callback */
const socket_connections = [];

// Event emitter for sending and receving custom events
const EveEmitter = require("events").EventEmitter;

const EventEmitter = new EveEmitter();

EventEmitter.on("io-event", function (eventOption) {
  // do something here like broadcasting data to everyone
  // or you can check the connection with some logic and
  // only send to relevant user
  const { event, payload, adminId } = eventOption;
  if (!adminId) {
    // send only those destination where data to send
    return false;
  }

  // send each Event ***********************************
  socket_connections.forEach(function (connection) {
    const { socket, adminId } = connection;
    if (String(adminId) === String(adminId)) {
      socket.emit(event, payload);
    }
  });
});

module.exports = { EventEmitter, socket_connections };
