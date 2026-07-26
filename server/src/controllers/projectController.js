const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getProjects = async (req, res) => {
  try {

    const projects = await Project.find();

    res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createProject,
  getProjects,
};