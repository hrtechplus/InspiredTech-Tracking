import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const SideMenu = () => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      bg={colorMode === "light" ? "#f8f8f8" : "#1a202c"}
      h="100vh"
      w={{ base: isOpen ? "200px" : "60px", md: "200px" }}
      boxShadow="lg"
      transition="width 0.5s ease"
      position="fixed"
      zIndex={10}
    >
      <Flex justify="space-between" align="center" p={4}>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={toggleMenu}
          aria-label={isOpen ? "Collapse Menu" : "Expand Menu"}
          display={{ base: "block", md: "none" }}
          variant="ghost"
        />
        <Text
          fontWeight="bold"
          fontSize="lg"
          ml={2}
          display={{ base: "none", md: "block" }}
        >
          Menu
        </Text>
      </Flex>

      <Flex direction="column" flex="1">
        <Button
          variant="ghost"
          colorScheme="primary"
          textAlign="left"
          justifyContent="flex-start"
          px={4}
          py={2}
          _hover={{ bg: "primary.100" }}
          transition="background-color 0.3s ease"
        >
          Navigation Item 1
        </Button>
        <Button
          variant="ghost"
          colorScheme="primary"
          textAlign="left"
          justifyContent="flex-start"
          px={4}
          py={2}
          _hover={{ bg: "primary.100" }}
          transition="background-color 0.3s ease"
        >
          Navigation Item 2
        </Button>
        <Button
          variant="ghost"
          colorScheme="primary"
          textAlign="left"
          justifyContent="flex-start"
          px={4}
          py={2}
          _hover={{ bg: "primary.100" }}
          transition="background-color 0.3s ease"
        >
          Navigation Item 3
        </Button>
        <Box mt="auto">
          <Button
            variant="outline"
            colorScheme="primary"
            w="full"
            py={4}
            fontWeight="bold"
            borderTopWidth="1px"
            _hover={{ bg: "primary.100" }}
            transition="background-color 0.3s ease"
          >
            Logout
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default SideMenu;
