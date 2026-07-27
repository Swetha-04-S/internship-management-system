const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    githubLink: {
      type: String,
      required: true,
    },

    demoLink: {
      type: String,
      default: "",
    },

    comments: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Submitted", "Reviewed"],
      default: "Submitted",
    },

    marks: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Submission",
  submissionSchema
);