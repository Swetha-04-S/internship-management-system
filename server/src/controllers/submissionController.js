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
    console.error("========== CREATE SUBMISSION ERROR ==========");
    console.error(error);
    console.error(error.stack);

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
    console.error("========== GET SUBMISSIONS ERROR ==========");
    console.error(error);
    console.error(error.stack);

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

    console.log("========== REVIEW REQUEST ==========");
    console.log("Submission ID:", id);
    console.log("Request Body:", req.body);

    const submission = await Submission.findById(id);

    console.log("Submission Found:");
    console.log(submission);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    submission.marks = Number(marks);
    submission.feedback = feedback;
    submission.status = "Reviewed";

    console.log("Saving submission...");

    await submission.save();

    console.log("Submission saved successfully.");

    res.status(200).json({
      success: true,
      message: "Submission reviewed successfully",
      submission,
    });
  } catch (error) {
    console.error("========== REVIEW SUBMISSION ERROR ==========");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get submissions of a student
const getStudentSubmissions = async (req, res) => {
  try {
    const { studentId } = req.params;

    const submissions = await Submission.find({
      student: studentId,
    }).populate("task", "title");

    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error("========== STUDENT SUBMISSIONS ERROR ==========");
    console.error(error);
    console.error(error.stack);

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
  getStudentSubmissions,
};