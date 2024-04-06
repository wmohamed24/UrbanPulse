import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  useToast,
  Text,
  Link,
  Divider,
} from "@chakra-ui/react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disabilityType, setDisabilityType] = useState("");
  const toast = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Assuming 'email' and 'password' states are already defined in your component
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          address: address,
          occupation: occupation,
          phoneNumber: phoneNumber,
          disabilityType: disabilityType,
        }),
      });

      if (response.ok) {
        await response.json(); // Assuming your server responds with JSON
        // Handle successful account creation
        navigate("/login");
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      // Handle fetch errors or custom errors thrown for failed sign-ups
      toast({
        title: "Failed to create account.",
        description: "Please check the details you provided and try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <Heading mb={6}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <InputField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isRequired={true}
          />
          <InputField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isRequired={true}
          />
          <InputField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            isRequired={true}
          />
          <InputField
            label="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            isRequired={true}
          />
          <InputField
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            isRequired={true}
          />
          <InputField
            label="Type of Disability"
            value={disabilityType}
            onChange={(e) => setDisabilityType(e.target.value)}
            isRequired={true}
          />
          <Divider marginY={5}></Divider>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired={true}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired={true}
          />

          <Button type="submit" colorScheme="teal" width="full" mt={4}>
            Sign Up
          </Button>
          <Text>
            Already have an account?{" "}
            <Link href="/login" color="teal" textDecoration="underline">
              Login
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUp;
