/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { buildPagination } = require("../Utilities/buildPagination");
const EmployeeContact = require("../models/EmployeeContact");
const EmployeePosition = require("../models/EmployeePosition");
const Roles = require("../models/Roles");
const WorkHistory = require("../models/workHistory");
const generateTokens = require("../Utilities/generateToken");

const sgMail = require("@sendgrid/mail");
const { SendMail } = require("../service/sendMail");
const { socket_connections } = require("../service/socket-sender");
const {
  adminSockets,
  clientSockets,
  socket2adminId,
  socket2clientId,
} = require("../routes/socket");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const { anyUploader, imageUpload } = require("../lib/upload");

// Hash Password
const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const deleteContact = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const contact = await EmployeeContact.findById(_id);
  if (!contact) {
    throw Error("Contact not found !");
  }
  contact.isDelete = true;
  await contact.save();
  res.send({});
});

const contactList = asyncHandler(async (req, res) => {
  try {
    // eslint-disable-next-line prefer-const
    let { pageSize, page, position, type, status, sortKey, sortType, text, tags } = req.query;

    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    const skip = (page - 1) * pageSize;
    // const { user } = req;

    let sort = 1;
    if (sortType === "desc") {
      sort = -1;
    }

    let query = {
      userId: mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id),
      isDelete: false,
    };

    if (position && position !== null && position !== undefined) {
      query = {
        ...query,
        position,
      };
    }

    if (type && type !== null && type !== undefined) {
      query = {
        ...query,
        type,
      };
    }

    if (status && status !== null && status !== undefined) {
      query = {
        ...query,
        status,
      };
    }

    if (text !== "" && text !== undefined) {
      const regex = new RegExp(text, "i");
      query = {
        ...query,
        $or: [{ fullName: regex }],
      };
    }

    if (tags) {
      query = {
        ...query,
        tags: {
          $elemMatch: {
            $in: [tags, "$tags"],
          },
        },
      };
    }

    const employeeContact = await EmployeeContact.aggregate([
      {
        $match: query,
      },
      {
        $sort: {
          [sortKey]: sort,
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page } }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
    ]);
    const data = buildPagination(employeeContact);
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

const contactAdd = asyncHandler(async (req, res) => {
  const {
    fullName,
    username,
    address,
    city,
    role,
    email,
    phone,
    position,
    password,
    state,
    willSendEmail,
    zip,
    outletId,
  } = req.body;

  let hashedPassword = "",
    permissionInfo;

  if (!req.user) {
    throw Error("user not Found !");
  }

  if (password) {
    hashedPassword = (await hashPass(password)).toString();
  }

  let outlet = null;
  if (outletId !== "") {
    outlet = outletId;
  }

  // Check phone exist or not
  if (phone !== "") {
    const checkExist = await EmployeeContact.findOne({
      phone,
      isDelete: false,
    });
    if (checkExist) {
      throw Error("Phone number already Exist");
    }
  }

  // Check Email exist or not
  if (email !== "") {
    const checkExist = await EmployeeContact.findOne({
      email,
      isDelete: false,
    });
    if (checkExist) {
      throw Error("Email already Exist");
    }
  }
  // validation
  if (!fullName || fullName === "") {
    throw Error("Full name must not empty !");
  }

  if (role) {
    permissionInfo = await Roles.findById(mongoose.Types.ObjectId(role));
  }

  EmployeeContact.findOne({ email }).exec((err, employee) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }

    if (employee) {
      return res.status(409).json({
        errors: {
          common: { msg: "Email or Phone Number Already Taken" },
        },
      });
    }
    const newEmployeeContact = new EmployeeContact({
      fullName,
      email,
      phone,
      outletId: outlet,
      position,
      userId: req.user.id ? req.user.id : req.user._id,
      username,
      hashed_password: hashedPassword,
      address,
      city,
      role,
      email,
      phone,
      state,
      zip,
    });

    newEmployeeContact.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      if (success) {
        if (willSendEmail) {
          SendMail({
            recipient: email,
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
                            Hello ${fullName}
                            <br>
                            <br>
                            <u>${
                              req.user.fullName
                                ? req.user.fullName
                                : req.user.firstName + " " + req.user.lastName
                            }</u> has invited you to their team, in a workspace called
                            Mymanager.
                            <br>
                            <br>
                            <span>Just Click: </span>https://mymanager.com/employee/activate/${
                              newEmployeeContact._id
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
        } else {
          console.log("just add, not sending email");
        }

        return res.status(201).json({
          success: "Client contact created successfully",
        });
      }
    });
  });
});

