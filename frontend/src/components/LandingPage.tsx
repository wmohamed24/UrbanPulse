import { Box, Button, Text, VStack, Heading } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box textAlign="center" mt="100px">
      <VStack spacing={4}>
        <Heading>Welcome to Our Accessibility App</Heading>
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
