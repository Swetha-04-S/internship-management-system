const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getProjectTasks,
} = require("../controllers/taskController");

router.post("/", createTask);

router.get("/", getTasks);

router.get("/project/:projectId", getProjectTasks);

module.exports = router;