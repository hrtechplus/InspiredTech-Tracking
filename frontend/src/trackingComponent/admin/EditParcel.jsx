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
  Tr,
} from "@chakra-ui/react";
import axios from "axios";

const EditParcel = () => {
  const [parcels, setParcels] = useState([]);
  const [user, setUser] = useState({});
  const [trackingNumber, setTrackingNumber] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editParcel, setEditParcel] = useState(null);

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

  const handleEditParcel = (parcel) => {
    setEditMode(true);
    setEditParcel(parcel, user);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/admin/parcels/${editParcel.trackingNumber}`,
        editParcel
      );
      setEditMode(false);
      fetchParcels();
    } catch (error) {
      console.error("Error updating parcel:", error);
    }
  };

  const handleInputChange = (e, key) => {
    setEditParcel({
      ...editParcel,
      [key]: e.target.value,
    });
  };

  return (
    <Box p={8}>
      {!editMode ? (
        <>
          <Stack spacing={4} mb={8}>
            <FormControl>
              <FormLabel>Search Parcel by Tracking Number</FormLabel>
              <Input
                type="text"
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              onClick={async () => {
                try {
                  const response = await axios.get(
                    `http://localhost:5000/admin/parcels/${trackingNumber}`
                  );
                  setParcels([response.data]);
                  setUser([response.data.user]);
                } catch (error) {
                  console.error("Error searching parcel:", error);
                }
              }}
            >
              Search
            </Button>
          </Stack>

          <Table variant="simple">
            <Tbody>
              {parcels.map((parcel) => (
                <Tr key={parcel.trackingNumber}>
                  <Td>{parcel.parcelId}</Td>
                  <Td>{parcel.status}</Td>
                  <Td>{parcel.handOverDate}</Td>
                  <Td>{parcel.deliveryCost}</Td>
                  <Td>{parcel.trackingNumber}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEditParcel(parcel)}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <Box>
          <FormControl mb={4}>
            <FormLabel>Parcel ID</FormLabel>
            <Input
              type="text"
              value={editParcel.parcelId}
              onChange={(e) => handleInputChange(e, "parcelId")}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Status</FormLabel>
            <Input
              type="text"
              value={editParcel.status}
              onChange={(e) => handleInputChange(e, "status")}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Hand Over Date</FormLabel>
            <Input
              type="date"
              value={editParcel.handOverDate}
              onChange={(e) => handleInputChange(e, "handOverDate")}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Delivery Cost</FormLabel>
            <Input
              type="number"
              value={editParcel.deliveryCost}
              onChange={(e) => handleInputChange(e, "deliveryCost")}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSaveEdit} mr={2}>
            Save
          </Button>
          <Button
            colorScheme="gray"
            onClick={() => {
              setEditMode(false);
              setEditParcel(null);
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EditParcel;
