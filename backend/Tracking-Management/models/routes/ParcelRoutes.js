const express = require("express");
const mongoose = require("mongoose");
const parcelSchema = require("../models/parcelSchema");

// POST endpoint to handle incoming parcel data
app.post("/saveparcels", async (req, res) => {
  try {
    const parcelData = req.body; // Assuming the incoming data is in JSON format

    // Create a new Parcel instance with the received data
    const newParcel = new Parcel(parcelData);

    // Save the Parcel instance to the database
    const savedParcel = await newParcel.save();

    res.status(201).json(savedParcel); // Respond with the saved parcel data
  } catch (error) {
    console.error("Error saving parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
