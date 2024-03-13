const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const parcelSchema = require("../models/parcelSchema");
const express = require("express");
const app = express();

// POST endpoint to handle incoming parcel data
app.post("/saveparcels", async (req, res) => {
  try {
    const parcelData = req.body; // Assuming the incoming data is in JSON format

    // HERE IS THE SAMPLE JSON FILE

    //     {
    //   "parcelId": "ABC123", // Unique parcel ID
    //   "status": "In Transit", // Parcel status (e.g., In Transit, Delivered, Pending)
    //   "handOverDate": "2024-03-10T14:30:00Z", // Date of handover to delivery company
    //   "deliveryCost": 25.99, // Delivery cost in your currency
    //   "trackingNumber": "XYZ789" // Unique tracking number
    // }

    // SAMPLE JSON FILE END

    // Create a new Parcel instance with the received data
    const newParcel = new parcelSchema(parcelData);

    // Save the Parcel instance to the database
    const savedParcel = await newParcel.save();

    res.status(201).json(savedParcel); // Respond with the saved parcel data
  } catch (error) {
    console.error("Error saving parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
