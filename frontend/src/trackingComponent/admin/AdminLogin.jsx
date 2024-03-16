// src/components/LoginForm.js

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/parcel/login", {
        username,
        password,
      });
      // Assuming the server returns a success message upon successful login
      toast.success(response.data.message);
      console.log("Login successful:", response.data);
      // Redirect to dashboard or perform any other action upon successful login
    } catch (error) {
      // Display error toast if login fails
      toast.error("Login failed. Please check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <Box w="400px" p="20px" bg="gray.100" borderRadius="lg" boxShadow="lg">
      <VStack spacing={4} align="center">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Login
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default LoginForm;
