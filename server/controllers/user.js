const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { User } = require("../models/index/index");
const tokenGenerate = require("../Utilities/generateToken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, parseInt(10, 10));

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const user = tokenGenerate(newUser);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ errors: { common: { msg: "Internal server error!" } } });
  }
};

const addOrUpdateLocation = async (req, res) => {
  try {
    const { userId } = req.body;
    let { location } = req.body;
    if (!Array.isArray(location) && typeof location === "string") {
      location = [location];
    }
    const locationMapped = location.map((l) => ({ name: l }));
    const data = await User.findOneAndUpdate(
      { userId: mongoose.Types.ObjectId(userId) },
      { location: locationMapped }
    );
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `User not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userInfo = await User.find({});
    if (userInfo.length) {
      return res.status(200).json({ success: true, data: userInfo });
    }
    return res.status(404).json({ success: false, message: `User info is empty!` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const Obj = req.body;
    ["userId", "location"].map((el) => delete Obj[el]);
    const data = await User.findOneAndUpdate({ userId: mongoose.Types.ObjectId(userId) }, Obj);
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `User not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const userDetailsByUserId = async (req, res) => {
  try {
    const { _id } = req.user;
    const userDetails = await User.find({ userId: _id });
    return res.status(200).send(userDetails);
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    userDetails = await User.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "organizations",
          localField: "organizationId",
          foreignField: "_id",
          as: "organization",
        },
      },
    ]);
    return res.status(200).send(userDetails);
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

module.exports = {
  signup,
  addOrUpdateLocation,
  getUserDetails,
  updateUserDetails,
  userDetailsByUserId,
  getByUserId,
};
