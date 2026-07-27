const express = require("express");

const router = express.Router();

const {
  createSubmission,
  getSubmissions,
  reviewSubmission,
} = require("../controllers/submissionController");

// Student submits work
router.post("/", createSubmission);

// Coordinator gets all submissions
router.get("/", getSubmissions);

// Coordinator reviews submission
router.put("/:id", reviewSubmission);

module.exports = router;