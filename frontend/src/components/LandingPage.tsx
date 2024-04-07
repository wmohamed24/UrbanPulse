import { Box, Button, Text, VStack, Heading } from "@chakra-ui/react";
import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }
  return (
    <Box textAlign="center" mt="100px">
      <VStack spacing={4}>
        <Heading>Welcome to Urban Pulse: where your voice matters</Heading>
        <Text>Make urban living accessible for everyone.</Text>
        <Box>
          <Button
            colorScheme="teal"
            mr="4"
            onClick={() => (window.location.href = "/signup")}
          >
            Sign Up
          </Button>
          <Button
            colorScheme="teal"
            onClick={() => (window.location.href = "/login")}
          >
            Log In
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default LandingPage;
