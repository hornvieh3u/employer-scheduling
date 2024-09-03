const { UserToken } = require("../models/index/index");
const jwt = require("jsonwebtoken");
const validateRefreshToken = require("../Utilities/verifyRefreshToken");

exports.verifyRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(500).json({
      errors: { common: { msg: "Please provide a valid refresh token" } },
    });
  }

  validateRefreshToken(refreshToken)
    .then(({ tokenDetails }) => {
      const accessToken = jwt.sign({ _id: tokenDetails._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    })
    .catch((err) => res.status(400).json(err));
};

exports.invalidRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(500).json({
        errors: { common: { msg: "Please provide a valid refresh token" } },
      });
    }

    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken)
      return res.status(200).json({ success: "Invalidate refresh token successfull" });

    await userToken.remove();
    return res.status(200).json({ success: "Invalidate refresh token successfull" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
