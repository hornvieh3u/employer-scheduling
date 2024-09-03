const asyncHandler = require("express-async-handler");
const { buildPagination } = require("../Utilities/buildPagination");

const VendorContact = require("./../models/VendorContact");
const mongoose = require("mongoose");
const VendorPosition = require("../models/VendorPosition");

const getContacts = asyncHandler(async (req, res) => {
  try {
    let { pageSize, page, position, type, status, sortKey, sortType, text, tags, stage } =
      req.query;

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const { user } = req;

    let sort = 1;
    if (sortType == "desc") {
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

    if (stage && stage !== null && stage !== undefined && stage !== "") {
      query = {
        ...query,
        stage,
      };
    }

    if (text !== "" && text !== undefined) {
      let regex = new RegExp(text, "i");
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

    const leadContacts = await VendorContact.aggregate([
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

    const data = buildPagination(leadContacts);
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({});
  }
});

const getSingleContact = asyncHandler(async (req, res) => {
  try {
    const contact = await VendorContact.findById(req.params.id);
    if (contact) {
      return res.json(contact);
    } else {
      throw Error("Not Found");
    }
  } catch (err) {
    return res.status(500).json({});
  }
});

const contactAdd = asyncHandler(async (req, res) => {
  const { fullName, email, phone, type, company, position, country } = req.body;

  if (!req.user) {
    throw Error("user not Found !");
  }

  // Check phone exist or not
  if (phone !== "") {
    const checkExist = await VendorContact.findOne({
      phone,
      isDelete: false,
    });
    if (checkExist) {
      throw Error("Phone number already Exist");
    }
  }

  // Check Email exist or not
  if (email !== "") {
    const checkExist = await VendorContact.findOne({
      email,
      isDelete: false,
    });
    if (checkExist) {
      throw Error("Email already Exist");
    }
  }

  const leadContact = new VendorContact({
    fullName,
    email,
    phone,
    type,
    company,
    position,
    country,
    userId: req.user.id ? req.user.id : req.user._id,
  });

  // validation
  if (!fullName || fullName === "") {
    throw Error("Full name must not empty !");
  }

  leadContact.save((err, success) => {
    if (err) {
      if (err) {
        throw Error(err);
      }
    } else {
      return res.status(201).json({
        success: "Client contact created successfull",
      });
    }
  });
});

// Delete Contact
const deleteContact = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  if (!req.user) {
    throw Error("user not Found !");
  }
  const leadContact = await VendorContact.findById(_id);
  if (!leadContact) throw Error("contact not found !");
  leadContact.isDelete = true;
  await leadContact.save();
  return res.json({});
});

const contactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  LeadContact.findOne(
    { _id: id, isDelete: false, userId: user.id ? user.id : user._id },
    (err, contact) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(contact);
    }
  );
});

