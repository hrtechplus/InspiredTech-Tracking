// Import required modules
const express = require("express");
const router = express.Router();
const Parcel = require("../models/parcelSchema"); // Import Parcel model
const UserModel = require("../models/userSchema");

// GET parcel by tracking number
router.get("/admin/parcels/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;

    // Find the parcel with the given tracking number and populate the user details
    const parcel = await Parcel.findOne({ trackingNumber });

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
    const parcels = await Parcel.find();
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
    // Find the parcel with the given tracking number
    const parcel = await Parcel.findOne({ trackingNumber });
    if (!parcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }
    // Update the parcel data with the request body
    Object.assign(parcel, req.body);
    // Save the updated parcel
    const updatedParcel = await parcel.save();
    res.status(200).json(updatedParcel);
  } catch (error) {
    console.error("Error updating parcel:", error);
    res.status(500).json({ error: "Internal Server Errors" });
  }
});

// POST route to handle incoming parcel data
router.post("/admin/addparcels", async (req, res) => {
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

// Route to get a specific user by email
router.get("/api/user/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
