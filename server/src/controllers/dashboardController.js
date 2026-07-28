const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Submission = require("../models/Submission");

const getDashboardStats = async (req, res) => {
  try {

    const students = await User.countDocuments({
      role: "student",
    });

    const projects = await Project.countDocuments();

    const tasks = await Task.countDocuments();

    const pendingReviews = await Submission.countDocuments({
      status: "Submitted",
    });

    const reviewed = await Submission.countDocuments({
      status: "Reviewed",
    });

    res.status(200).json({
      success: true,
      students,
      projects,
      tasks,
      pendingReviews,
      reviewed,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};