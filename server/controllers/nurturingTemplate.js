const all_temp = require("../models/EmailSentSave");
const students = require("../models/Member");
const nurturingFolderModal = require("../models/EmailNurturingFolder");
const smartlist = require("../models/Smartlists");
const moment = require("moment");
const async = require("async");
const Mailer = require("../helper/Mailer");
// const sgMail = require("sendgrid-v3-node");
const ObjectId = require("mongodb").ObjectId;
const { filterSmartlist } = require("../controllers/smartlists");

function timefun(sd, st) {
  var date = sd;
  var stime = st;
  var spD = date.split("/");
  var spT = stime.split(":");

  var y = spD[2];
  var mo = parseInt(spD[0]) - 1;
  var d = parseInt(spD[1]);
  var h = spT[0];
  var mi = spT[1];
  var se = "0";
  var mil = "0";
  return (curdat = new Date(y, mo, d, h, mi, se, mil));
}

exports.getData = (req, res) => {
  let options = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      minute: "numeric",
      second: "numeric",
    },
    formatter = new Intl.DateTimeFormat([], options);
  var a = formatter.format(new Date());
  // var str = a
  // var h = str.split(",");
  // var dates = h[0]
  // var d = dates.split('/')
  // var curdat = new Date(`${d[1]} ${d[0]} ${d[2]} ${h[1]}`)

  var str = a;
  var h = str.split(",");
  var dates = h[0];
  var d = dates.split("/");

  var time12h = h[1]; // time change in 24hr
  const [b, time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  var y = d[2];
  var mo = d[1] - 1;
  var d = d[0];
  var h = msg.hour;
  var mi = msg.min;
  var se = "0";
  var mil = "0";
  var curdat = new Date(y, mo, d, h, mi, se, mil);

  all_temp
    .aggregate([
      {
        $match: {
          $and: [
            { email_status: true },
            { $expr: { $eq: [{ $month: "$DateT" }, { $month: curdat }] } },
            {
              $expr: {
                $eq: [{ $dayOfMonth: "$DateT" }, { $dayOfMonth: curdat }],
              },
            },
            { $expr: { $eq: [{ $year: "$DateT" }, { $year: curdat }] } },
            { $expr: { $eq: [{ $hour: "$DateT" }, { $hour: curdat }] } },
            { $expr: { $eq: [{ $minute: "$DateT" }, { $minute: curdat }] } },
          ],
        },
      },
    ])
    .exec((err, resp) => {
      if (err) {
        res.json({ code: 400, msg: "data not found" });
      } else {
        res.json({ code: 200, msg: resp });
      }
    });
};

