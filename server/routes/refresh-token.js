const router = require("express").Router();
const { verifyRefreshToken, invalidRefreshToken } = require("../controllers/refreshToken");

router.post("/", verifyRefreshToken);

// logout
router.delete("/invalid-refresh-token", invalidRefreshToken);

module.exports = router;
