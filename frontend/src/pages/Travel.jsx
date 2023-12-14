import Map from "../components/Map"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Itinerary from "../components/Itinerary";

const Travel = () => {
  const [geocodingData, setGeocodingData] = useState({});
  const location = useLocation();
  const itineraryData = location.state && location.state.selectedData;

  console.log(itineraryData);

  useEffect(() => {
    const fetchGeocodingData = async () => {
      try {
        const cityName = itineraryData.city;

        const response = await axios.post(
          'http://127.0.0.1:5000/geocoding/',
          { name: cityName },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setGeocodingData(response.data);

        console.log(geocodingData)
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
      }
    };

    fetchGeocodingData();
  }, []); 

  return (
    <div>
      <Itinerary itinerary={itineraryData} />
      <Map geocodingData={geocodingData}  />
    </div>
  );
};

export default Travel;
