const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("project");

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({
      project: projectId,
    });

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createTask,
  getTasks,
  getProjectTasks,
};