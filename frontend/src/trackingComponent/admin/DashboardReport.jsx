import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box, Text, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import SideNavigation from "./Component/SideNavigation";

const DashboardReport = () => {
  const [parcels, setParcels] = useState([]);
  const [totalParcels, setTotalParcels] = useState(0);
  const [deliveredParcels, setDeliveredParcels] = useState(0);
  const [pendingParcels, setPendingParcels] = useState(0);
  const [inTransitParcels, setInTransitParcels] = useState(0);
  const [totalDeliveryCost, setTotalDeliveryCost] = useState(0);
  const toast = useToast();

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await axios.get("http://localhost:5001/admin/parcels");
      const parcelsData = response.data.parcels;
      setParcels(parcelsData);

      // Calculate totals
      let totalCost = 0;
      let deliveredCount = 0;
      let pendingCount = 0;
      let inTransitCount = 0;

      parcelsData.forEach((parcel) => {
        totalCost += parcel.deliveryCost;

        if (parcel.status === "Delivered") {
          deliveredCount++;
        } else if (parcel.status === "Pending") {
          pendingCount++;
        } else if (parcel.status === "In Transit") {
          inTransitCount++;
        }
      });

      setTotalDeliveryCost(totalCost);
      setTotalParcels(parcelsData.length);
      setDeliveredParcels(deliveredCount);
      setPendingParcels(pendingCount);
      setInTransitParcels(inTransitCount);
    } catch (error) {
      console.error("Error fetching parcels:", error);
      toast({
        title: "Error",
        description: "Failed to fetch parcels. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const generateReport = () => {
    // Format data for report
    const reportData = {
      totalParcels,
      deliveredParcels,
      pendingParcels,
      inTransitParcels,
      totalDeliveryCost,
    };

    // Convert data to PDF or any other format as needed
    // Here, I'm just logging the data for demonstration
    console.log("Report Data:", reportData);
  };

  const calculatePercentage = (count) => {
    return ((count / totalParcels) * 100).toFixed(2);
  };

  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateRows={"1fr"}
      gridTemplateColumns={"250px 1fr"}
      h="100vh"
      gap="1"
    >
      <GridItem pl="2" area={"nav"}>
        <SideNavigation />
      </GridItem>

      <GridItem pl="2" area={"main"} className="grid_second">
        <Box
          p={8}
          boxShadow="2xl"
          borderRadius="xl"
          m={4}
          width="100%"
          className="adminPanel"
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Dashboard Report
          </Text>
          <Box>
            <Text>Total Parcels: {totalParcels}</Text>
            <Text>
              Delivered Parcels: {deliveredParcels} (
              {calculatePercentage(deliveredParcels)}%)
            </Text>
            <Text>
              Pending Parcels: {pendingParcels} (
              {calculatePercentage(pendingParcels)}%)
            </Text>
            <Text>
              In Transit Parcels: {inTransitParcels} (
              {calculatePercentage(inTransitParcels)}%)
            </Text>
            <Text>Total Delivery Cost: රු{totalDeliveryCost.toFixed(2)}</Text>
          </Box>
          <Button mt={4} colorScheme="blue" onClick={generateReport} size="sm">
            Generate Report
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default DashboardReport;
