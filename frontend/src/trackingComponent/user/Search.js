// src/components/ParcelForm.js
import React, { useState } from "react";
import axios from "axios";

const ParcelForm = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [parcelData, setParcelData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/parcels/${trackingNumber}`);
      setParcelData(response.data);
    } catch (error) {
      console.error("Error fetching parcel data:", error);
    }
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
      {parcelData && (
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
      )}
    </div>
  );
};

export default ParcelForm;
