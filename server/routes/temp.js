const router = require("express").Router();

const { sendOTP } = require("../controllers/temp");
const { sendOTPValidator } = require("../validators/temp");
const results = require("../validators");

router.post("/send-otp", sendOTPValidator, results, sendOTP);

module.exports = router;
