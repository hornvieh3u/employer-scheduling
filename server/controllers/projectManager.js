const projectManagement = require("../models/ProjectManager");

//** Create new table
exports.addProjectManagement = async (req, res) => {
  try {
    const { userID, title } = req.body;
    if (!userID || !title) {
      return res.status(400).json({
        success: false,
        message: "userID and title fields are required in the request body",
      });
    }

    if (typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Title fields must be of type string",
      });
    }

    const newTable = new projectManagement({
      userID,
      otherUser: [],
      title,
      rowData: [],
    });

    await newTable.save();

    const updatedTables = await projectManagement.find({
      $or: [{ userID: userID }, { otherUser: { $in: userID } }],
    });

    return res.status(201).json({
      success: true,
      data: updatedTables,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the New Table",
      error: err,
    });
  }
};

//** Fetch table data
exports.getProjectManagement = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "userID  are required in the request body",
      });
    }
    projectManagement.find(
      {
        $or: [{ userID: id }, { otherUser: { $in: id } }],
      },
      (error, result) => {
        if (error) {
          return res.status(400).json({
            success: false,
            massage: "Error while searching for data",
          });
        } else {
          res.status(200).json({ success: true, result });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

//** Update Table data
exports.updateProjectManagement = async (req, res) => {
  try {
    const { userID, tableID, title, rowData } = req.body;
    if (!userID || !tableID || (!title && !rowData)) {
      res.status(400).json({
        success: false,
        message: "UserID tableID and 'title or rowData'  are required in the request body",
      });
    }
    const checkTable = await projectManagement.find({ _id: tableID });

    if (!checkTable) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }
    await projectManagement.updateOne(
      { _id: tableID },
      { $set: { title: title, rowData: rowData } }
    );

    let updatedTables = await projectManagement.find({
      $or: [{ userID: userID }, { otherID: { $in: [userID] } }],
    });
    res
      .status(200)
      .json({ success: true, massage: "Table successfully Updated", Data: updatedTables });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error updating tables" });
  }
};

//** Add a new new in the table
exports.addRowProjectManagement = async (req, res) => {
  try {
    const { userID, tableID } = req.body;
    if (!tableID || !userID) {
      return res.status(400).json({
        success: false,
        message: "tableID and userID are required in the request body",
      });
    }

    projectManagement.findOne({ _id: tableID }, (err, result) => {
      if (err) {
        res.status(500).json({ success: false, error: "Failed to add new row" });
      } else {
        let newRow = {
          project: "",
          manager: { userID: "", value: "" },
          date: new Date(),
        };

        if (result.rowData && result.rowData.length >= 1) {
          const existingRow = result.rowData[0];
          delete existingRow._id;
          Object.keys(existingRow).forEach((key) => {
            if (key === "project") {
              newRow[key] = "";
            }
            if (key === "manager") {
              newRow[key] = [{ userID: "", value: "" }];
            }
            if (key === "date") {
              newRow[key] = new Date();
            }
            if (key === "text") {
              newRow[key] = "";
            }
            if (key === "people") {
              newRow[key] = [{ userID: "", value: "" }];
            }
            if (key === "timeline") {
              newRow[key] = new Date();
            }
            if (key === "status") {
              newRow[key] = [{ userID: "", value: "" }];
            }
          });
        }
        projectManagement
          .updateOne({ _id: tableID }, { $push: { rowData: newRow } }, { returnNewDocument: true })
          .then(async () => {
            let updatedTables = await projectManagement.find({
              $or: [{ userID: userID }, { otherID: { $in: userID } }],
            });

            res.status(200).json({
              success: true,
              msg: "New row added successfully",
              UpdatedTables: updatedTables,
            });
          })
          .catch((err) => {
            res.status(500).json({ success: false, error: "Failed to add new row" });
          });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add new row" });
  }
};

//** Add a new Column in the table
exports.addColumnProjectManagement = async (req, res) => {
  try {
    const { userID, tableID, columnType } = req.body;
    if (!tableID && !columnType && !userID) {
      return res.status(400).json({
        success: false,
        message: "tableID and Column type are required in the request body",
      });
    }
    const table = await projectManagement.findById(tableID);
    if (!table) {
      return res.status(404).json({ success: false, massage: "Table not found" });
    }
    let { rowData } = table;

    let keys = Object.keys(rowData[0]);
    if (keys.includes(columnType)) {
      return res.status(404).json({ success: false, massage: "column already exist" });
    }
    rowData.forEach((row) => {
      switch (columnType) {
        case "text":
          row[columnType] = "";
          break;
        case "timeline":
          row[columnType] = new Date();
          break;
        case "status":
          row[columnType] = [{ userID: "", value: "" }];
          break;
        case "people":
          row[columnType] = [{ userID: "", value: "" }];
          break;
        default:
          break;
      }
    });
    table.rowData = rowData;
    await table.save();
    const updatedTables = await projectManagement.find({
      $or: [{ userID: userID }, { otherUser: { $in: userID } }],
    });

    res.status(200).json({ success: true, data: updatedTables });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add new column" });
  }
};

//** Delete Table
exports.deleteTableProjectManagement = async (req, res) => {
  try {
    const { userID, tableID } = req.body;

    if (!tableID) {
      return res.status(400).json({
        success: false,
        message: "tableID are required in the request body",
      });
    }

    const deletedTable = await projectManagement.findByIdAndDelete(tableID);
    if (!deletedTable) {
      return res.status(404).json({
        success: false,
        message: "The requested project management data could not be found.",
      });
    }

    const updatedTables = await projectManagement.find({
      $or: [{ userID: userID }, { otherID: { $in: [userID] } }],
    });

    return res.status(200).json({
      success: true,
      data: updatedTables,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the project management data",
      error: err,
    });
  }
};

//** Delete Row('s)
exports.deleteRowProjectManagement = async (req, res) => {
  try {
    const { tableID, rowIDs, userID } = req.body;
    if (!tableID || !rowIDs || rowIDs.length < 1 || !userID) {
      return res.status(400).json({
        success: false,
        message: "userID TableID and rowID are required in the request body",
      });
    }
    projectManagement.updateMany(
      { tableID },
      { $pull: { rowData: { _id: { $in: rowIDs } } } },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the rowData objects",
            error: error,
          });
        }
        if (result.modifiedCount > 0) {
          let updatedTables = await projectManagement.find({
            $or: [{ userID: userID }, { otherID: { $in: [userID] } }],
          });
          res.status(200).json({
            success: true,
            message: "The rowData objects were successfully deleted",
            updatedTables: updatedTables,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "No matching rowData objects were found",
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting Row",
      error: err,
    });
  }
};

//** Delete Column

exports.deleteColumnProjectManagement = (req, res) => {
  try {
    const { userID, columnType, tableID } = req.body;

    const update = { [`$unset`]: { [`rowData.$[].${columnType}`]: 1 } };

    projectManagement.updateOne({ _id: tableID }, update, (error, result) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Error deleting column",
          error,
        });
      }
      projectManagement.find(
        {
          $or: [{ userID: userID }, { otherID: { $in: [userID] } }],
        },
        (error, data) => {
          if (error) {
            return res.status(400).json({
              success: false,
              message: "Error getting table data",
              error,
            });
          }

          return res.json({
            success: true,
            message: "Column deleted successfully",
            data: data,
          });
        }
      );
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occure while deleting column",
      error: error,
    });
  }
};