const contactById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  EmployeeContact.findOne(
    { _id: id, isDelete: false },
    // eslint-disable-next-line consistent-return
    (err, contact) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }

      res.status(200).json(contact);
    }
  );
});

const updateContact = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const { user } = req;
  const {
    _id,
    fullName,
    email,
    phone,
    // photo,
    gender,
    address,
    status,
    note,
    tags,
    dob,
    type,
    salary,
    isFormer,
    isinternship,
  } = req.body;

  const contact = await EmployeeContact.findById(_id);
  if (!contact) throw Error("Contact not Found");

  contact.fullName = fullName || "";
  contact.email = email || "";
  contact.phone = phone || "";
  contact.gender = gender || "";
  contact.address = address || "";
  contact.status = status || "";
  contact.note = note || "";
  contact.tags = tags || "";
  contact.dob = dob || "";
  contact.type = type || "";
  contact.salary = salary || 0;
  contact.isFormer = isFormer || contact.isFormer;
  contact.isinternship = isinternship || contact.isinternship;
  await contact.save();
  return res.json({});
});

// Contact Register & Give Permission
const updateContactRegister = asyncHandler(async (req, res) => {
  const { id, email, password, roleId, assignedProject, sendType } = req.body;
  let hashedPassword = "";

  if (password) {
    hashedPassword = (await hashPass(password)).toString();
  }

  const contact = await EmployeeContact.findById(id);

  if (!contact) throw Error("Contact not Found");

  contact.email = email;
  contact.hashed_password = hashedPassword;
  contact.role = roleId;
  const permissionInfo = await Roles.findById(mongoose.Types.ObjectId(roleId));

  await contact.save((err, success) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }

    if (success) {
      const asynGenerateToken = async () => {
        const userInfo = {
          type: "employee",
          employeeId: id,
        };

        const { accessToken, refreshToken } = await generateTokens({
          _id: contact.userId,
          user: userInfo,
        });
        return res.json({
          employeeData: {
            id: id,
            userId: contact.userId,
            permission: permissionInfo.permissions[0],
          },
          accessToken,
          refreshToken,
        });
      };
      asynGenerateToken();

      if (sendType == "email") {
        SendMail({
          recipient: req.body.email,
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
                          Hello ${contact.fullName}
                          <br>
                          <br>
                          <u>${
                            req.user.fullName
                              ? req.user.fullName
                              : req.user.firstName + " " + req.user.lastName
                          }</u> has invited you to their team, in a workspace called
                          Mymanager.
                          <br>
                          <br>
                          <span>Just Click: </span> https://mymanager.com/employee/activate/${id}
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
    }
  });
});

// eslint-disable-next-line consistent-return
const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.body;

    const employee = await EmployeeContact.findById(id);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.photo = req.file.location;
    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const updateSocialLink = async (req, res) => {
  try {
    const { id, links } = req.body;

    const employee = await EmployeeContact.findById(id);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    const { socialLinks } = employee;
    const newLinks = [];
    // eslint-disable-next-line prefer-const
    for (let link of links) {
      // eslint-disable-next-line prefer-const
      let findExisting = Array.from(socialLinks).find((x) => String(x.name) === String(link.name));
      if (findExisting) {
        findExisting.link = link.link;
        newLinks.push(findExisting);
      } else {
        newLinks.push(link);
      }
    }

    employee.socialLinks = newLinks;
    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Rnak add Or Update
const rankAddOrUpdate = async (req, res) => {
  try {
    const {
      createdAt,
      name,
      // photo,
      _id,
      id,
    } = req.body;
    const employee = await EmployeeContact.findById(id);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    if (_id === "") {
      // Add
      employee.ranks.push({
        createdAt,
        name,
        photo: req.file.location,
      });
    } else {
      // update
      employee.ranks = employee.ranks.map((x) => {
        if (String(x._id) === String(_id)) {
          x.name = name || x.name;
          x.createdAt = createdAt || x.createdAt;

          if (req.file) {
            x.photo = req.file.location;
          }
          return x;
        }
        return x;
      });
    }

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
// Rnak Delete
const deleteRank = async (req, res) => {
  try {
    const { _id, employeeId } = req.body;

    const employee = await EmployeeContact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.ranks = employee.ranks.filter((x) => String(x._id) !== String(_id));

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// File Add
// eslint-disable-next-line consistent-return
const fileAddAndUpdate = async (req, res) => {
  try {
    const {
      _id,
      employeeId,
      // createdAt,
      name,
    } = req.body;
    const employee = await EmployeeContact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    if (_id === "") {
      // Add
      employee.files.push({
        title: name,
        file: req.file.location,
        createdAt: Date.now(),
      });
    }
    // eslint-disable-next-line no-lone-blocks
    {
      employee.files = employee.files.map((x) => {
        if (String(x._id) === String(_id)) {
          x.title = name || x.title;
          if (req.file) {
            x.file = req.file.location;
          }
          return x;
        }
        return x;
      });
    }

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// File Add
// eslint-disable-next-line consistent-return
const deleteFile = async (req, res) => {
  try {
    const { _id, employeeId } = req.body;
    const employee = await EmployeeContact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.files = employee.files.filter((x) => String(x._id) !== String(_id));

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Update ===== >  Billing
const updateBillingAddress = async (req, res) => {
  try {
    const {
      zipCode,
      state,
      street,
      city,
      country,
      email,
      phone,
      taxId,
      vatNo,
      addressLineOne,
      addressLineTwo,
      employeeId,
    } = req.body;

    const employee = await EmployeeContact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.billingAddress = {
      email,
      phone,
      taxId,
      vatNo,
      addressLineOne,
      addressLineTwo,
      zipCode,
      state,
      street,
      city,
      country,
    };

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// eslint-disable-next-line consistent-return
async function totalEmployee(req, res) {
  try {
    const employees = await EmployeeContact.countDocuments({
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
// eslint-disable-next-line consistent-return
async function activeEmployee(req, res) {
  try {
    const employees = await EmployeeContact.countDocuments({
      status: "active",
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
// eslint-disable-next-line consistent-return
async function internshipEmployee(req, res) {
  try {
    const employees = await EmployeeContact.countDocuments({
      isInternship: true,
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
// eslint-disable-next-line consistent-return
async function formerEmployee(req, res) {
  try {
    const employees = await EmployeeContact.countDocuments({
      isFormer: true,
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}

// Import Contacts
const importContactsFromArray = async (req, res) => {
  try {
    const { contacts } = req.body;

    if (contacts.length === 0) {
      return res.status(500).json({
        errors: { common: { msg: "Contact Length is 0" } },
      });
    }

    const formatedData = contacts.map((x) => ({
      ...x,
      userId: req.user._id,
      fullName: x[0],
      email: x[1],
      phone: x[2],
      type: x[3],
    }));

    await EmployeeContact.insertMany(formatedData);

    return res.status(200).send("Imported");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Desc Create New Position
// Route POST /employee-contact/position
// Access Public
const employeePosition = asyncHandler(async (req, res) => {
  const { name, color, order } = req.body;
  // eslint-disable-next-line no-shadow
  const employeePosition = new EmployeePosition({
    userId: req.user.id ? req.user.id : req.user._id,
    name,
    color,
    order,
  });

  // eslint-disable-next-line no-unused-vars
  employeePosition.save((error, success) => {
    if (error) {
      throw Error(error);
    } else {
      return res.status(201).json({
        success: "employee position created",
      });
    }
  });
});

// Get All Positions

const getEmployeePositions = async (req, res) => {
  try {
    const { user } = req;
    const employeePositions = await EmployeePosition.find({
      userId: user._id,
    }).sort({order: 1});

    return res.status(200).send(employeePositions);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Get All employees

const getAllEmployees = async (req, res) => {
  const { user } = req;
  try {
    const allEmployees = await EmployeeContact.find({ userId: user._id });
    return res.status(200).send(allEmployees);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Delete one Position

const deleteEmployeePosition = async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeePosition.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Position deleted successfull"
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Put Lead Position Data
const putEmployeePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, order } = req.body.position;
    const filter = { _id: id };
    const options = { upsert: true };
    const updatedDoc = {
      $set: {
        name,
        color,
        order
      },
    };
    await EmployeePosition.updateOne(filter, updatedDoc, options);

    return res.status(200).json({
      success: true,
      message: "Position edited successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const getForAddEvent = async (req, res) => {
  try {
    const { user } = req;
    const totalClients = await EmployeeContact.find({
      isDelete: false,
      userId: user._id,
    }).select({ fullName: 1, email: 1, phone: 1 });
    return res.status(200).send(totalClients);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// **WorkHistory

const getWorkHistoryTimeLine = async (req, res) => {
  const { employeeId } = req.params;
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  const histories = await WorkHistory.find({
    userId: employeeId,
    startTime: { $gte: currentDate },
  })
    .then((result) => {
      const historyResult = result.map((history) => {
        const { screenshots, ...newHistory } = history._doc;
        return newHistory;
      });
      res.json(historyResult);
    })
    .catch((e) => res.json(e));
};

const startWork = (req, res) => {
  const { userId, description } = req.body;
  const newWorkHistory = new WorkHistory({
    userId,
    startTime: new Date(),
    description,
  });
  newWorkHistory
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
};

const endWork = async (req, res) => {
  const { historyId, userId, description } = req.body;
  WorkHistory.findByIdAndUpdate(historyId, {
    endTime: new Date(),
  })
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
};

const updateWork = async (req, res) => {
  const { historyId, screenshot } = req.body;
  const oldHistory = await WorkHistory.findById(historyId);
  if (oldHistory)
    WorkHistory.findByIdAndUpdate(historyId, {
      endTime: new Date(),
      screenshots: [
        ...oldHistory.screenshots,
        {
          trackTime: new Date(),
          screenshot: screenshot,
        },
      ],
    })
      .then((result) => res.json(result))
      .catch((err) => res.send(err));
};

const getOverview = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const currentDate = new Date();
    const weekStartDate = new Date();
    weekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    const dailyhistories = await WorkHistory.find({
      userId: employeeId,
      startTime: { $gte: currentDate },
    });

    const weeklyhistories = await WorkHistory.find({
      userId: employeeId,
      startTime: { $gte: weekStartDate },
    });
    const monthStartDate = new Date();
    monthStartDate.setDate(1);
    const monthlyhistories = await WorkHistory.find({
      userId: employeeId,
      startTime: { $gte: monthStartDate },
    });

    const totalhistories = await WorkHistory.find({ userId: employeeId }).sort({
      startTime: "asc",
    });
    let workDays = 0;
    if (totalhistories && totalhistories.length > 0) {
      workDays = Math.ceil(
        (new Date(totalhistories[totalhistories.length - 1].endTime) -
          new Date(totalhistories[0].startTime)) /
          (1000 * 60 * 60 * 24)
      );
    }

    let dailytotaltime = 0;
    let dailyStartTime = "";
    let dailyEndTime = "";
    if (dailyhistories) {
      dailyhistories.forEach((history) => {
        dailytotaltime += history.endTime - history.startTime;
      });
      dailyStartTime = dailyhistories[0].startTime;
      dailyEndTime = dailyhistories[dailyhistories.length - 1].endTime;
    } else {
      res.status(404);
    }

    let weeklytotaltime = 0;
    if (weeklyhistories) {
      weeklyhistories.forEach((history) => {
        weeklytotaltime += history.endTime - history.startTime;
      });
    } else {
      res.status(404);
    }

    let weeklyReport = Array(7).fill(0);

    weeklyhistories.forEach((history) => {
      const day = new Date(history.startTime).getDay();
      weeklyReport[day] += Math.ceil((history.endTime - history.startTime) / (1000 * 60));
    });

    let monthlytotaltime = 0;
    if (monthlyhistories) {
      monthlyhistories.forEach((history) => {
        monthlytotaltime += history.endTime - history.startTime;
      });
    } else {
      res.status(404);
    }

    res.json({
      dailyTime: Math.ceil(dailytotaltime / (1000 * 60)),
      weeklyTime: Math.ceil(weeklytotaltime / (1000 * 60)),
      monthlyTime: Math.ceil(monthlytotaltime / (1000 * 60)),
      workDays: workDays,
      weeklyReport,
      dailyStartTime,
      dailyEndTime,
    });
  } catch (e) {
    res.status(500);
  }
};

const getScreenshots = async (req, res) => {
  try {
    const { historyId } = req.params;

    const oldHistory = await WorkHistory.findById(historyId);
    if (oldHistory) {
      res.json(oldHistory.screenshots);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

const updateEmployeePosition = async (req, res) => {
  const { params } = req.body;
  try {
    await EmployeeContact.updateOne({
      _id: params.employeeId
    }, {
      position: params.position
    })
    res.status(200).send({
      success: true
    });
  } catch(error) {
    console.log(error)
  }
}

module.exports = {
  contactList,
  contactAdd,
  contactById,
  updateContact,
  updateContactRegister,
  uploadAvatar,
  updateSocialLink,
  rankAddOrUpdate,
  deleteRank,
  fileAddAndUpdate,
  deleteFile,
  updateBillingAddress,
  totalEmployee,
  activeEmployee,
  internshipEmployee,
  formerEmployee,
  deleteContact,
  importContactsFromArray,
  employeePosition,
  getEmployeePositions,
  getAllEmployees,
  deleteEmployeePosition,
  putEmployeePosition,
  getForAddEvent,
  //WorkHistory
  getWorkHistoryTimeLine,
  startWork,
  endWork,
  updateWork,
  getOverview,
  getScreenshots,
  updateEmployeePosition
};
