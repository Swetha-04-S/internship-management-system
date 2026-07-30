const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getProjectTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", createTask);

router.get("/", getTasks);

router.get("/project/:projectId", getProjectTasks);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;