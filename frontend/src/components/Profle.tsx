import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  Divider,
  Center,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import {
  EmailIcon,
  PhoneIcon,
  InfoIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import LocationSharingToggle from "./LocationSharingToggle";
import { useAuth } from "../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";

interface UserProfile {
  firstName: string;
  lastName: string;
  occupation: string;
  phoneNumber: string;
  disabilityType: string;
  email: string;
  address: string;
}

const Profile = () => {
  const { isLoggedIn, logout, userId, onTrip } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/get_kintone_record?id=${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const profileData: UserProfile = {
          firstName: data.record.first_name.value,
          lastName: data.record.last_name.value,
          occupation: data.record.occupation.value,
          phoneNumber: data.record.phone_number.value,
          disabilityType: data.record.disability_type.value,
          email: data.record.email.value,
          address: data.record.address.value,
        };
        setIsLocationSharingEnabled(data.record.location_service.value);

        setUserProfile(profileData);
      } catch (error) {
        console.error("Could not fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <Center h="100vh" w="100vw">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Center h="100vh" w="100vw">
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        w={["95%", "85%", "75%", "65%", "55%"]} // Responsive width
        maxW="800px" // Maximum width
        position="relative" // Make this a relative container for absolute positioning
      >
        {/* IconButton for settings or similar action */}
        {onTrip ? (
          <IconButton
            icon={<InfoOutlineIcon />}
            aria-label="on_move"
            position="absolute"
            top={4}
            right={4}
            colorScheme="teal"
            onClick={() => navigate("/feedbackform")}
          />
        ) : null}
        <VStack spacing={4} align="stretch">
          <Image
            borderRadius="full"
            boxSize="150px"
            src="../../public/profile.jpg"
            alt="Profile image"
            alignSelf="center"
          />
          <Text fontSize="2xl" fontWeight="bold" alignSelf="center">
            {userProfile?.firstName} {userProfile?.lastName}
          </Text>
          <Text fontSize="xl" color="teal.600" alignSelf="center">
            {userProfile?.occupation}
          </Text>
          <Divider borderColor="teal.300" />
          <Text fontSize="md">
            <EmailIcon mr={10} color="teal.500" />
            {userProfile?.email}
          </Text>
          <Text fontSize="md">
            <PhoneIcon mr={10} color="teal.500" />
            {userProfile?.phoneNumber}
          </Text>
          <Text fontSize="md">
            <InfoIcon mr={10} color="teal.500" />
            {userProfile?.disabilityType}
          </Text>
          <Text fontSize="md">
            <InfoIcon mr={10} color="teal.500" />
            {userProfile?.address}
          </Text>
          <Divider borderColor="teal.300" />
          <HStack>
            <LocationSharingToggle
              isLocationSharingEnabled={isLocationSharingEnabled}
              setIsLocationSharingEnabled={setIsLocationSharingEnabled}
            />
            <Button
              colorScheme="teal"
              mt={4}
              onClick={() => {
                logout();
              }}
            >
              Sign out
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Profile;
