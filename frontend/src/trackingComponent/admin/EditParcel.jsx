import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";

const AdminPanel = () => {
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/parcels");
      setParcels(response.data);
    } catch (error) {
      console.error("Error fetching parcels:", error);
    }
  };

  const handleDeleteParcel = async (trackingNumber) => {
    try {
      await axios.delete(
        `http://localhost:5000/admin/parcels/${trackingNumber}`
      );
      fetchParcels();
    } catch (error) {
      console.error("Error deleting parcel:", error);
    }
  };

  const handleParcelClick = (parcel) => {
    setSelectedParcel(parcel);
    setShowUpdateForm(true);
  };

  const handleUpdateParcel = async () => {
    try {
      await axios.put(
        `http://localhost:5000/admin/parcels/${selectedParcel.trackingNumber}`,
        selectedParcel
      );
      fetchParcels();
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating parcel:", error);
    }
  };

  return (
    <Box p={8}>
      <Stack spacing={4} mb={8}>
        {/* Search form */}
        {/* Refresh button */}
      </Stack>

      <Table variant="simple">
        <Tbody>
          {parcels.map((parcel) => (
            <Tr key={parcel._id} onClick={() => handleParcelClick(parcel)}>
              {/* Table cells */}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Update form */}
      {showUpdateForm && (
        <Box mt={4}>
          {/* Input fields to display and update parcel data */}
          {/* Update button */}
        </Box>
      )}
    </Box>
  );
};

export default AdminPanel;
