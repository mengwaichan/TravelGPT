import React, { useState } from 'react';
import { useUserAuth } from "./UserAuth";
import axios from 'axios';
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
        setOpenDays(prevOpenDays => {
            const isOpen = prevOpenDays.includes(index);
            return isOpen
                ? prevOpenDays.filter(dayIndex => dayIndex !== index)
                : [...prevOpenDays, index];
        });
    };


    const handleMarkersClick = async (location) => {
        const marker = await getGeocode(location.name)

        setMarkerLocation(marker || {})
    }

    const handleDirectionsClick = async(location, prevLocation) => {
        try {
            const currentLocationGeocode = await getGeocode(location.name);
            const prevLocationGeocode = prevLocation ? await getGeocode(prevLocation.name) : null;
    
            setCurrLocation(currentLocationGeocode || {});
            setPrevLocation(prevLocationGeocode || {});
            setMarkerLocation(currentLocationGeocode);

            if (currentLocationGeocode && prevLocationGeocode) {
                const transportType = location.transport || 'walk';
    
                const routeData = await getRouteData(prevLocationGeocode, currentLocationGeocode, transportType);
    
                if (routeData) {
                    setDirection(routeData);
                }
            }
        } catch (error) {
            console.error('Error during click event:', error);
        }
    };

    const getGeocode = async (locationName) => {
        try {
            // Make a POST request to your geocoding API endpoint using Axios
            const response = await axios.post('http://127.0.0.1:5000/geocoding/', {
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
    
            const response = await axios.post('http://127.0.0.1:5000/route/', routeData);
    
            if (response.status === 200) {
                return response.data;
            } else {
                console.error('Route request failed');
                return null;
            }
        } catch (error) {
            console.error('Error during route request:', error);
            return null;
        }
    };
    
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            {/* Left Section - Itinerary */}
            <div style={{ flex: 1, paddingRight: '20px', overflowY: 'auto', maxHeight: '100%' }}>
                <h2>Itinerary</h2>
                <p><strong>{itineraryData.city}</strong></p>
                {itineraryData.days.map((day, index) => (
                    <div key={index}>
                        <h3>
                            <button
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                onClick={() => handleToggleDay(index)}
                            >
                                {openDays.includes(index) ? '▼' : '►'} Day {day.day}
                            </button>
                        </h3>
                        {openDays.includes(index) && (
                            <ul>
                                {day.locations.map((location, locationIndex) => (
                                    <div key={locationIndex} className="location-container">
                                        <li>
                                            <button
                                                style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}
                                                onClick={() => handleMarkersClick(location)}
                                            >
                                                <img src={markerIcon} alt="Marker" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                                <strong>{location.name}</strong>
                                            </button>
                                            <p>Description: {location.activity}</p>
                                            <p>
                                                Transportation: {location.transport}
                                                <button onClick={() => handleDirectionsClick(location, day.locations[locationIndex - 1])}>
                                                    <img src={directionsButton} alt="Directions" style={{ width: '20px', height: '20px' }} />
                                                </button>
                                            </p>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Right Section - Map */}
            <div style={{ flex: 2, height: '100%' }}>
                <Map geocodingData={geocodingData} markerLocation={markerLocation} directionData={direction} />
            </div>
        </div>
    );


};

export default Itinerary;