const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.body;

    const lead = await VendorContact.findById(id);
    if (!lead) {
      return res.status(404).send("ID not found ");
    }

    lead.photo = req.file.location;
    await lead.save();
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

    const employee = await VendorContact.findById(id);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    const socialLinks = employee.socialLinks;
    const newLinks = [];
    for (let link of links) {
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

// File Add
const fileAddAndUpdate = async (req, res) => {
  try {
    const { _id, employeeId, createdAt, name } = req.body;
    const employee = await VendorContact.findById(employeeId);
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
    {
      employee.files = employee.files.map((x) => {
        if (String(x._id) === String(_id)) {
          x.title = name ? name : x.title;
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
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// File Delete
const deleteFile = async (req, res) => {
  try {
    const { _id, employeeId } = req.body;
    const employee = await VendorContact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.files = employee.files.filter((x) => String(x._id) !== String(_id));

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Update Billing Address
const updateBillingAddress = async (req, res) => {
  try {
    console.log(req.body);
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

    const employee = await VendorContact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.billingAddress = {
      email: email,
      phone: phone,
      taxId: taxId,
      vatNo: vatNo,
      addressLineOne: addressLineOne,
      addressLineTwo: addressLineTwo,
      zipCode: zipCode,
      state: state,
      street: street,
      city: city,
      country: country,
    };

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

async function totalContact(req, res) {
  try {
    const contacts = await VendorContact.find({
      userId: req.user._id,
      isDelete: false,
    });
    res.send(contacts);
  } catch (error) {
    console.log(error);
    return res.status(404).send("data not found");
  }
}

async function totalContactCount(req, res) {
  try {
    const contactsCount = await VendorContact.countDocuments({
      userId: req.user._id,
      isDelete: false,
    });
    res.send(contactsCount + "");
  } catch (error) {
    console.log(error);
    return res.status(404).send("data not found");
  }
}

async function ColdLeadCount(req, res) {
  try {
    const contacts = await VendorContact.countDocuments({
      type: "retail",
      userId: req.user._id,
      isDelete: false,
    });
    res.send(contacts + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
async function warmLeadCount(req, res) {
  try {
    const employees = await VendorContact.countDocuments({
      type: "online",
      userId: req.user._id,
      isDelete: false,
    });
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
async function HotLeadsCount(req, res) {
  try {
    const employees = await VendorContact.countDocuments({
      type: "other",
      userId: req.user._id,
      isDelete: false,
    });
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}

const updateContact = (req, res) => {
  const {
    fullName,
    email,
    phone,
    type,
    company,
    position,
    note,
    address,
    companyAddress,
    status,
    gender,
    dob,
    _id,
    tags,
    socialLinks,
    companyPhone,
    companyEmail,
  } = req.body;

  VendorContact.findOne({ _id, isDelete: false }, (err, leadContact) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }
    if (!leadContact) {
      return res.status(404).json({
        errors: { common: { msg: "No leadContact data found" } },
      });
    } else {
      leadContact.fullName = fullName ? fullName : leadContact.fullName;
      leadContact.email = email ? email : leadContact.email;
      leadContact.phone = phone ? phone : leadContact.phone;
      leadContact.type = type ? type : leadContact.type;
      leadContact.company = company ? company : leadContact.company;
      leadContact.position = position ? position : leadContact.position;
      leadContact.note = note ? note : leadContact.note;
      leadContact.address = address ? address : leadContact.address;
      leadContact.status = status ? status : leadContact.status;
      leadContact.gender = gender ? gender : leadContact.gender;
      leadContact.dob = dob ? dob : leadContact.dob;
      leadContact.companyEmail = companyEmail ? companyEmail : leadContact.companyEmail;
      leadContact.companyPhone = companyPhone ? companyPhone : leadContact.companyPhone;

      leadContact.tags = tags ? tags : leadContact.tags;
      leadContact.socialLinks = socialLinks ? socialLinks : leadContact.socialLinks;
      leadContact.companyAddress = companyAddress ? companyAddress : leadContact.companyAddress;

      leadContact.save((err, contact) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        } else {
          return res.status(200).json(contact);
        }
      });
    }
  });
};

const addNewOther = async (req, res) => {
  try {
    const { address, phone, startDate, endDate, clientId, _id } = req.body;

    const lead = await VendorContact.findOne({
      _id: clientId,
      isDelete: false,
    });

    if (!lead) {
      return res.status(500).json({
        errors: { common: { msg: "No lead data found" } },
      });
    }

    if (_id !== "") {
      // Lets Update Store
      lead.others = lead.others.map((x) => {
        if (String(x._id) === String(_id)) {
          x.address = address;
          x.phone = phone;
          x.startDate = startDate;
          x.endDate = endDate;

          if (req.file) {
            if (req.file.location) {
              x.file = req.file.location;
            }
          }
        }
        return x;
      });
    } else {
      lead.others.push({
        address,
        phone,
        startDate,
        endDate,
        file: req.file.location,
      });
    }

    await lead.save();

    return res.status(200).send({ success: "Other added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const editOther = async (req, res) => {
  try {
    const { clientId, _id, address, phone, startDate, endDate } = req.body;

    const client = await VendorContact.findOne({
      _id: clientId,
      isDelete: false,
    });

    if (!client) {
      return res.status(500).json({
        errors: { common: { msg: "No client data found" } },
      });
    }

    const updatedOther =
      client.others.length > 0 &&
      client.others.map((other) => {
        if (String(other._id) == _id) {
          other.address = address ? address : other.address;
          other.phone = phone ? phone : other.phone;
          other.startDate = startDate ? startDate : other.startDate;
          other.endDate = endDate ? endDate : other.endDate;
        }
        return other;
      });

    client.others = updatedOther ? updatedOther : [];
    await client.save();

    return res.status(200).send({ success: "Other updated successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const removeOther = async (req, res) => {
  try {
    const { leadContact, otherId } = req.body;

    let client = await VendorContact.findOne({
      _id: leadContact,
      isDelete: false,
    });

    const newOther = client.others.filter((r) => String(r._id) != String(otherId));
    client.others = newOther;
    client.save();

    return res.status(200).send({ success: "Other removed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

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
      company: x[4],
      position: x[5],
    }));

    await VendorContact.insertMany(formatedData);
    return res.status(200).send("Imported");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Create New Vendor Position
const vendorPosition = asyncHandler(async (req, res) => {
  const { position } = req.body;

  console.log("Manik hello vendor", position);

  const vendorPosition = new VendorPosition({
    userId: req.user.id ? req.user.id : req.user._id,
    position,
  });

  // console.log('backend receive position data', position)

  vendorPosition.save((err, success) => {
    if (err) {
      if (err) {
        throw Error(err);
      }
    } else {
      return res.status(201).json({
        success: "Vendor contact created successfull",
      });
    }
  });
});

// Load or Fetch Vendor Position Data
const getVendorPositions = async (req, res) => {
  try {
    const { user } = req;
    const vendorPosition = await VendorPosition.find({
      userId: user._id,
    });

    return res.status(200).send(vendorPosition);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Delete Lead Position
const deleteVendorPosition = async (req, res) => {
  try {
    const { id } = req.params;
    await VendorPosition.deleteOne({ _id: id });

    return res.status(200).json({
      success: "Position deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Put Vendor Position Data
const putVendorPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { position } = req.body;
    const filter = { _id: id };
    const options = { upsert: true };
    const updatedDoc = {
      $set: {
        position: position,
      },
    };
    await VendorPosition.updateOne(filter, updatedDoc, options);

    return res.status(200).json({
      success: "Position edited successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
const getForAddEvent = async (req, res) => {
  try {
    const contacts = await VendorContact.find({
      userId: req.user._id,
      isDelete: false,
    }).select({ fullName: 1, email: 1, phone: 1 });
    res.send(contacts);
  } catch (error) {
    console.log(error);
    return res.status(404).send("data not found");
  }
};

module.exports = {
  getContacts,
  contactAdd,
  contactById,
  uploadAvatar,
  updateSocialLink,
  fileAddAndUpdate,
  deleteFile,
  updateBillingAddress,
  totalContact,
  totalContactCount,
  ColdLeadCount,
  warmLeadCount,
  HotLeadsCount,
  getSingleContact,
  updateContact,
  addNewOther,
  deleteContact,
  editOther,
  removeOther,
  importContactsFromArray,
  vendorPosition,
  getVendorPositions,
  deleteVendorPosition,
  putVendorPosition,
  getForAddEvent,
};
