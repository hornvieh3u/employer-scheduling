const jwt = require("jsonwebtoken");
const { UserToken } = require("../models/index/index");

module.exports = async ({ _id, user }) => {
  try {

    const accessToken = jwt.sign({ _id, user }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "7d",
    });

    const userToken = await UserToken.findOne({ userId: _id });
    if (userToken) await userToken.remove();

    await new UserToken({ userId: _id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};
