import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useState } from "react";

interface Probs {
  isLocationSharingEnabled: boolean;
  setIsLocationSharingEnabled: (isLocationSharingEnabled: boolean) => void;
}

const LocationSharingToggle = ({
  isLocationSharingEnabled,
  setIsLocationSharingEnabled,
}: Probs) => {
  // State to keep track of location sharing

  // Handler to toggle location sharing
  const handleToggle = () => {
    setIsLocationSharingEnabled(!isLocationSharingEnabled);
  };

  return (
    <FormControl display="flex" alignItems="center" alignSelf="center">
      <FormLabel htmlFor="location-sharing-toggle" mb="0">
        Allow Location Sharing?
      </FormLabel>
      <Switch
        id="location-sharing-toggle"
        colorScheme="teal"
        isChecked={isLocationSharingEnabled}
        onChange={handleToggle}
      />
    </FormControl>
  );
};

export default LocationSharingToggle;
