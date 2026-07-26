const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const studentRoutes = require("./routes/studentRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;