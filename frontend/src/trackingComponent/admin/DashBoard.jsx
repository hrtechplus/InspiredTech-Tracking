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
  useDisclosure,
  IconButton,
  Icon,
  DeleteIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

const AdminPanel = () => {
  const [parcels, setParcels] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleViewDetails = (parcel) => {
    // Implement logic to display detailed information about the parcel
    // You can use a modal, drawer, or another UI component
    console.log("View details for parcel:", parcel);
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");

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
          <Icon name="SearchIcon" /> Search
        </Button>
      </Stack>

      <Table variant="simple" bg={bgColor}>
        <Tbody>
          <Tr>
            <Td>Parcel ID</Td>
            <Td>Status</Td>
            <Td>Hand Over Date</Td>
            <Td>Delivery Cost</Td>
            <Td>Tracking Number</Td>
            <Td isNumeric>
              <Menu>
                <MenuButton as={IconButton} icon={<Icon as={DeleteIcon} />}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => handleDeleteParcel(parcel.trackingNumber)}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem onClick={() => handleViewDetails(parcel)}>
                    View Details
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
          {parcels.map((parcel) => (
            <Tr key={parcel._id}>
              <Td>{parcel.parcelId}</Td>
              <Td>{parcel.status}</Td>
              <Td>{parcel.handOverDate}</Td>
              <Td>{parcel.deliveryCost}</Td>
              <Td>{parcel.trackingNumber}</Td>
              <Td isNumeric>
                <Menu>
                  <MenuButton as={IconButton} icon={<Icon as={DeleteIcon} />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => handleDeleteParcel(parcel.trackingNumber)}
                    >
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => handleViewDetails(parcel)}>
                      View Details
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={1}>Parcel Details</DrawerHeader>

          <DrawerBody>
            {/* Implement detailed information about the selected parcel here */}
            <Text>Parcel ID: {/* Display parcel ID */}</Text>
            <Text>Tracking Number: {/* Display tracking number */}</Text>
            <Text>Status: {/* Display parcel status */}</Text>
            <Text>Hand Over Date: {/* Display hand over date */}</Text>
            <Text>Delivery Cost: {/* Display delivery cost */}</Text>
            {/* You can add more details based on your data structure */}
          </DrawerBody>

          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AdminPanel;
