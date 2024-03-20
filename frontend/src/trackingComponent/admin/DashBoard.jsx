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
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";

const AdminPanel = () => {
  const [parcels, setParcels] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const toast = useToast();

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
      toast({
        title: "Parcel Deleted",
        description: "The parcel has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting parcel:", error);
      toast({
        title: "Error",
        description: "Failed to delete parcel. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
      toast({
        title: "Error",
        description: "Failed to search for parcel. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Stack spacing={4} mb={8} direction="row" align="center">
        <FormControl>
          <FormLabel>Search Parcel by Tracking Number</FormLabel>
          <Input
            type="text"
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          leftIcon={<SearchIcon />}
          onClick={handleSearch}
        >
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
                <IconButton
                  colorScheme="red"
                  aria-label="Delete parcel"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteParcel(parcel.trackingNumber)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminPanel;
