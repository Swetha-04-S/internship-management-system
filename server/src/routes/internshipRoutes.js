const express = require("express");

const {
  createInternship,
  getInternships,
} = require("../controllers/internshipController");

const router = express.Router();

router.post("/", createInternship);

router.get("/", getInternships);

module.exports = router;