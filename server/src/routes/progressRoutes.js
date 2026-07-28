const express = require("express");

const router = express.Router();

const {
  getProgress,
} = require("../controllers/progressController");

// Get student internship progress
router.get("/:studentId", getProgress);

module.exports = router;