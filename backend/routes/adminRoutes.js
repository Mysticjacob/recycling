const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");
const authorize = require("../middleware/authorize");

// Get all users (admin only)
router.get("/users", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Add a new user (admin only)
router.post("/users", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

  
    if (role && role.toLowerCase() === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You do not have permission to assign the admin role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new User({ name, email, password, role: role || "user" });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

router.delete("/users/:id", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
