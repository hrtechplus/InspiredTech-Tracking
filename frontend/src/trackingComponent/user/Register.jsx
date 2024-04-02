// RegisterForm.jsx

import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/checkEmail",
        {
          email: formData.email,
        }
      );
      setEmailError(response.data.message);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000//api/register", formData);
      alert("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <VStack spacing={4} align="flex-start" w="100%">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleCheckEmail}
        />
        {emailError && (
          <Alert status="error" variant="subtle">
            <AlertIcon />
            {emailError}
          </Alert>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Register
      </Button>
    </VStack>
  );
};

export default RegisterForm;
