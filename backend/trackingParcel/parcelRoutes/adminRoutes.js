// Import required modules
const express = require("express");
const router = express.Router();
const Parcel = require("../models/parcelSchema"); // Import Parcel model
const User = require("../models/userSchema"); // Import User model

// GET parcel by tracking number
router.get("/admin/parcels/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;

    // Find the parcel with the given tracking number and populate the user details
    const parcel = await Parcel.findOne({ trackingNumber }).populate("user");

    if (!parcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    res.status(200).json(parcel);
  } catch (error) {
    console.error("Error retrieving parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch all parcels with their data
router.get("/admin/parcels", async (req, res) => {
  try {
    // Fetch all parcels and populate user details for each parcel
    const parcels = await Parcel.find().populate("user");
    res.status(200).json(parcels);
  } catch (error) {
    console.error("Error fetching parcels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST create new parcel
router.post("/admin/parcels", async (req, res) => {
  try {
    // Create a new parcel using the request body
    const newParcel = await Parcel.create(req.body);
    res.status(201).json(newParcel);
  } catch (error) {
    console.error("Error creating parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update parcel by tracking number
router.put("/admin/parcels/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;
    // Find and update the parcel with the given tracking number
    const updatedParcel = await Parcel.findOneAndUpdate(
      { trackingNumber },
      req.body,
      { new: true }
    );
    if (!updatedParcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }
    res.status(200).json(updatedParcel);
  } catch (error) {
    console.error("Error updating parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE parcel by tracking number
router.delete("/admin/parcels/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;
    // Find and delete the parcel with the given tracking number
    const deletedParcel = await Parcel.findOneAndDelete({ trackingNumber });
    if (!deletedParcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }
    res.status(200).json({ message: "Parcel deleted successfully" });
  } catch (error) {
    console.error("Error deleting parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
