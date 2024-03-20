import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

const Dashboard = () => {
  const [parcelStats, setParcelStats] = useState({});
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    // Fetch parcel statistics
    axios
      .get("/admin/parcels/stats")
      .then((response) => {
        setParcelStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parcel statistics:", error);
      });

    // Fetch list of parcels
    axios
      .get("/admin/parcels")
      .then((response) => {
        setParcels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parcels:", error);
      });
  }, []);

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Dashboard
      </Heading>

      <Flex justify="space-between" mb={8}>
        <Stat>
          <StatLabel>Total Parcels</StatLabel>
          <StatNumber>{parcelStats.totalParcels}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>In Transit</StatLabel>
          <StatNumber>{parcelStats.inTransit}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Delivered</StatLabel>
          <StatNumber>{parcelStats.delivered}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Pending</StatLabel>
          <StatNumber>{parcelStats.pending}</StatNumber>
        </Stat>
      </Flex>

      <Stack spacing={6}>
        <Heading as="h2" size="lg" mb={4}>
          Parcels
        </Heading>
        <Table variant="simple">
          <Tbody>
            {parcels.map((parcel) => (
              <Tr key={parcel._id}>
                <Td>{parcel.trackingNumber}</Td>
                <Td>{parcel.status}</Td>
                <Td>{parcel.deliveryCost}</Td>
                <Td>{parcel.handOverDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>

      {/* Add form for creating new parcels */}
    </Box>
  );
};

export default Dashboard;
