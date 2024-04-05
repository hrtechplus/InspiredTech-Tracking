const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const test = require("./trackingParcel/parcelRoutes/routes");
const saveParcelRoute = require("./trackingParcel/parcelRoutes/saveParcelRoute");
const registerUser = require("./trackingParcel/parcelRoutes/registerUser");
const loginAdmin = require("./trackingParcel/parcelRoutes/loginAdmmin");
const adminRoutes = require("./trackingParcel/parcelRoutes/adminRoutes");

// middle ware
const checkEmailMiddleware = require("./trackingParcel/Middleware/checkEmailMiddleware");

// Middleware section
app.use(cors());
app.use(express.json());

// MongoDB connection implementation
mongoose
  .connect(
    "mongodb+srv://nipunasachintha0022:mongotech123@inspiredtech.t0szwrd.mongodb.net/inspiredTech?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(test);
app.use(saveParcelRoute);

app.use(loginAdmin);
app.use(adminRoutes);
