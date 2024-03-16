// backend/models/UserModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Username can't be blank"],
    // match: /^[a-zA-Z0-9]+$/, // damata meka ain karla thienne hari format ekata username generate karnna bari nisa

    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Email can't be blank"],
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password can't be blank"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
