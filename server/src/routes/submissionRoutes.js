const express = require("express");

const router = express.Router();

const {
  createSubmission,
  getSubmissions,
  reviewSubmission,
  getStudentSubmissions,
} = require("../controllers/submissionController");

// Student submits work
router.post("/", createSubmission);

// Coordinator gets all submissions
router.get("/", getSubmissions);

// Student views own submissions
router.get("/student/:studentId", getStudentSubmissions);

// Coordinator reviews submission
router.put("/:id", reviewSubmission);

module.exports = router;