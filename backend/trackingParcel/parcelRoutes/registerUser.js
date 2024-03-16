const UserModel = require("../models/userSchema"); // Update import to match the schema filename
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router(); // Fixed router initialization

// Routes
router.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new UserModel({
      username: userData.username,
      email: userData.email,
      password: hashedPassword, // Save the hashed password
      role: userData.role,
      address: userData.address, // Include address data
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router; // Exporting the router
