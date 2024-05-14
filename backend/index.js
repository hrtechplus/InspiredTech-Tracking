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
// savishkas
const inventoryRoutes = require("./inventoryControl/inventoryRoutes/routes");
const supplierRouter = require("./supplierPanel/routes/suppliers.js");
const orderRouter = require("./supplierPanel/routes/orders.js");
const feedbackRoter = require("./feedbackPanel/routes/FeedbackRoute.js");
const questionRouter = require("./feedbackPanel/routes/questionRoute.js");
const promotionRouter = require("./marketingPanel/routes/promotionRoute.js");

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
const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//middle ware functions

app.use(test);
app.use(saveParcelRoute);
app.use(checkEmailMiddleware, registerUser);
app.use(loginAdmin);
app.use(adminRoutes);

//  savishkas all routes
// All the routes
app.use("/inventoryPanel", inventoryRoutes); // For all the Inventory Control Panel routes
app.use("/supplier", supplierRouter);
app.use("/order", orderRouter);
app.use("/api/user", feedbackRoter);
app.use("/api/question", questionRouter);
app.use("/api/userpromo", promotionRouter);
