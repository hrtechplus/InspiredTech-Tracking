const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const test = require("./trackingParcel/parcelRoutes/routes");
const saveParcelRoute = require("./trackingParcel/parcelRoutes/saveParcelRoute");
const registerUser = require("./trackingParcel/parcelRoutes/registerUser");
const loginAdmin = require("./trackingParcel/parcelRoutes/loginAdmmin");
const adminRoutes = require("./trackingParcel/parcelRoutes/adminRoutes");
//Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXkO_in8zj4gq9eZD61fI8qQMC731FV2k",
  authDomain: "inspiredtech-94bb7.firebaseapp.com",
  projectId: "inspiredtech-94bb7",
  storageBucket: "inspiredtech-94bb7.appspot.com",
  messagingSenderId: "339639503951",
  appId: "1:339639503951:web:c1e0c58b5381f8240aae3a",
  measurementId: "G-GHX1YSXQEP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Firebase end
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
app.use(registerUser);
app.use(loginAdmin);
app.use(adminRoutes);
