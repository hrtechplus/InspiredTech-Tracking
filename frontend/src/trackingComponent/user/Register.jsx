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
  Link,
} from "@chakra-ui/react";
import NavigationBar from "./Component/NavigationBar";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
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
      if (response.data.message === "Email is already registered") {
        setEmailError(response.data.message);
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", formData);
      alert("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <NavigationBar path={"/login"} title={"Log In"} />
      <div
        style={{
          backgroundImage: `url('https://source.unsplash.com/random')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VStack
          spacing={4}
          align="flex-start"
          w="90%"
          maxW="400px"
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="lg"
        >
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

          <Text mt={4}>
            Already registered?{" "}
            <Link href="/login" color="blue">
              Login
            </Link>
          </Text>
        </VStack>
      </div>
    </>
  );
};

export default RegisterForm;
