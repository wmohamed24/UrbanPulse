import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  Divider,
  Icon,
  Flex,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, InfoIcon } from "@chakra-ui/icons";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    occupation: "Graphic Designer",
    phoneNumber: "555-1234",
    disabilityType: "Visual Impairment",
    email: "john.doe@example.com",
    address: "123 Elm Street",
  });

  const bgColor = useColorModeValue("teal.50", "teal.900"); // Light mode, Dark mode

  useEffect(() => {
    // Fetch or retrieve the user profile data here
  }, []);

  return (
    <Center h="100vh" w="100vw" bg={useColorModeValue("gray.100", "gray.800")}>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        bg={bgColor}
        color={useColorModeValue("gray.600", "gray.200")}
        w={["95%", "85%", "75%", "65%", "55%"]} // Responsive width
        maxW="800px" // Maximum width
      >
        <VStack spacing={4} align="stretch">
          <Image
            borderRadius="full"
            boxSize="150px"
            src="../../public/profile.jpg"
            alt="Profile image"
            alignSelf="center"
          />
          <Text fontSize="2xl" fontWeight="bold" alignSelf="center">
            {userProfile.firstName} {userProfile.lastName}
          </Text>
          <Text fontSize="xl" color="teal.600" alignSelf="center">
            {userProfile.occupation}
          </Text>
          <Divider borderColor="teal.300" />
          <Text fontSize="md">
            <EmailIcon mr={10} color="teal.500" />
            {userProfile.email}
          </Text>
          <Text fontSize="md">
            <PhoneIcon mr={10} color="teal.500" />
            {userProfile.phoneNumber}
          </Text>
          <Text fontSize="md">
            <InfoIcon mr={10} color="teal.500" />
            {userProfile.disabilityType}
          </Text>
          <Text fontSize="md">
            <InfoIcon mr={10} color="teal.500" />
            {userProfile.address}
          </Text>
          <Divider borderColor="teal.300" />
          <Flex justify="center" mt={3}>
            <Icon as={FaFacebook} color="teal.600" boxSize={6} mx={2} />
            <Icon as={FaTwitter} color="teal.600" boxSize={6} mx={2} />
            <Icon as={FaInstagram} color="teal.600" boxSize={6} mx={2} />
          </Flex>
        </VStack>
      </Box>
    </Center>
  );
};

export default Profile;
