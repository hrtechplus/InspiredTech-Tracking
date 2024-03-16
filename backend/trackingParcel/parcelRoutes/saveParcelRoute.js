const express = require("express");
const router = express.Router();
const ParcelModel = require("../models/parcelSchema"); // Update import to match the new schema filename

// POST route to handle incoming parcel data
router.post("/parcels", async (req, res) => {
  try {
    // Extract parcel data from request body
    const {
      parcelId,
      status,
      handOverDate,
      deliveryCost,
      trackingNumber,
      user,
    } = req.body;

    // Create a new Parcel instance with the received data
    const newParcel = new ParcelModel({
      parcelId,
      status,
      handOverDate,
      deliveryCost,
      trackingNumber,
      user, // Include user reference
      // Add more properties as needed
    });

    // Save the Parcel instance to the database
    const savedParcel = await newParcel.save();

    res.status(201).json(savedParcel); // Respond with the saved parcel data
  } catch (error) {
    console.error("Error saving parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET route to retrieve a specific parcel by tracking number
router.get("/parcels/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;

    // Find the parcel with the given tracking number
    const parcel = await ParcelModel.findOne({ trackingNumber }).populate(
      "user"
    ); // Populate user details

    if (!parcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    res.status(200).json(parcel);
  } catch (error) {
    console.error("Error retrieving parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
