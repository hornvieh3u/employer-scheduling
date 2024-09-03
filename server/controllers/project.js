const mongoose = require("mongoose");
const { Project } = require("../models/index/index");

exports.newProject = async (req, res) => {
  const { projectName, projectThumnail, startDate, dateline, budget } = req.body;
  const { user } = req;

  try {
    const project = new Project({
      userId: user._id,
      projectName,
      projectThumnail,
      startDate,
      dateline,
      budget,
    });

    await project.save();

    return res.status(201).json({
      success: "New project created successful",
    });
  } catch (errro) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.updateProject = async (req, res) => {
  const { projectName, projectThumnail, startDate, dateline, budget } = req.body;
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        errors: { common: { msg: "No project data found" } },
      });
    }

    project.projectName = projectName ? projectName : project.projectName;
    project.projectThumnail = projectThumnail ? projectThumnail : project.projectThumnail;
    project.startDate = startDate ? startDate : project.startDate;
    project.dateline = dateline ? dateline : project.dateline;
    project.budget = budget ? budget : project.budget;
    await project.save();

    return res.status(200).json({
      success: "Project updated successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        errors: { common: { msg: "No project data found" } },
      });
    }

    project.isDelete = true;
    await project.save();

    return res.status(200).json({
      success: "Project deleted successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    let { pageSize, page } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const { user } = req;

    const projects = await Project.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(user._id),
          isDelete: false,
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page } }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
    ]);

    const data = {
      list: projects.length > 0 ? projects[0].data : [],
      total: projects[0].metadata.length > 0 ? projects[0].metadata[0].total : 0,
      noOfPage: projects[0].metadata.length > 0 ? projects[0].metadata[0].page : 0,
    };

    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({ _id: id, isDelete: false });
    if (!project) {
      return res.status(500).json({
        message: "No project data found",
      });
    }
    res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};
