const nodemailer = require("nodemailer");
require("dotenv").config();

const pemKey = process.env.NODEMAILER_PRIVATE_KEY?.replace(/\\n/g, "\n").replace(/"+/g, "");
const nodemailerOptions = {
  host: process.env.NODEMAILER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  use_authentication: true,
  replyTo: "postmaster@mymanager.com",
  dkim: {
    domainName: "mymanager.com",
    keySelector: "mail",
    privateKey: pemKey,
  },
};

const SendMail = async ({
  from = `"My Manager" <hello@mymanager.com>`,
  recipient,
  subject = ``,
  text = ``,
  body = ``,

  attachments = [],
  replyTo = "postmaster@mymanager.com",
}) => {
  const transporter = nodemailer.createTransport(nodemailerOptions);
  const mailOptions = {
    from,
    to: recipient,
    subject,
    text,
    html: body,
    attachments,
    replyTo
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log("Email Sending failed", error);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Email sent successfully ${info.response} ${subject}`);
    }
  });
};

module.exports = { SendMail };
