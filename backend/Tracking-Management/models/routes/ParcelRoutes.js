const parcelSchema = require("../parcelSchema");
const express = require("express");
const router = express.Router();
const app = express();

// POST endpoint to handle incoming parcel data
app.post("/saveparcels", async (req, res) => {
  try {
    const parcelData = req.body; // Assuming the incoming data is in JSON format

    const newParcel = new parcelSchema(parcelData);

    // Save the Parcel instance to the database
    const savedParcel = await newParcel.save();

    res.status(201).json(savedParcel); // Respond with the saved parcel data
  } catch (error) {
    console.error("Error saving parcel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get the all parcel data

app.get("/getparcels", async (req, res) => {
  try {
    const parcels = await parcelSchema.find(); // Retrieve all parcels from the database
    res.status(200).json(parcels); // Respond with the retrieved parcels
  } catch (error) {
    console.error("Error retrieving parcels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// this one is for the testing

app.get("/test", async (req, res) => {
  try {
    res.status(200).json({ message: "Test endpoint works!" });
  } catch (error) {
    console.error("Error retrieving parcels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
