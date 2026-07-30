const User = require("../models/User");
const Project = require("../models/Project");

// Get All Students
const getStudents = async (req, res) => {
  try {
    const students = await User.find(
      { role: "student" },
      "-password"
    ).populate("assignedProject", "title");

    res.status(200).json({
      success: true,
      students,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Assign Project to Student
const assignProject = async (req, res) => {
  try {

    const { studentId, projectId } = req.body;

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    student.assignedProject = projectId;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Project assigned successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getMyProject = async (req, res) => {
    try {
  
      const { studentId } = req.params;
  
      const student = await User.findById(studentId)
        .populate("assignedProject");
  
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }
  
      res.status(200).json({
        success: true,
        project: student.assignedProject,
      });
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
};

module.exports = {
    getStudents,
    assignProject,
    getMyProject,
  };
