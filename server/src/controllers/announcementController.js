const Announcement = require("../models/Announcement");

// Create Announcement
const createAnnouncement = async (req, res) => {
  try {

    const announcement = await Announcement.create(req.body);

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      announcement,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Announcements
const getAnnouncements = async (req, res) => {
  try {

    const announcements = await Announcement.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      announcements,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Announcement
const deleteAnnouncement = async (req, res) => {
  try {

    await Announcement.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Announcement deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
};