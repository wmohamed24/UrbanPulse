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
import { useAuth } from "../AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call your backend
    try {
      const response = await fetch("http://localhost:8080/authenticate_login", {
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
        // Handle login success
        login();

        toast({
          title: "Login successful.",
          description: "You're now logged into your account.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // Redirect here, e.g., to the dashboard or homepage
        // window.location.href = '/dashboard'; // Adjust according to your routing setup
      } else {
        // Handle server errors or unsuccessful login attempts
        throw new Error("Unsuccessful login");
      }
    } catch (error) {
      // Handle fetch errors or custom errors thrown for unsuccessful logins
      toast({
        title: "An error occurred.",
        description: "Email or password are incorrect.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <Heading mb={6}>Log In</Heading>
      <form onSubmit={handleLogin}>
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
            Log In
          </Button>
          <Text>
            Don't have an account?{" "}
            <Link href="/signup" color="teal" textDecoration="underline">
              Sign Up
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
