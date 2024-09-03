const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const { SendMail } = require("../service/sendMail");

exports.sendUploadEmail = ({ from, recipient, subject, body, replyTo }) => {
  SendMail({
    from,
    recipient,
    subject,
    body,
    replyTo,
  });
};

module.exports.uploadFile = async (req, res) => {
  try {
    // console.log(req.file.location);
    let url;

    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);

      // Send Email
      // this.sendUploadEmail({
      //   from: `${senderName} via MyManager <hello@mymanager.com>`,
      //   recipient: r.email,
      //   subject:
      //     docMessage && docMessage.subject !== ""
      //       ? docMessage.subject
      //       : `New document from ${sender}`,
      //   body: r.emailBody,
      //   replyTo: sender,
      // });
    }
    return res.json({
      url: url,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      url: "https://pngimg.com/uploads/qr_code/qr_code_PNG33.png",
    });
  }
};
