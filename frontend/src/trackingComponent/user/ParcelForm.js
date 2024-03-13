// src/components/ParcelForm.js
import React, { useState } from "react";
import axios from "axios";

const ParcelForm = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [parcelData, setParcelData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/parcels/${trackingNumber}`
      );
      setParcelData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error fetching parcel data. Please check the tracking number.");
      console.error("Error fetching parcel data:", error);
    }
  };

  const handleNewSearch = () => {
    setParcelData(null);
    setError(null);
    setTrackingNumber(""); // Clear the input field
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {parcelData && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Parcel ID</th>
                <th>Status</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{parcelData.parcelId}</td>
                <td>{parcelData.status}</td>
                {/* Map other parcel data here */}
              </tr>
            </tbody>
          </table>
          <button onClick={handleNewSearch}>New Search</button>
        </div>
      )}
    </div>
  );
};

export default ParcelForm;
