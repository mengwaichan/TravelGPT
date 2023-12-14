import React, { useState, useEffect } from 'react';
import { useUserAuth } from "./UserAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const { uid } = useUserAuth();
  const navigate = useNavigate();

  // State variables for form inputs
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState('');
  const [recentlyViewedData, setRecentlyViewedData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const fetchRecentlyViewedData = async () => {
    // Assuming the itineraries are stored under /users/UID/itineraries
    const itinerariesCollectionRef = collection(db, `users/${uid}/itineraries`);
    const itinerariesSnapshot = await getDocs(itinerariesCollectionRef);
    const recentlyViewedData = [];
    itinerariesSnapshot.forEach((doc) => {
      recentlyViewedData.push(doc.data());
    });
    setRecentlyViewedData(recentlyViewedData);
    console.log(recentlyViewedData)
  };

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
      
      setSelectedData(reponse.data)

      navigate('/itinerary')
      // You can also navigate to another page or perform other actions after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  // Function to fetch data from the /recommand collection
  const fetchRecommendedData = async () => {
    const recommandCollectionRef = collection(db, 'recommend');
    const recommandSnapshot = await getDocs(recommandCollectionRef);
    const recommandData = [];
    recommandSnapshot.forEach((doc) => {
      recommandData.push(doc.data());
    });
    setRecommendedData(recommandData);
    console.log(recommandData)
  };

  // Use useEffect to fetch recommended data when the component mounts
  useEffect(() => {
    fetchRecommendedData();
    fetchRecentlyViewedData();
  }, [uid]); 

  
  return (
    <div>
      <div>
        <div>Recently Viewed</div>
        {/* Render recently viewed data here */}
        {recentlyViewedData.map((item, index) => (
          <div key={index}>
            <button onClick={() => {
              setSelectedData(item)
              navigate('/itinerary')}}>
                {item.city}
                </button>
          <p>{`${item.days.length} Days`}</p>
          </div>
        ))}
      </div>


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
      {/* Render recommended data here */}
      {recommendedData.map((item, index) => (
        <div key={index}>
          <button onClick={() => {
            setSelectedData(item)
            navigate('/itinerary')}}>
            {item.city}
          </button>
          <p>{`${item.days.length} Days`}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
