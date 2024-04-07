import React, { useState } from "react";
import {
  Box,
  Textarea,
  Button,
  useColorModeValue,
  VStack,
  Text,
  Alert,
  AlertIcon,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const FeedbackForm: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // State to manage the error message
  const navigate = useNavigate();
  const { onTrip } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if the comment is empty
    if (comment.trim() === "") {
      setError("Feedback comment is required."); // Set error if comment is empty
      return; // Prevent the form from being submitted
    }
    // No error, proceed with form submission logic
    setError(null); // Clear any existing error
    // Here, you would handle the submission of the comment.
    console.log(comment);
    setComment(""); // Reset comment field after submission
    navigate("/profile"); // Navigate to the profile page or a confirmation page
  };

  // Use Chakra UI's useColorModeValue to support light/dark mode if needed
  const buttonBg = useColorModeValue("teal.400", "teal.200");
  const buttonColor = useColorModeValue("white", "gray.800");

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!onTrip){
    return <Navigate to="/profile" replace />;
  }

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} marginTop={10} marginX={10}>
      <VStack spacing={4}>
        <Text fontSize="lg" mb={4}>
          Below you can provide feedback on the accessibility of the route you
          have taken. Comments can be things like "an elevator is needed here".
          We will store the location of the recorded comment and use it in our
          data analysis.
        </Text>
        {/* Display error message if feedback is required and not provided */}
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Textarea
          placeholder="Your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          size="md"
          isRequired // Make the textarea required for form submission
        />
        <HStack>
          <Button
            bg={buttonBg}
            color={buttonColor}
            _hover={{ bg: "teal.500" }}
            isDisabled={!comment.trim()} // Disable the button if the comment is empty
            type="submit"
          >
            Submit
          </Button>
          <Button
            bg={"teal"}
            color={buttonColor}
            _hover={{ bg: "teal.500" }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            Go Back
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FeedbackForm;
