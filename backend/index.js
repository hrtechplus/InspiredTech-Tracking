const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const TrackingRoutes = require("./Tracking-Management/routes/parcelRoutes");

// middlware section
app.use(cors());
app.use(express.json());
//mongodb connection implement

// backend connection implement start.
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

mongoose
  .connect(
    "mongodb+srv://nipunasachintha0022:mongotech123@inspiredtech.t0szwrd.mongodb.net/inspiredTech?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// mongodb connection implement end.

//Tracking System Routes
