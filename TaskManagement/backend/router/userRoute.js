
const express = require("express");
const router = express.Router();

const User = require("../model/userSchema");

// GET all existing users
router.get("/api/user", async (req, res) => {
  try {
    const users = await User.find().select("name email");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
