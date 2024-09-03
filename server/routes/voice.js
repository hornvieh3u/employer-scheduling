const router = require("express").Router();

const {
  GetVoiceToken,
  PostVoiceToken,
  Twiml,
  VoiceRecording,
  ShowCallHistory,
  Voice,
  VoiceIncomming,
} = require("../controllers/voice");

router.get("/voice/token", GetVoiceToken);

router.post("/voice/token", PostVoiceToken);

router.post("/twiml", Twiml);

router.post("/voice_recording", VoiceRecording);

router.get("/showCallHistory/:user_id", ShowCallHistory);

router.post("/voice", Voice);

router.post("/voice/incoming", VoiceIncomming);

module.exports = router;