exports.add_template = async (req, res) => {
  try {
    let { userId, folderId } = req.params;
    let {
      to,
      from,
      subject,
      template,
      sent_time,
      design,
      days,
      days_type,
      immediately,
      content_type,
      sent_date,
      smartLists,
      createdBy,
      isPlaceHolders,
    } = req.body;
    if (days && days_type != "before") {
      sent_date = moment().add(days, "days").format("YYYY-MM-DD");
    } else {
      sent_date = moment(sent_date).format("YYYY-MM-DD");
    }
    if (!to) {
      smartLists = smartLists ? JSON.parse(smartLists) : [];
      smartLists = smartLists.map((s) => ObjectId(s));
      let smartlists = await smartlist.aggregate([
        { $match: { _id: { $in: smartLists } } },
        { $project: { criteria: 1, _id: 0 } },
      ]);
      let promises = [];
      smartlists.forEach((element, index) => {
        promises.push(filterSmartlist(element.criteria, userId));
      });
      var data = await Promise.all(promises);

      data = [].concat.apply([], data);
      let mapObj = await students.find(
        {
          _id: { $in: data },
          userId: userId,
          email: { $nin: [undefined, ""] },
        },
        { email: 1, _id: 0 }
      );

      let rest = [...new Set(mapObj.map((element) => element.email))];

      if (!rest.length && JSON.parse(immediately)) {
        return res.send({
          msg: `No Smartlist exist!`,
          success: false,
        });
      }
      to = rest;
    } else {
      to = JSON.parse(to);
    }
    const obj = {
      to,
      from,
      subject,
      template,
      sent_date,
      sent_time,
      design,
      days,
      days_type,
      content_type,
      category: "nurturing",
      email_type: "scheduled",
      is_Sent: true,
      userId,
      folderId,
      smartLists,
      createdBy,
    };
    // const promises = []
    // if (req.files) {
    //   (req.files).map(file => {
    //     promises.push(cloudUrl.imageUrl(file))
    //   });
    //   obj.attachments = await Promise.all(promises);
    // }
    let attachments = [];
    if (req.files) {
      req.files.map((file) => {
        let content = new Buffer.from(file.buffer, "utf-8");
        let attach = {
          content: content,
          filename: file.originalname,
          type: `application/${file.mimetype.split("/")[1]}`,
          disposition: "attachment",
        };
        attachments.push(attach);
      });
    }
    const Allattachments = await Promise.all(attachments);
    obj.attachments = Allattachments;

    if (!JSON.parse(immediately)) {
      obj.email_type = "scheduled";
      obj.isTemplate = true;
      saveEmailTemplate(obj)
        .then((data) => {
          nurturingFolderModal
            .findByIdAndUpdate(folderId, { $push: { template: data._id } })
            .then((data) => {
              res.send({
                msg: `Email scheduled  Successfully on ${sent_date}`,
                success: true,
              });
            })
            .catch((er) => {
              res.send({
                msg: "compose template details is not add in folder",
                success: false,
              });
            });
        })
        .catch((err) => {
          res.send({
            success: false,
            msg: err,
          });
        });
    } else {
      if (JSON.parse(isPlaceHolders)) {
        let mapObj = await students.find({
          _id: { $in: data },
          email: { $nin: [undefined, ""] },
          userId: userId,
        });
        mapObj = mapObj ? mapObj : [];
        if (!mapObj.length && JSON.parse(immediately)) {
          return res.send({
            msg: `No Smartlist exist!`,
            success: false,
          });
        }

        Promise.all(
          mapObj.map((Element) => {
            let temp = template;

            for (i in Element) {
              if (temp.includes(i)) {
                temp = replace(temp, i, Element[i]);
              }
            }
            const emailData = new Mailer({
              to: [Element["email"]],
              from: from,
              subject: subject,
              html: temp,
              attachments: Allattachments,
            });
            emailData.sendMail();
          })
        )
          .then((resp) => {
            obj.email_type = "sent";
            obj.is_Sent = true;
            saveEmailTemplate(obj)
              .then((data) => {
                nurturingFolderModal.findByIdAndUpdate(
                  folderId,
                  { $push: { template: data._id } },
                  (err, data) => {
                    if (err) {
                      res.send({ msg: err, success: false });
                    }
                    res.send({
                      msg: "Email send Successfully!",
                      success: true,
                    });
                  }
                );
              })
              .catch((ex) => {
                res.send({
                  success: false,
                  msg: ex,
                });
              });
          })
          .catch((Err) => {
            res.sen({ msg: Err, success: false });
          });
      } else {
        let emailData = new Mailer({
          to,
          from,
          subject,
          html: template,
          attachments: Allattachments,
        });
        emailData
          .sendMail()
          .then((resp) => {
            obj.email_type = "sent";
            obj.is_Sent = true;
            saveEmailTemplate(obj)
              .then((data) => {
                nurturingFolderModal.findByIdAndUpdate(
                  folderId,
                  { $push: { template: data._id } },
                  (err, data) => {
                    if (err) {
                      res.send({ msg: err, success: false });
                    }
                    return res.send({
                      msg: "Email send Successfully!",
                      success: true,
                    });
                  }
                );
              })
              .catch((ex) => {
                res.send({
                  success: false,
                  msg: ex,
                });
              });
          })
          .catch((Err) => {
            res.sen({ msg: Err, success: false });
          });
      }
    }
  } catch (err) {
    res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};
function replace(strig, old_word, new_word) {
  return strig.replace(new RegExp(`{${old_word}}`, "g"), new_word);
}

function saveEmailTemplate(obj) {
  return new Promise((resolve, reject) => {
    let emailDetail = new all_temp(obj);
    emailDetail.save((err, data) => {
      if (err) {
        reject({ data: "Data not save in Database!", success: err });
      } else {
        resolve(data);
      }
    });
  });
}

exports.remove_template = (req, res) => {
  all_temp.findByIdAndRemove(req.params.templateId, (err, removeTemplate) => {
    if (err) {
      res.send({ msg: "Template not removed!", success: false });
    } else {
      nurturingFolderModal.updateOne(
        { template: removeTemplate._id },
        { $pull: { template: removeTemplate._id } },
        function (err, temp) {
          if (err) {
            res.send({
              msg: "Template  not removed!",
              success: false,
            });
          } else {
            res.send({ msg: "Template removed successfully" });
          }
        }
      );
    }
  });
};

exports.all_email_list = async (req, res) => {
  all_temp.find({ userId: req.params.userId }).exec((err, allTemp) => {
    if (err) {
      res.send({ code: 400, msg: "email list not found" });
    } else {
      res.send({ code: 200, msg: allTemp });
    }
  });
};

exports.swapAndUpdate_template = async (req, res) => {
  if (req.body.length < 1) {
    res.send({ message: "invalid input" });
  } else {
    const updateTO = req.body.updateTo;
    const ObjectIdOfupdateTo = req.body.ObjectIdOfupdateTo;
    const updateFrom = req.body.updateFrom;
    const ObjectIdOfupdateFrom = req.body.ObjectIdOfupdateFrom;
    const first = await all_temp.findByIdAndUpdate(ObjectIdOfupdateTo, {
      templete_Id: updateFrom,
    });
    const second = await all_temp
      .findByIdAndUpdate(ObjectIdOfupdateFrom, { templete_Id: updateTO })

      .exec((err, allTemp) => {
        if (err) {
          res.send({ code: 400, msg: "email list not found" });
        } else {
          res.send({
            code: 200,
            msg: "template swapped successfully",
            success: true,
          });
        }
      });
  }
};
exports.update_template = async (req, res) => {
  let updateTemplate = req.body;
  let templateId = req.params.templateId;
  try {
    updateTemplate.to = updateTemplate.to ? JSON.parse(updateTemplate.to) : [];
    if (!updateTemplate.to) {
      smartLists = updateTemplate.smartLists
        ? JSON.parse(updateTemplate.smartLists)
        : [];
      smartLists = smartLists.map((s) => ObjectId(s));
      let [smartlists] = await smartlist.aggregate([
        {
          $match: {
            _id: { $in: smartLists },
          },
        },
        {
          $lookup: {
            from: "members",
            localField: "smartlists",
            foreignField: "_id",
            as: "data",
          },
        },
        {
          $project: {
            _id: 0,
            data: "$data.email",
          },
        },
        { $unwind: "$data" },
        {
          $group: {
            _id: "",
            emails: { $addToSet: "$data" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);

      smartlists = smartlists ? smartlists : [];

      if (!smartlists.emails.length) {
        return res.send({
          msg: `No Smartlist exist!`,
          success: false,
        });
      }
      updateTemplate.to = smartlists.emails;
    }
    // promises = []
    // if (req.files) {
    //   (req.files).map(file => {
    //     promises.push(cloudUrl.imageUrl(file))
    //   });
    //   updateTemplate.attachments = await Promise.all(promises);
    // }
    let attachments = [];
    if (req.files) {
      req.files.map((file) => {
        let content = new Buffer.from(file.buffer, "utf-8");
        let attach = {
          content: content,
          filename: file.originalname,
          type: `application/${file.mimetype.split("/")[1]}`,
          disposition: "attachment",
        };
        attachments.push(attach);
      });
    }
    const Allattachments = await Promise.all(attachments);
    updateTemplate.attachments = Allattachments;
    await all_temp.updateOne(
      { _id: templateId },
      updateTemplate,
      (err, updateTemp) => {
        if (err) {
          res.send({ msg: "template is not update", success: false });
        } else {
          res.send({ msg: "updated successfully", success: true });
        }
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.swap_template = async (req, res) => {
  let templateId = req.params.templateId;
  let FirstSelectedOid = req.body.FirstSelectedOid;
  let newPositionOfFirstSelected = req.body.newPositionOfFirstSelected;
  let DateOfFirstSelectedOid = req.body.DateOfFirstSelectedOid;
  let SecondSelectedOid = req.body.SecondSelectedOid;
  let newPositionOfSecondSelected = req.body.newPositionOfSecondSelected;
  let DateOfSecondSelectedOid = req.body.DateOfSecondSelectedOid;

  await nurturingFolderModal.updateOne(
    { _id: req.params.templateId },

    {
      $pull: {
        template: {
          $in: [FirstSelectedOid, SecondSelectedOid],
        },
      },
    }
  );
  await nurturingFolderModal.updateOne(
    { _id: templateId },
    {
      $push: {
        template: {
          $each: [FirstSelectedOid],
          $position: newPositionOfFirstSelected,
        },
      },
    }
  );
  await nurturingFolderModal
    .updateOne(
      { _id: req.params.templateId },

      {
        $push: {
          template: {
            $each: [SecondSelectedOid],
            $position: newPositionOfSecondSelected,
          },
        },
      }
    )
    .exec(async (err, data) => {
      if (err) {
        res.send({
          msg: "not update template",
          success: false,
        });
      } else {
        await all_temp.findByIdAndUpdate(FirstSelectedOid, {
          $set: { sent_date: DateOfFirstSelectedOid },
        });
        await all_temp
          .findByIdAndUpdate(SecondSelectedOid, {
            $set: { sent_date: DateOfSecondSelectedOid },
          })
          .exec(async (err, data) => {
            if (err) {
              res.send({
                msg: "Template not updated!",
                success: false,
              });
            } else {
              res.send({
                msg: "template swapped successfully! ",
                success: true,
              });
            }
          });
      }
    });
};

//single temp update status
exports.single_tem_update_status = (req, res) => {
  if (req.body.is_Favorite) {
    all_temp.updateOne(
      { _id: req.params.tempId },
      { $set: { is_Favorite: true } },
      (err, resp) => {
        if (err) {
          res.json({ success: false, msg: "email status not deactive" });
        } else {
          res.json({
            success: true,
            msg: "Template marked as stared successfully",
          });
        }
      }
    );
  } else {
    all_temp.updateOne(
      { _id: req.params.tempId },
      { $set: { is_Favorite: false } },
      (err, resp) => {
        if (err) {
          res.json({ success: false, msg: "email status not active" });
        } else {
          res.json({ success: true, msg: "Template marked as unstar" });
        }
      }
    );
  }
};

//update status of all template
exports.status_update_template = (req, res) => {
  if (req.body.is_Favorite == "false") {
    all_temp
      .find({
        $and: [
          { userId: req.params.userId },
          { folderId: req.params.folderId },
        ],
      })
      .exec((err, TempData) => {
        if (err) {
          res.send(err);
        } else {
          async.eachSeries(
            TempData,
            (obj, done) => {
              all_temp.findByIdAndUpdate(
                obj._id,
                { $set: { is_Favorite: false } },
                done
              );
            },
            function Done(err, List) {
              if (err) {
                res.send(err);
              } else {
                res.send({ msg: "this folder all template is deactivate" });
              }
            }
          );
        }
      });
  } else if (req.body.is_Favorite == "true") {
    all_temp
      .find({
        $and: [
          { userId: req.params.userId },
          { folderId: req.params.folderId },
        ],
      })
      .exec((err, TempData) => {
        if (err) {
          res.send(err);
        } else {
          async.eachSeries(
            TempData,
            (obj, done) => {
              all_temp.findByIdAndUpdate(
                obj._id,
                { $set: { is_Favorite: true } },
                done
              );
            },
            function Done(err, List) {
              if (err) {
                res.send(err);
              } else {
                res.send({ msg: "this folder all template is activate" });
              }
            }
          );
        }
      });
  }
};

exports.multipal_temp_remove = (req, res) => {
  let folderId = req.params.folderId;
  let templateIds = req.body.templateId;

  if (!templateIds.length) {
    return res.send({ msg: "please selecte Template", success: false });
  }
  all_temp.remove({ _id: { $in: templateIds } }).exec((err, resp) => {
    if (err) {
      res.json({ success: false, msg: "templates not remove" });
    } else {
      nurturingFolderModal
        .updateOne(
          { _id: folderId },
          { $pull: { template: { $in: templateIds } } }
        )
        .exec((err, resp) => {
          if (err) {
            res.json({ success: false, msg: "templates not remove" });
          } else {
            res.json({ success: true, msg: "template  removed successfully" });
          }
        });
    }
  });
};

function removeEmptyString(arr) {
  return arr.filter((v) => v != "");
}
