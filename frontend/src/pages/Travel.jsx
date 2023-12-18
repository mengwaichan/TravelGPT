import React from 'react';
import { useLocation } from 'react-router-dom';
import Itinerary from "../components/Itinerary";

const Travel = () => {
  
  const location = useLocation();
  const itineraryData = location.state && location.state.selectedData;
  const geocodingData = location.state && location.state.geocodingData;
  
  return (
    <div>
      <Itinerary itineraryData={itineraryData} geocodingData = {geocodingData} />
    </div>
  );
};

export default Travel;
