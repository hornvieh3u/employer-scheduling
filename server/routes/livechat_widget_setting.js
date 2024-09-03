const express = require("express");
const router = express.Router();

const {
  set_livechat_widget_setting,
  get_livechat_widget_setting,
} = require("../controllers/livechat_widget_setting");

router.post("/livechat/setting", set_livechat_widget_setting);
router.get("/livechat/setting/:userId", get_livechat_widget_setting);

module.exports = router;
