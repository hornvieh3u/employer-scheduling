const DocumentRecipient = require("../../models/DocumentRecipient");

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const { token, hashCode } = req.query;
  if (!token) {
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: No token provided" } },
    });
  }
  try {
    const data = await DocumentRecipient.find({
      "recipients.auth.token": token,
      "recipients.hashCode": hashCode,
    });
    if (data) {
      next();
    } else {
      return res.status(404).json({ message: "Access Denied: Invalid token" });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: Invalid token" } },
    });
  }
};
