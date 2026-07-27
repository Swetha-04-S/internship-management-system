const Submission = require("../models/Submission");

// Create Submission
const createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create(req.body);

    res.status(201).json({
      success: true,
      message: "Submission uploaded successfully",
      submission,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Submissions
const getSubmissions = async (req, res) => {
  try {

    const submissions = await Submission.find()
      .populate("student", "name email")
      .populate("task", "title");

    res.status(200).json({
      success: true,
      submissions,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createSubmission,
  getSubmissions,
};