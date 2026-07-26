const express = require("express");

const router = express.Router();

const {
    getStudents,
    assignProject,
    getMyProject,
  } = require("../controllers/studentController");

// Get all students
router.get("/", getStudents);

// Assign project to student
router.put("/assign-project", assignProject);
router.get("/my-project/:studentId", getMyProject);

module.exports = router;