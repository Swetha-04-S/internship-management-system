const User = require("../models/User");
const Task = require("../models/Task");
const Submission = require("../models/Submission");

const getProgress = async (req, res) => {
  try {

    const { studentId } = req.params;

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const totalTasks = await Task.countDocuments({
      project: student.assignedProject,
    });

    const reviewedTasks = await Submission.countDocuments({
      student: studentId,
      status: "Reviewed",
    });

    const progress =
      totalTasks === 0
        ? 0
        : Math.round(
            (reviewedTasks / totalTasks) * 100
          );

    res.status(200).json({
      success: true,
      totalTasks,
      reviewedTasks,
      progress,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getProgress,
};