const userModel = require("../models/userSchema");
const express = require("express");

const router = express.Router();
// Routes

router.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new userModel(userData);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router;
