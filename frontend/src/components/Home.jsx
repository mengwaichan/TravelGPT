import React, { useState } from 'react';
import { useUserAuth } from "./UserAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {
  const { uid } = useUserAuth();
  const navigate = useNavigate();

  // State variables for form inputs
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState('');
  
  console.log(uid)
  // Function to handle changes in the city input
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Function to handle changes in the duration input
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
        console.log('Submitting form with data:', { city, duration });

      // Make a POST request to your API
      const response = await axios.post(
        'http://127.0.0.1:5000/itinerary',
        {
          city: city,
          duration: parseInt(duration), // Assuming duration should be a number
        },
        {
          headers: {
            Authorization: `${uid}`,
            'Content-Type': 'application/json'
          },
        }
      );

      // Handle the response as needed
      console.log('API response:', response);

      // You can also navigate to another page or perform other actions after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div>Recently Viewed</div>

      <div>
        <div>Travel</div>
        {/* Form for city and duration inputs */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <input type="text" placeholder="City" value={city} onChange={handleCityChange} />
          <input type="number" placeholder="Duration" value={duration} onChange={handleDurationChange} />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>Recommended</div>
    </div>
  );
};

export default Home;
