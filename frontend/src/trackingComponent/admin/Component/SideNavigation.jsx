import React from "react";
import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Box
      pos="fixed"
      left={0}
      top={0}
      h="100%"
      w="250px"
      bg="gray.800"
      color="white"
      p={4}
    >
      <Flex direction="column" h="100%">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Sidebar Menu
          </Text>
          <Box>
            <Text>Link 1</Text>
            <Text>Link 2</Text>
            <Text>Link 3</Text>
            {/* Add more links here */}
          </Box>
        </Box>
        <Spacer />
        <Box mt="auto">
          <Button colorScheme="red" variant="outline">
            Logouts
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
