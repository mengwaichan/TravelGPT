import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Itinerary from "../components/Itinerary";
import axios from 'axios';

const Travel = () => {
  
  const location = useLocation();
  const itineraryData = location.state && location.state.selectedData;
  const [geocodingData, setGeocodingData] = useState({});
  
  useEffect(() => {
    const fetchGeocodingData = async () => {
      try {
        const cityName = itineraryData.city;
        const response = await axios.post(
          "${import.meta.env.VITE_APP_CLOUD_API_URL}/geocoding/",
          { name: cityName },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setGeocodingData(response.data);
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }
    };

    if (itineraryData) {
      fetchGeocodingData();
    }
  }, [itineraryData]);

  return (
    <div>
      <Itinerary itineraryData={itineraryData} geocodingData = {geocodingData} />
    </div>
  );
};

export default Travel;
