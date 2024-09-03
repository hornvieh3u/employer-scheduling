const { Booking, BookingType } = require("../models/index/index");

function generateLink(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
exports.createBooking = (req, res) => {
  const bookingData = req.body;
  bookingData.userId = req.user._id;
  const newBooking = new Booking(bookingData);
  newBooking.save((err, data) => {
    if (err) {
      return res.send({ msg: err.message, success: false });
    }
    return res.send({ msg: "booking created successfully", success: true, data });
  });
};

exports.updateBooking = (req, res) => {
  const bookingData = req.body;
  const bookingId = req.params.id;
  bookingData.userId = req.user._id;
  Booking.findByIdAndUpdate(bookingId, { $set: req.body })
    .then(() => {
      res.send({ msg: "booking updated successfuly", success: true });
    })
    .catch(() => {
      res.send({ msg: "booking not updated!", success: false });
    });
};

exports.getBooking = (req, res) => {
  const userId = req.user._id;
  Booking.find({ userId })
    .then((data) => {
      res.send({ data, success: true });
    })
    .catch((err) => {
      res.send({ msg: err.message, success: false });
    });
};

exports.deleteBooking = (req, res) => {
  const bookingId = req.params.id;
  Booking.findByIdAndUpdate(bookingId, { $set: { isDeleted: true } })
    .then(() => {
      res.send({ msg: "booking deleted successfully", success: true });
    })
    .catch((err) => {
      res.send({ msg: err.message, success: false });
    });
};

exports.createBookingType = (req, res) => {
  const bookingTypeData = req.body;
  bookingTypeData.link = generateLink(6);
  const newBookingType = new BookingType(bookingTypeData);

  newBookingType.save((err, data) => {
    if (err) {
      return res.send({ msg: err.message, success: false });
    }
    return res.send({ msg: "booking type created successfully", success: true, data });
  });
};

exports.updateBookingType = (req, res) => {
  const bookingTypeData = req.body;
  const bookingTypeId = req.params.id;
  BookingType.findByIdAndUpdate(bookingTypeId, {
    ...bookingTypeData,
  })
    .then(() => {
      res.send({ msg: "booking updated successfuly", success: true });
    })
    .catch(() => {
      res.send({ msg: "booking not updated!", success: false });
    });
};

exports.getBookingType = (req, res) => {
  BookingType.find({ isDeleted: false })
    .then((data) => {
      res.send({ data, success: true });
    })
    .catch((err) => {
      res.send({ msg: err.message, success: false });
    });
};

exports.getBookingTypeDetail = async (req, res) => {
  const { link } = req.params;
  try {
    const bookingType = await BookingType.findOne({ link, isDeleted: false });
    if (!bookingType) {
      res.status(404).json({ msg: "Not Found" });
    }
    return res.send({ data: bookingType, success: true });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.deleteBookingType = (req, res) => {
  const bookingTypeId = req.params.id;
  BookingType.findByIdAndUpdate(bookingTypeId, { $set: { isDeleted: true } })
    .then(() => {
      res.send({ msg: "booking deleted successfully", success: true });
    })
    .catch((err) => {
      res.send({ msg: err.message, success: false });
    });
};

exports.cloneBookingType = (req, res) => {
  const bookingTypeData = req.body;
  const otp = generateLink(6);
  bookingTypeData.link = otp;
  const newBookingType = new BookingType(bookingTypeData);
  newBookingType.save((err, data) => {
    if (err) {
      return res.send({ msg: err.message, success: false });
    }
    return res.send({ msg: "booking type cloned successfully", success: true, data });
  });
};
