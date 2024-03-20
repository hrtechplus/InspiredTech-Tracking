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
import AddParcel from "./AddParcel";

const AdminPanel = () => {
  const [parcels, setParcels] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");

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

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/parcels/${trackingNumber}`
      );
      setParcels([response.data]);
    } catch (error) {
      console.error("Error searching parcel:", error);
    }
  };

  return (
    <Box p={8}>
      <Stack spacing={4} mb={8}>
        <FormControl>
          <FormLabel>Search Parcel by Tracking Number</FormLabel>
          <Input
            type="text"
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
      </Stack>

      <Table variant="simple">
        <Tbody>
          {parcels.map((parcel) => (
            <Tr key={parcel._id}>
              <Td>{parcel.parcelId}</Td>
              <Td>{parcel.status}</Td>
              <Td>{parcel.handOverDate}</Td>
              <Td>{parcel.deliveryCost}</Td>
              <Td>{parcel.trackingNumber}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteParcel(parcel.trackingNumber)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AddParcel />
    </Box>
  );
};

export default AdminPanel;
