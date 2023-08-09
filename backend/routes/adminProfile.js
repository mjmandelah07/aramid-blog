const express = require("express");
const router = express.Router();
const AdminProfile = require("../models/AdminProfile");

// Get admin information
router.get("/", async (req, res) => {
  try {
    const admin = await AdminProfile.findOne();
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
