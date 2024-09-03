/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { Authenticate, EmployeeContact, User } = require("../../models/index/index");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log('eeee', token);
  if (!token) {
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: No token provided" } },
    });
  }

  try {
    const tokenDetails = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    let employeeDetails, firstName, lastName;
    if (tokenDetails.user.employeeId) {
      employeeDetails = await EmployeeContact.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(tokenDetails.user.employeeId),
          },
        },
      ]);
      firstName = employeeDetails[0].fullName.split(" ")[0];
      lastName = employeeDetails[0].fullName.split(" ")[1]
        ? employeeDetails[0].fullName.split(" ")[1]
        : "";

      req.user = {
        ...tokenDetails,
        firstName: firstName,
        lastName: lastName,
        email: employeeDetails[0].email,
        phone: employeeDetails[0].phone,
        location: employeeDetails[0].location,
      };
      next();
    } else {
      userDetails = await Authenticate.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(tokenDetails._id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "userId",
            as: "user",
          },
        },
      ]);

      const userOrgDetails = await User.findOne({ _id: userDetails[0].user[0]._id }).populate(
        "organizationId"
      );

      req.user = {
        ...tokenDetails,
        firstName: userDetails[0].user[0].firstName,
        lastName: userDetails[0].user[0].lastName,
        email: userDetails[0].email,
        phone: userDetails[0].phone,
        location: userDetails[0].location,
        organization: {
          name: userOrgDetails?.organizationId?.name || null,
          path: userOrgDetails?.organizationId?.path || null,
          url: userOrgDetails?.organizationId?.url || null,
        },
      };
      next();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: Invalid token" } },
    });
  }
};
