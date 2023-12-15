import React, { useState } from 'react';
import { useUserAuth } from "./UserAuth";
import Map from "./Map";
import directionsButton from "../assets/direction.png"; 
import markerIcon from "../assets/marker.png"; 

const Itinerary = ({ itineraryData, geocodingData }) => {
    const { user } = useUserAuth();
    console.log("data", itineraryData);

    const [prevLocation, setPrevLocation] = useState({});
    const [currLocation, setCurrLocation] = useState({});
    const [markerLocation, setMarkerLocation] = useState({});
    const [direction, setDirection] = useState({});

    const handleMarkersClick = async (location) => {
        const marker = await getGeocode(location.name)

        setMarkerLocation(marker || {})
    }

    const handleDirectionsClick = (location, prevLocation) => {
        try {
            const currentLocationGeocode = getGeocode(location.name);
            const prevLocationGeocode = prevLocation ? getGeocode(prevLocation.name) : null;
    
            setCurrLocation(currentLocationGeocode || {});
            setPrevLocation(prevLocationGeocode || {});
    
            if (currentLocationGeocode && prevLocationGeocode) {
                const transportType = location.transport || 'walk';
    
                // Instead of fetching, directly create an object with the required data
                const routeData = {
                    prev: {
                        lat: prevLocationGeocode.lat,
                        lng: prevLocationGeocode.lng,
                    },
                    curr: {
                        lat: currentLocationGeocode.lat,
                        lng: currentLocationGeocode.lng,
                    },
                    transport: transportType,
                };
    
                // Add logic to use the route data, e.g., display it on the map
                if (routeData) {
                    // Handle the route data
                    // For example, update the state or call a function to display the route on the map
                    setDirection(routeData); // Assuming you have a state variable for directionData
                }
            }
        } catch (error) {
            console.error('Error during click event:', error);
        }
    };    

    const getGeocode = async (locationName) => {
        try {
            // Make a POST request to your geocoding API endpoint
            const response = await fetch('http://127.0.0.1:5000/geocoding/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: locationName }),
            });

            if (response.ok) {
                const data = await response.json();
                const { lat, lng } = data;

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

    return (
        <div>
            <h2>Itinerary</h2>
            <p><strong>{itineraryData.city}</strong></p>
            {itineraryData.days.map((day, index) => (
                <div key={index}>
                    <h3>Day {day.day}</h3>
                    <ul>
                        {day.locations.map((location, locationIndex) => (
                            <li key={locationIndex}>
                                <button
                                    style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}
                                    onClick={() => handleMarkersClick(location)}
                                >
                                    <img src={markerIcon} alt="Marker" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                    <strong>{location.name}</strong>
                                </button>
                                <p>Description: {location.activity}</p>
                                <p>Transportation: {location.transport}<button onClick={() => handleDirectionsClick(location, day.locations[locationIndex - 1])}>
                                    <img src={directionsButton} alt="Directions" style={{ width: '20px', height: '20px' }} />
                                </button></p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <Map geocodingData = {geocodingData} markerLocation={markerLocation} directionData = {direction} />
        </div>
    );
};

export default Itinerary;
