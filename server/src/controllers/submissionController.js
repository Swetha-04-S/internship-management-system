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
// Review Submission
const reviewSubmission = async (req, res) => {
    try {
  
      const { id } = req.params;
      const { marks, feedback } = req.body;
  
      const submission = await Submission.findById(id);
  
      if (!submission) {
        return res.status(404).json({
          success: false,
          message: "Submission not found",
        });
      }
  
      submission.marks = marks;
      submission.feedback = feedback;
      submission.status = "Reviewed";
  
      await submission.save();
  
      res.status(200).json({
        success: true,
        message: "Submission reviewed successfully",
        submission,
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
  reviewSubmission,
};