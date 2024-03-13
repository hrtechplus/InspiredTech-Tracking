const mongoose = require("mongoose");

// Define the Parcel schema
const parcelSchema = new mongoose.Schema({
  parcelId: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of Parcel ID
  },
  status: {
    type: String,
    required: true,
    enum: ["In Transit", "Delivered", "Pending"], // Example status values
  },
  handOverDate: {
    type: Date,
    required: true,
  },
  deliveryCost: {
    type: Number,
    required: true,
  },
  trackingNumber: {
    type: String,
    required: true,
  },
  // You can add more properties as needed (e.g., location, carrier, etc.)
});

// Create the Parcel model
const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;
