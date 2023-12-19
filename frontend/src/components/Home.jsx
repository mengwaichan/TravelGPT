import React, { useState, useEffect } from 'react';
import { useUserAuth } from "./UserAuth";
import { createRoutesFromElements, useNavigate } from "react-router-dom";
import axios from 'axios';
import { db } from '../firebase';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';

const Home = () => {
  const { uid } = useUserAuth();
  const navigate = useNavigate();

  // State variables for form inputs
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState('');
  const [recentlyViewedData, setRecentlyViewedData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [geocodingData, setGeocodingData] = useState({});
  const [loading, setLoading] = useState(false);


  const fetchRecentlyViewedData = async () => {
    const itinerariesCollectionRef = collection(db, `users/${uid}/itineraries`);
    const q1 = query(itinerariesCollectionRef,orderBy("timestamp", "desc"), limit(3));

    const itinerariesSnapshot = await getDocs(q1);
    const recentlyViewedData = [];
    itinerariesSnapshot.forEach((doc) => {
      recentlyViewedData.push(doc.data());
    });
    setRecentlyViewedData(recentlyViewedData);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(true); // Set loading to false when API response is received (success or error)
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
  };

  useEffect(() => {
    fetchRecommendedData();
    fetchRecentlyViewedData();
  }, [uid]);

  useEffect(() => {
    if (selectedData && geocodingData) {
      navigate('/travel', { state: { selectedData, geocodingData } });
    }
  }, [geocodingData]);


  useEffect(() => {
    const fetchGeocodingData = async () => {
      try {
        const cityName = selectedData.city;

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

      } catch (error) {
        console.error('Error fetching geocoding data:', error);
      }
    };

    fetchGeocodingData();
  }, [selectedData]); 

  return (
    <div>
      <div>
        <div><strong>Recently Viewed</strong></div>
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
        <div><strong>Travel</strong></div>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <input type="text" placeholder="City" value={city} onChange={handleCityChange} />
          <input type="number" placeholder="Duration" value={duration} onChange={handleDurationChange} />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>

      <div><strong>Recommended</strong></div>
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
