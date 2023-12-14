import React, { useState, useEffect } from 'react';
import { useUserAuth } from "./UserAuth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { db } from '../firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

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
    const itinerariesCollectionRef = collection(db, `users/${uid}/itineraries`);
    const q1 = query(itinerariesCollectionRef, limit(3));

    const itinerariesSnapshot = await getDocs(q1);
    const recentlyViewedData = [];
    itinerariesSnapshot.forEach((doc) => {
      recentlyViewedData.push(doc.data());
    });
    setRecentlyViewedData(recentlyViewedData);
    console.log(recentlyViewedData);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting form with data:', { city, duration });

      const response = await axios.post(
        'http://127.0.0.1:5000/itinerary/',
        {
          city: city,
          duration: parseInt(duration),
        },
        {
          headers: {
            Authorization: `${uid}`,
            'Content-Type': 'application/json'
          },
        },
      );

      console.log('API response:', response);

      setSelectedData(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchRecommendedData = async () => {
    const recommendCollectionRef = collection(db, 'recommend');
    const recommendSnapshot = await getDocs(recommendCollectionRef);
    const recommendData = [];
    recommendSnapshot.forEach((doc) => {
      recommendData.push(doc.data());
    });
    setRecommendedData(recommendData);
    console.log(recommendData);
  };

  useEffect(() => {
    fetchRecommendedData();
    fetchRecentlyViewedData();
  }, [uid]);

  useEffect(() => {
    if (selectedData) {
      navigate('/travel', { state: { selectedData } });
    }
  }, [selectedData]);

  return (
    <div>
      <div>
        <div>Recently Viewed</div>
        {recentlyViewedData.map((item, index) => (
          <div key={index}>
            <button onClick={() => {
              setSelectedData(item);
            }}>
              {item.city}
            </button>
            <p>{`${item.days.length} Days`}</p>
          </div>
        ))}
      </div>

      <div>
        <div>Travel</div>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <input type="text" placeholder="City" value={city} onChange={handleCityChange} />
          <input type="number" placeholder="Duration" value={duration} onChange={handleDurationChange} />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>Recommended</div>
      {recommendedData.map((item, index) => (
        <div key={index}>
          <button onClick={() => {
            setSelectedData(item);
          }}>
            {item.city}
          </button>
          <p>{`${item.days.length} Days`}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
