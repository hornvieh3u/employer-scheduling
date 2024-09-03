const LoginHistory = require("./../models/LogHistory");
module.exports.saveLoginHistory = async (userData) => {
  try {
    // save login history
    const { isAdmin, _id } = userData;
    if (isAdmin) {
      await new LoginHistory({
        adminId: _id,
        username: "",
        ip: "",
        location: "",
      }).save();
    } else {
      await new LoginHistory({
        adminId: userData.adminId,
        username: "",
        ip: "",
        location: "",
      }).save();
    }
  } catch (error) {}
};
