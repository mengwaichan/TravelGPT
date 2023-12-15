import React from 'react';
import { useUserAuth } from "./UserAuth";
import directionsButton from "../assets/direction.png"; 

const Itinerary = ({ itineraryData }) => {
    const { user } = useUserAuth();
    console.log("data", itineraryData);

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
                                <strong>{location.name}</strong>
                                <button>
                                    <img src={directionsButton} alt="Directions" style={{ width: '20px', height: '20px' }} />
                                </button>
                                <p>Description: {location.activity}</p>
                                <p>Transportation: {location.transport}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Itinerary;
