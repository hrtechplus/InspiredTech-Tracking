const mongoose = require("mongoose");
const parcelSchema = require("../models/parcelSchema");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/your-database-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Create a new Parcel instance
    const newParcel = new Parcel({
      parcelId: "ABC123",
      status: "In Transit",
      handOverDate: new Date(),
      deliveryCost: 10.99,
      trackingNumber: "TRK123456789",
      // Add more properties if needed
    });

    // Save the Parcel instance to the database
    newParcel
      .save()
      .then((savedParcel) => {
        console.log("Parcel saved successfully:", savedParcel);
      })
      .catch((error) => {
        console.error("Error saving parcel:", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
