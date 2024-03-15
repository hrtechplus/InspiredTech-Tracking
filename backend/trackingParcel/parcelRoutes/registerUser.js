const userModel = require("../models/userSchema");
// Routes

app.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new UserModel(userData);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});
