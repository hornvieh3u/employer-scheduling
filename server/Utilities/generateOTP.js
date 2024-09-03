const { SendMail } = require("../service/sendMail");
const { sendPhoneOtp } = require("../service/sendSms");
const { countryCodes } = require("../constants/countrycode");
const { otpVerificationBody } = require("../constants/emailTemplates");

const generateOTP = () => {
  const _ = String(Math.random()).split(".")[1].split("");
  const l = _.length;
  return `${_[l - 1]}${_[l - 2]}${_[l - 3]}${_[l - 4]}`;
};

async function sendEmailVerification(recipient, otp) {
  try {
    const verificationBody = otpVerificationBody(otp);
    await SendMail({
      recipient,
      subject: `OTP Code`,
      text: `Let us verify that its you!`,
      body: verificationBody,
    });
    // eslint-disable-next-line no-console
    console.log("Sending.. Email");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Email OTP not Send ! Error");
  }
}

async function phoneOtpSend({ name, phone, otp, countryCode }) {
  try {
    const country = countryCodes.find(
      (x) => String(x.code).toLowerCase() === String(countryCode).toLowerCase()
    );

    if (!country) {
      console.log("Country Code Data not found ");
      return;
    }

    let number = phone;
    let dialCode = country.dial_code;
    //take Last digit of country code
    const dialCodeArray = String(country.dial_code).split("");
    if (dialCodeArray[dialCodeArray.length - 1] === phone[0]) {
      // remove country code first digit of number
      number = String(phone)
        .split("")
        .filter((x, i) => i !== 0)
        .join("");
    }

    let formatedPhoneNumber = `${dialCode}${number}`;
    console.log("Formated data", formatedPhoneNumber);

    console.log("sending otp to phone", name, phone, otp, countryCode, country);

    // send Otp
    sendPhoneOtp({ number: formatedPhoneNumber, dialCode, otp, name });
  } catch (error) {
    console.log("Otp not send", error);
  }
}

module.exports = { sendEmailVerification, generateOTP, phoneOtpSend };
