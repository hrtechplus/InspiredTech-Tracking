// Import required modules
const express = require("express");
const router = express.Router();
const Parcel = require("../models/parcelSchema"); // Import Parcel model

// GET parcel by tracking number
router.get("admin/parcels/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;

    // Find the parcel with the given tracking number
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

// GET all parcels
router.get("admin/parcels", async (req, res) => {
  try {
    const parcels = await Parcel.find().populate("user");
    res.status(200).json(parcels);
  } catch (error) {
    console.error("Error retrieving parcels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST create new parcel
router.post("admin/parcels", async (req, res) => {
  try {
    const newParcel = await Parcel.create(req.body);
    res.status(201).json(newParcel);
  } catch (error) {
    console.error("Error creating parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update parcel by tracking number
router.put("admin/parcels/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;
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
router.delete("admin/parcels/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;
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
