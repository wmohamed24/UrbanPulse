import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

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
        }),
      });

      if (response.ok) {
        await response.json(); // Assuming your server responds with JSON
        // Handle successful account creation
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // Redirect to login page after successful sign up
        // window.location.href = '/login'; // Adjust according to your routing setup
      } else {
        // If the server returns a non-200 status code, consider it a failure
        // Optionally, parse response to display a more specific error message
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
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
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
