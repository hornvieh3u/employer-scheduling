const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { Document, DocumentRecipient } = require("../models/index/index");
const { SendMail } = require("../service/sendMail");
const { documentEmailTemplate } = require("../constants/emailTemplates");

exports.sendDocumentEmail = ({ from, recipient, subject, body, replyTo }) => {
  // const subject = {
  //   new: `${senderName} sent you a new document`,
  //   reminder: "Reminder for your document",
  //   viewed: `${senderName} viewed your document`,
  //   completed: `Your document is completed`,
  //   expired: `Your document is voided`
  // }

  SendMail({
    from,
    recipient,
    subject,
    body,
    replyTo,
  });
};

exports.addRecipientsWithSignatures = asyncHandler(async (req, res) => {
  let { documentId } = req.params;
  const { recipients, properties, docMessage, title } = req.body;
  const { email: sender, _id } = req.user;
  try {
    documentId = mongoose.Types.ObjectId(documentId);
    const document = await Document.findById(documentId);
    const payload = {
      sender,
      documentId,
      documentUrl: document.cloudUrl,
      recipients,
      properties,
      docMessage,
      userId: _id,
      title,
    };
    await DocumentRecipient.create(payload);
    return res.status(200).send({ success: true });
  } catch (err) {
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

exports.editDocumentById = asyncHandler(async (req, res) => {
  const { sendEmail } = req.query;
  let { documentId } = req.params;
  documentId = mongoose.Types.ObjectId(documentId);
  const { recipients, docMessage } = req.body;
  try {
    const data = await DocumentRecipient.findOneAndUpdate({ documentId }, req.body, { new: true });
    if (sendEmail && sendEmail === "true") {
      const { firstName, lastName, email: sender } = req.user;
      const senderName = `${firstName} ${lastName}`;
      const allRecipients = recipients.map((r) => {
        const emailBody = documentEmailTemplate({
          type: `new`,
          senderName,
          docLink: r.url,
          senderEmail: sender,
          recipientName: r.name,
          message: docMessage && docMessage.message !== "" ? docMessage.message : "",
        });
        return { email: r.email, url: r.url, emailBody };
      });

      allRecipients.forEach((r) => {
        this.sendDocumentEmail({
          from: `${senderName} via MyManager <hello@mymanager.com>`,
          recipient: r.email,
          subject:
            docMessage && docMessage.subject !== ""
              ? docMessage.subject
              : `New document from ${sender}`,
          body: r.emailBody,
          replyTo: sender,
        });
      });
    }
    if (data) {
      return res.status(200).json({ success: true, data });
    }
    return res
      .status(404)
      .json({ success: false, message: `Document with id: ${documentId} not found` });
  } catch (err) {
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

exports.resendEmails = asyncHandler(async (req, res) => {
  try {
    let { ids } = req.body;
    ids = ids.map((id) => mongoose.Types.ObjectId(id));

    const documents = await DocumentRecipient.find({
      documentId: { $in: ids },
      $and: [{ "recipients.isDone": { $ne: "true" } }],
    });

    if (documents.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: `No matching documents found, hence nothing deleted` });
    }
    const { firstName, lastName, email: sender } = req.user;
    const senderName = `${firstName} ${lastName}`;
    const allRecipients = [];
    documents.forEach((document) => {
      document.recipients.forEach((r) => {
        if (r.isDone !== true) {
          const emailBody = documentEmailTemplate({
            type: `reminder`,
            senderName,
            docLink: r.url,
            senderEmail: sender,
            recipientName: r.name,
            message: "",
          });
          allRecipients.push({ email: r.email, url: r.url, emailBody });
        }
      });
    });
    allRecipients.forEach((r) => {
      this.sendDocumentEmail({
        from: `${senderName} via MyManager <hello@mymanager.com>`,
        recipient: r.email,
        subject: `Reminder for document from ${sender}`,
        body: r.emailBody,
        replyTo: sender,
      });
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
