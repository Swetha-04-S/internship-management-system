const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Submission = require("../models/Submission");

const getReports = async (req, res) => {
  try {
    const students = await User.countDocuments({
      role: "student",
    });

    const projects = await Project.countDocuments();

    const tasks = await Task.countDocuments();

    const reviewed = await Submission.countDocuments({
      status: "Reviewed",
    });

    const pending = await Submission.countDocuments({
      status: "Submitted",
    });

    const submissions = await Submission.find();

    const averageMarks =
      submissions.length > 0
        ? Math.round(
            submissions.reduce(
              (total, submission) => total + (submission.marks || 0),
              0
            ) / submissions.length
          )
        : 0;

    const completion =
      tasks > 0
        ? Math.round((reviewed / tasks) * 100)
        : 0;

    res.status(200).json({
      success: true,
      students,
      projects,
      tasks,
      reviewed,
      pending,
      averageMarks,
      completion,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getReports,
};