import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";

const AdminPanel = () => {
  const [parcels, setParcels] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/admin/parcels");
      setParcels(response.data);
    } catch (error) {
      toast({
        title: "Error fetching parcels.",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error fetching parcels:", error);
    }
    setLoading(false);
  };

  const handleDeleteParcel = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/admin/parcels/${id}`);
      toast({
        title: "Parcel deleted.",
        description: `Parcel with tracking number ${id} has been deleted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchParcels();
    } catch (error) {
      toast({
        title: "Error deleting parcel.",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error deleting parcel:", error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/parcels/${trackingNumber}`
      );
      setParcels([response.data]);
    } catch (error) {
      toast({
        title: "Error searching parcel.",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error searching parcel:", error);
    }
    setLoading(false);
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
        <Button
          leftIcon={<SearchIcon />}
          colorScheme="teal"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>

      {loading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Parcel ID</Th>
              <Th>Status</Th>
              <Th>Handover Date</Th>
              <Th>Delivery Cost</Th>
              <Th>Tracking Number</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
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
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteParcel(parcel._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default AdminPanel;
