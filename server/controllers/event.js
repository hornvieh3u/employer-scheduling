const Event = require("../models/Event");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const { SendMail } = require("../service/sendMail");

/**
 *
 * @desc Create Event Controller
 * @route POST /api/event/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.eventCreate = async (req, res) => {
  try {
    var url = "";
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }

    const newEvent = new Event({
      userId: req.body.userId,
      title: req.body.title,
      type: req.body.type,
      notes: req.body.note,
      hostName: req.body.hostName,
      hostEmail: req.body.hostEmail,
      hostMobileNumber: req.body.hostMobileNumber,
      hostAlternateNumber: req.body.hostAlternateNumber,
      start: req.body.start,
      end: req.body.end,
      venueName: req.body.venueName,
      eventAddress: req.body.eventAddress,
      ticketName: req.body.ticketName,
      ticketType: req.body.ticketType,
      ticketAvailableQuantity: req.body.ticketAvailableQuantity,
      ticketPrice: req.body.ticketPrice,
      eventBanner: url,
    });
    await newEvent.save();
    return res.json(newEvent);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    var url = "";
    let file = req.file;
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    } else if (req.body.eventBanner) {
      url = req.body.eventBanner;
    }
    let eventData = req.body;
    eventData = { ...eventData, eventBanner: url };
    const eventId = req.params.id;

    Event.findByIdAndUpdate({ _id: eventId }, { $set: eventData }).exec(async (err, data) => {
      if (err) {
        res.send({
          msg: err,
          success: false,
        });
      } else {
        return res.send({
          msg: "Event updated succesfully",
          success: true,
        });
      }
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};
/**
 * @desc Get all events of user
 * @route GET api/event/all/:userId
 * @returns
 */
exports.getEvents = async (req, res) => {
  const { userId } = req.params;
  try {
    const events = await Event.find({ userId });
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get information of a event
 * @route GET api/event/info/:eventId
 * @return
 */
exports.getEventInfo = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(event);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Delete a Event by event Id
 * @route GET api/event/info/:eventId
 * @return
 */
exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    await Event.findByIdAndDelete(eventId);
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Add new Guests
exports.addNewGuests = async (req, res) => {
  const { _id, data, sendEmailChecked } = req.body;
  try {
    const event = await Event.findById(_id);
    const remainingGuests = event.ticketAvailabeQuantity - data.length - event.guests.length;
    if (remainingGuests < 0) {
      res.status(404).json({ msg: "Not enough tickets" });
    } else {
      let guestEmailList = [],
        guestNameList = [],
        pwdUrl = "";
      const isNewGuest = (guest) => {
        if (event.guests.length > 0) {
          event.guests.map((item, index) => {
            if (item.email.length) {
              guestEmailList.push(item.email);
            } else return;
            if (item.name.length) {
              guestNameList.push(item.name);
            } else return;
          });
        }

        if (
          (guestEmailList.length > 0 && guestEmailList.indexOf(guest.email) > -1) ||
          (guestNameList.length > 0 &&
            guest.name != undefined &&
            guestNameList.indexOf(guest.name) > -1)
        ) {
          return guestEmailList.indexOf(guest.email);
        } else {
          return true;
        }
      };
      await data.map((guest, index) => {
        if (guest.email == "" || guest.email == null) {
          res.status(500).json({ msg: "Not Email given" });
        }
        let guestIndex = isNewGuest(guest);
        if (guestIndex === true) {
          event.guests.unshift(guest);
        } else {
          let guestInfo = {
            guestName: guest.name ? guest.name : "",
            guestEmail: guest.email,
          };
          pwdUrl = btoa(JSON.stringify(guestInfo));
          event.guests[guestIndex].category = guest.category;
        }
        if (sendEmailChecked[index]) {
          SendMail({
            recipient: guest.email,
            from: `admin@mymanager.com`,
            replyTo: `admin@mymanager.com`,
            attachments: {},
            body: `<html>

              <head>

              </head>

              <body style='background-color: #f5f6fb; font-size: 11px;'>

                  <div
                      style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
                      <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
                          <span style='color: black;'>##-Please accept invitation by visiting that url below this line-##</span>
                      </div>
                      <div style='padding: 10px; font-size: 12px;'>
                          <p style='color: #1b1a1a;'>
                              Hello ${guest.fullName ? guest.fullName : "Guest"}
                              <br>
                              <br>
                              <u>${
                                event.hostName ? event.hostName : "admin@mymanager.com"
                              }</u> has invited you to their ${event.title}, in a workspace called
                              Mymanager.
                              <br>
                              <br>
                              <span>Just Click: </span> https://mymanager.com/event-preview/${
                                pwdUrl.length > 0 ? _id + "/" + pwdUrl : _id
                              }
                          </p>
                      </div>
                      <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
                          <div style='color: black; line-height: 1.7;'>This email is a service from Https://mymanager.com</div>
                          <div style='color: black;'>Delivered by Mymember</div>
                      </div>
                  </div>
              </body>

              </html>`,
          });
        }
      });

      event.save().then(res.status(200).json({ data: event, msg: "Successfully added" }));
    }
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Delete Guests
exports.deleteGuests = async (req, res) => {
  const { eventId, guestId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (event) {
      let tmp = [];
      event.guests.forEach((guest, index) => {
        if (guest._id != guestId) {
          tmp.push(guest);
        } else {
          return;
        }
      });
      event.guests = tmp;
      event.save().then(res.status(200).json({ data: event, msg: "Successfully deleted" }));
    } else {
      res.status(200).json({ msg: "Not Found Current Event" });
    }
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
};
exports.addAndUpdateGuests = async (req, res) => {
  const { id } = req.params;

  const { guestData, isNewEmployee } = req.body;
  try {
    const event = await Event.findById(id);
    if (isNewEmployee) {
      event.guests.push({
        name: guestData.name,
        phone: guestData.phone,
        email: guestData.email,
        status: guestData.status,
      });
    } else {
      event.guests = event.guests.map((item, index) => {
        if (item.name == guestData.name || item.email == guestData.email) {
          item.name = guestData.name;
          item.email = guestData.email;
          item.phone = guestData.phone;
          item.status = guestData.status;
          return item;
        } else return item;
      });
    }
    event.save().then(res.status(200).json({ data: event, msg: "Successfully accepted" }));
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
};
