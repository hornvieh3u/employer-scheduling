const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
// const { EventEmitter } = require("./../service/socket-sender");
const config = {};
const { MarketingEmail } = require("../models/index/index");

const { findSecondsDifference } = require("../helper/findSecondsDifference");
const { SendMail } = require("../service/sendMail");
const { agenda } = require("../Utilities/agenda");

// eslint-disable-next-line no-path-concat, prefer-template
dotenv.config({ path: __dirname + "../.env" });

function watchStream(models) {
  models.forEach(() => {
    // const stream = each.model.watch();
    // stream.on('change', ({ fullDocument: doc }) => {
    // EventEmitter.emit('io-event', { event: each.event, payload: doc });
    // });
  });
}

// Schema
// Load All Model
const streamFiles = new Promise((resolve) => {
  fs.readdir("./models", (err, files) => {
    if (err) throw Error("Error Reading File");
    const fileArray = [];
    for (const file of files) {
      const name = String(file).split(".")[0].toLowerCase();
      fileArray.push({
        event: name,
        // eslint-disable-next-line import/no-dynamic-require, global-require
        model: require(`./../models/${String(file).split(".")[0]}`),
      });
    }
    resolve(fileArray);
  });
});

// DB Connection
config.__db_conect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { connection } = mongoose;
    connection.once("open", async () => {
      // eslint-disable-next-line no-console
      console.log(`Mongodb Connected`);
      const files = await streamFiles;
      watchStream(files);

      //  Fetch all pending mail request and define agenda job
      const mails = await MarketingEmail.find({
        status: { $in: ["scheduled"] },
        isDeleted: false,
      }).lean();
      mails.forEach((mail) => {
        // check if mail still exists
        const mailUpdated = MarketingEmail.findById(mail._id).lean();
        if (!mailUpdated || mailUpdated.isDeleted) {
          return;
        }

        const futureDate = new Date(mail.timestamp);
        const secsFromNow = findSecondsDifference(new Date(), futureDate);
        // eslint-disable-next-line no-console
        console.log("secsFromNow", secsFromNow);

        // eslint-disable-next-line no-unused-vars
        agenda.define(`${mail._id}-[SEND_MAIL]`, async (job) => {
          const payload = {
            // from : from  // temporary ignore
            recipient: mail.to,
            subject: mail.subject,
            text: mail.message,
            body: mail.message,
            attachments: mail.attachments.map((attachment) => ({
              filename: attachment.name,
              path: attachment.url,
            })),
          };
          // eslint-disable-next-line no-console
          console.log("SENT MAIL", payload);
          SendMail(payload);

          // Update status to sent
          let mailStatus = new Set(mail.status);
          mailStatus.add("sent");
          mailStatus.delete("scheduled");
          mailStatus = [...mailStatus];
          MarketingEmail.updateOne({ _id: mail._id }, { status: mailStatus }).lean();
        });
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error Occured", error);
  }
};

module.exports = config;
