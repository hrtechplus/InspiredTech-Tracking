const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const test = require("./trackingParcel/parcelRoutes/routes");
const saveParcelRoute = require("./trackingParcel/parcelRoutes/saveParcelRoute");
const inventoryRoutes = require("./inventoryControl/inventoryRoutes/routes");

// Middleware section
app.use(cors());
app.use(express.json());

// MongoDB connection implementation
mongoose
  .connect(
    "" // remove for now since uplading this file to GitHub
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

// All the routes
app.use(test);
app.use(saveParcelRoute);
app.use('/inventoryPanel', inventoryRoutes); // For all the Inventory Control Panel routes
