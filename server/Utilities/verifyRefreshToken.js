const jwt = require("jsonwebtoken");
const { UserToken } = require("../models/index/index");

// eslint-disable-next-line arrow-body-style
module.exports = (refreshToken) => {
  return new Promise((resolve, reject) => {
    UserToken.findOne({ token: refreshToken }, (err, doc) => {
      if (!doc) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ error: true, message: "Invalid refresh token" });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        // eslint-disable-next-line consistent-return, no-shadow
        (err, tokenDetails) => {
          if (err) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({ error: true, message: "Invalid refresh token" });
          }
          resolve({
            tokenDetails,
            error: false,
            message: "Valid refresh token",
          });
        }
      );
    });
  });
};
