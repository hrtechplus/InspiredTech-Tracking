const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const inventoryRoutes = require("./inventoryControl/inventoryRoutes/routes");

// Middleware section
app.use(cors());
app.use(express.json());

// MongoDB connection implementation
mongoose
  .connect(
    "mongodb+srv://savishkadilshan:in5sDjaq8SnZqcLz@cluster0.pj8muri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
app.use('/inventoryPanel', inventoryRoutes); // For all the Inventory Control Panel routes
