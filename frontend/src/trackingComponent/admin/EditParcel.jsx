import React, { useState, useEffect } from "react";
import "./css/style.css";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Collapse,
} from "@chakra-ui/react";
import { SearchIcon, RepeatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";

const AdminPanel = () => {
  const [parcels, setParcels] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editParcel, setEditParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteParcelId, setDeleteParcelId] = useState(null);
  const [showFooter, setShowFooter] = useState(true);
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

  const handleRefresh = () => {
    fetchParcels();
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

  const handleEditParcel = (parcel) => {
    setEditMode(true);
    setEditParcel(parcel);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/admin/parcels/${editParcel.trackingNumber}`,
        editParcel
      );
      setEditMode(false);
      fetchParcels();
      setIsModalOpen(false);
      toast({
        title: "Parcel Updated",
        description: "The parcel has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating parcel:", error);
    }
  };

  const handleEditInputChange = (e, key) => {
    setEditParcel({
      ...editParcel,
      [key]: e.target.value,
    });
  };

  const handleDeleteConfirmation = (trackingNumber) => {
    setIsDeleteAlertOpen(true);
    setDeleteParcelId(trackingNumber);
  };

  const handleDeleteCancel = () => {
    setIsDeleteAlertOpen(false);
    setDeleteParcelId(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteParcelId) {
      await handleDeleteParcel(deleteParcelId);
      setIsDeleteAlertOpen(false);
    }
  };

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  return (
    <Center h="100vh" className="adminPanel_backGround">
      <Box
        p={8}
        boxShadow="2xl"
        borderRadius="xl"
        m={4}
        width="70%"
        mt={16}
        mb={16}
        className="adminPanel"
      >
        <FormLabel className="formLabel" fontSize="4xl">
          Search Parcel by Tracking Number
          <br />
        </FormLabel>
        <Stack spacing={4} mb={8} direction="row" align="center">
          <FormControl>
            <Input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button
            className="btn search-btn"
            leftIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search
          </Button>
          <IconButton
            className="btn refresh-btn"
            aria-label="Refresh parcels"
            icon={<RepeatIcon />}
            onClick={handleRefresh}
          />
        </Stack>

        <Box height="75%">
          <Table variant="simple">
            <Thead>
              <Tr boxShadow="md">
                <Th>Parcel ID</Th>
                <Th>Status</Th>
                <Th>Hand Over Date</Th>
                <Th>Delivery Cost</Th>
                <Th>Tracking Number</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody className=" table_body">
              {parcels.map((parcel) => (
                <Tr key={parcel._id} boxShadow="xs" rounded="md">
                  <Td>{parcel.parcelId}</Td>
                  <Td>{parcel.status}</Td>
                  <Td>{parcel.handOverDate}</Td>
                  <Td>{parcel.deliveryCost}</Td>
                  <Td>{parcel.trackingNumber}</Td>
                  <Td>
                    <IconButton
                      className=" btn edit_btn"
                      aria-label="Edit parcel"
                      icon={<EditIcon color={"#525CEB"} />}
                      onClick={() => handleEditParcel(parcel)}
                    />
                    <IconButton
                      className="btn delete-btn"
                      aria-label="Delete parcel"
                      icon={<DeleteIcon color={"#B31312"} />}
                      onClick={() =>
                        handleDeleteConfirmation(parcel.trackingNumber)
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Collapse in={showFooter} animateOpacity>
          <Box mt={4} p={4} bg="gray.100" borderRadius="md">
            <Text fontWeight="bold" mb={2}>
              Developer Details:
            </Text>
            <Text>Name: John Doe</Text>
            <Text>Email: john.doe@example.com</Text>
          </Box>
        </Collapse>
      </Box>

      {/* Edit Parcel Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Parcel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Parcel ID</FormLabel>
              <Input
                type="text"
                value={editParcel?.parcelId}
                onChange={(e) => handleEditInputChange(e, "parcelId")}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Status</FormLabel>
              <Input
                type="text"
                value={editParcel?.status}
                onChange={(e) => handleEditInputChange(e, "status")}
                placeholder="In Transit, Delivered, Pending"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Hand Over Date</FormLabel>
              <Input
                type="date"
                value={editParcel?.handOverDate}
                onChange={(e) => handleEditInputChange(e, "handOverDate")}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Delivery Cost</FormLabel>
              <Input
                type="number"
                value={editParcel?.deliveryCost}
                onChange={(e) => handleEditInputChange(e, "deliveryCost")}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button
              colorScheme="gray"
              ml={3}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Parcel Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={undefined}
        onClose={handleDeleteCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Parcel</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this parcel? This action cannot be
              undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={handleDeleteConfirm}>
                Delete
              </Button>
              <Button onClick={handleDeleteCancel}>Cancel</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
};

export default AdminPanel;
