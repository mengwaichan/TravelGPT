import React from 'react';
import { useUserAuth } from "./UserAuth";

const Itinerary = ({ itineraryData }) => {
    const { user } = useUserAuth();
    console.log("data", itineraryData);

    return (
        <div>
            <h2>Itinerary for {itineraryData.city}</h2>
            {itineraryData.days.map((day, index) => (
                <div key={index}>
                    <h3>Day {day.day}</h3>
                    <ul>
                        {day.locations.map((location, locationIndex) => (
                            <li key={locationIndex}>
                                <strong>{location.name}</strong>
                                <p>Activity: {location.activity}</p>
                                <p>Transport: {location.transport}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Itinerary;
