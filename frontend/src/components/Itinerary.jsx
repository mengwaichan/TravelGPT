import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import axios from "axios";
import Map from "./Map";
import directionsButton from "../assets/direction.png";
import markerIcon from "../assets/marker.png";

const Itinerary = ({ itineraryData, geocodingData }) => {
  const { user } = useUserAuth();

  const [prevLocation, setPrevLocation] = useState({});
  const [currLocation, setCurrLocation] = useState({});
  const [markerLocation, setMarkerLocation] = useState({});
  const [direction, setDirection] = useState({});

  const [openDays, setOpenDays] = useState([]);

  const handleToggleDay = (index) => {
    setOpenDays((prevOpenDays) => {
      const isOpen = prevOpenDays.includes(index);
      return isOpen
        ? prevOpenDays.filter((dayIndex) => dayIndex !== index)
        : [...prevOpenDays, index];
    });
  };

  const handleMarkersClick = async (location) => {
    const marker = await getGeocode(location.name);

    setMarkerLocation(marker || {});
  };

  const handleDirectionsClick = async (location, prevLocation) => {
    try {
      const currentLocationGeocode = await getGeocode(location.name);
      const prevLocationGeocode = prevLocation
        ? await getGeocode(prevLocation.name)
        : null;

      setCurrLocation(currentLocationGeocode || {});
      setPrevLocation(prevLocationGeocode || {});
      setMarkerLocation(currentLocationGeocode);

      if (currentLocationGeocode && prevLocationGeocode) {
        const transportType = location.transport || "walk";

        const routeData = await getRouteData(
          prevLocationGeocode,
          currentLocationGeocode,
          transportType
        );

        if (routeData) {
          setDirection(routeData);
        }
      }
    } catch (error) {
      console.error("Error during click event:", error);
    }
  };

  const getGeocode = async (locationName) => {
    try {
      // Make a POST request to your geocoding API endpoint using Axios
      const response = await axios.post("http://127.0.0.1:5000/geocoding/", {
        name: locationName,
      });

      if (response.status === 200) {
        const { lat, lng } = response.data;
        return { lat, lng };
      } else {
        console.error("Geocoding request failed");
        return null;
      }
    } catch (error) {
      console.error("Error during geocoding request:", error);
      return null;
    }
  };

  const getRouteData = async (origin, destination, transport) => {
    try {
      const routeData = {
        origin_latitude: origin.lat,
        origin_longitude: origin.lng,
        destination_latitude: destination.lat,
        destination_longitude: destination.lng,
        transport,
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/route/",
        routeData
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Route request failed");
        return null;
      }
    } catch (error) {
      console.error("Error during route request:", error);
      return null;
    }
  };

  return (
    // <div style={{ display: "flex", height: "100%" }}>
    <div className="flex h-screen overflow-hidden">
      {/* Left Section - Itinerary */}
      <div className="w-1/3 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Trip to {itineraryData.city}</h2>
        {itineraryData.days.map((day, index) => (
          <div key={index} className="mb-6">
            <h3 className="mb-2 cursor-pointer"
                onClick={() => handleToggleDay(index)}>
                {openDays.includes(index) ? "▼" : "►"} Day {day.day}
            </h3>
            {openDays.includes(index) && (
              <ul>
                {day.locations.map((location, locationIndex) => (
                  <li key={locationIndex} className="mb-4">
                  <div className="location-container p-1 border rounded bg-emerald-50">
                    <button
                      className="flex items-center border-none bg-none cursor-pointer text-blue-500"
                      onClick={() => handleMarkersClick(location)}
                    >
                      <img src={markerIcon} alt="Marker" className="w-5 h-5 mr-2" />
                      <strong>{location.name}</strong>
                    </button>
                    <p className="text-gray-600">Description: {location.activity}</p>
                    <p className="text-gray-600">
                      Direction
                      <button
                        className="ml-0"
                        onClick={() =>
                          handleDirectionsClick(location, day.locations[locationIndex - 1])
                        }
                      >
                        <img src={directionsButton} alt="Directions" className="w-5 h-5" />
                      </button>
                    </p>
                  </div>
                </li>
                ))}
              </ul>
            )}
            {/* Add bottom padding to the last item in the list */}
            {index === itineraryData.days.length - 1 && (
              <div style={{ paddingBottom: "1rem" }} />
            )}
          </div>
        ))}
      </div>

      {/* Right Section - Map */}
      <div className="w-4/5 h-full map-container">
          <Map
            geocodingData={geocodingData}
            markerLocation={markerLocation}
            directionData={direction}
          />
      </div>
    </div>
  );
};

export default Itinerary;
