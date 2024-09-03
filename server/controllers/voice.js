const config = require("../Utilities/voice/config");
const { voiceToken } = require("../Utilities/voice/voiceToken");
const { VoiceResponse } = require("twilio").twiml;
const VoiceRecord = require("../models/Voice");
const Deposit = require("../models/Deposit");

const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};

exports.GetVoiceToken = (req, res) => {
  const identity = req.query.identity;

  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
};

exports.PostVoiceToken = (req, res) => {
  const identity = req.body.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
};

exports.Twiml = (req, res) => {
  let { recording, user_id, To } = req.body;

  try {
    if (recording == "true") {
      // console.log("true calling");
      response = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
          <Dial callerId='+15617695425'  recordingStatusCallback='https://f39c-206-84-188-12.in.ngrok.io/api/voice/voice_recording?user_id=${
            user_id + "," + To
          }'  record='record-from-ringing' >+923058384818</Dial>
          <Say>Goodbye</Say>
      </Response>`;

      let data = {
        recording_url: "",
        user_id: "",
        num: req.body.To,
        duration: "",
      };
      // VoiceRecord(data).save()
      //   .then((item) => res.send({ success: true, data: item }))
      res.send(response);
    } else {
      response = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Dial callerId='+15617695425'>+19162956994</Dial>
        <Say>bilal Goodbye</Say>
    </Response>`;

      res.send(response);
    }
  } catch (e) {
    res.json({ success: false, msg: "Server Error" });
    // console.log("e", e);
  }
};

exports.VoiceRecording = async (req, res) => {
  try {
    // let url = `/voice_recording?user_id=606aea95a145ea2d26e0f1ab,+18323041166b`;

    let data = {
      recording_url: req?.body?.RecordingUrl,
      user_id: req?.url?.split("?user_id=")[1].split(",")[0],
      num: req?.url?.split("?user_id=")[1].split(",")[1],
      duration: req?.body?.RecordingDuration,
    };

    await VoiceRecord(data)
      .save()
      .then((item) => {
        res.json({ success: true, data: item });
      });

    // subtracts credits on call end
    let callDuration = +req?.body?.RecordingDuration / 60;

    let creditsSubtract =
      callDuration.toFixed(0) == 0
        ? 2
        : callDuration.toFixed(0) == 1
        ? 2
        : callDuration.toFixed(0) == 2
        ? 4
        : callDuration.toFixed(0);

    const doesUserExist = await Deposit.findOne({
      user_id: req?.url?.split("?user_id=")[1].split(",")[0],
    });

    if (doesUserExist) {
      // let findUser = await Deposit.findById({user_id})

      let creditsInfo = await Deposit.findByIdAndUpdate(
        doesUserExist._id,
        { $inc: { cretits: -2 } },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        success: true,
        data: creditsInfo,
      });
    } else {
      Deposit(req.body)
        .save()
        .then((item) => res.json({ success: true, data: item }));
    }
  } catch (e) {
    res.json({ success: false, data: "Something went wrong" });
  }
};

exports.ShowCallHistory = async (req, res) => {
  let { user_id } = req.params;
  try {
    let record = await VoiceRecord.find({ user_id: user_id });
    if (record) {
      res.status(200).json({
        success: true,
        data: record,
      });
    } else {
      res.json({ success: false, data: "Something went wrong" });
    }
  } catch (e) {}
};

exports.Voice = async (req, res) => {
  const To = req.body.To;
  const response = new VoiceResponse();
  const dial = response.dial({ callerId: config.twilio.callerId });
  dial.number(To);
  res.set("Content-Type", "text/xml");
  res.send(response.toString());
};

exports.VoiceIncomming = async (req, res) => {
  const response = new VoiceResponse();
  const dial = response.dial({
    callerId: req.body.From,
    answerOnBridge: true,
  });
  dial.client("phil");
  res.set("Content-Type", "text/xml");
  res.send(response.toString());
};
