const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userSchema"); // Assuming the user model is exported from userSchema.js

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists in the database
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // If the credentials are correct, redirect to the dashboard or send a success message
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
