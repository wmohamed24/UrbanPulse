import React, { useState, useEffect } from "react";

interface Position {
  lat: number;
  lon: number;
}

interface TripData {
  trip: Position[];
}

const LocationTracker: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [trip, setTrip] = useState<Position[]>([]);
  const [isTripStarted, setIsTripStarted] = useState<boolean>(false);
  const [lastPosition, setLastPosition] = useState<Position | null>(null);
  const [stopTimer, setStopTimer] = useState<number | null>(null);

  const calculateDistance = (
    position1: Position,
    position2: Position
  ): number => {
    // Haversine formula implementation
    const toRadian = (angle: number): number => (Math.PI / 180) * angle;
    const distance = (a: number, b: number): number =>
      (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const dLat = distance(position2.lat, position1.lat);
    const dLon = distance(position2.lon, position1.lon);

    const lat1 = toRadian(position1.lat);
    const lat2 = toRadian(position2.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIUS_OF_EARTH_IN_KM * c * 1000; // Convert to meters
  };

  const handlePosition = (position: GeolocationPosition) => {
    const newPos: Position = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    if (!lastPosition) {
      setLastPosition(newPos);
      return;
    }

    const distance = calculateDistance(newPos, lastPosition);

    if (!isTripStarted && distance > 10) {
      setIsTripStarted(true);
      setTrip([newPos]);
    } else if (isTripStarted) {
      if (distance > 10) {
        setTrip([...trip, newPos]);
        setLastPosition(newPos);
        if (stopTimer) {
          clearTimeout(stopTimer);
          setStopTimer(null);
        }
      } else {
        if (!stopTimer) {
          const timer = window.setTimeout(() => {
            setIsTripStarted(false);
            sendTripData({ trip });
            setTrip([]);
            setLastPosition(newPos);
          }, 600000); // 10 minutes in milliseconds
          setStopTimer(timer);
        }
      }
    }

    setCurrentPosition(newPos);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handlePosition, console.error, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });
    }
  }, [isTripStarted, trip, lastPosition, stopTimer]);

  const sendTripData = async (tripData: TripData) => {
    const response = await fetch("http://localhost:8080/add_trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (response.ok) {
      console.log("Trip data sent successfully.");
    } else {
      console.error("Failed to send trip data.");
    }
  };

  return (
    <div>
      Current Position:{" "}
      {currentPosition && `${currentPosition.lat}, ${currentPosition.lon}`}
      {/* Render other UI components here */}
    </div>
  );
};

export default LocationTracker;
