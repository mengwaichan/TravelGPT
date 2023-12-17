import React, { useState, useEffect } from "react";
import { useUserAuth } from "./UserAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../firebase";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import Place from "./Place"

const Home = () => {
  const { uid } = useUserAuth();
  const navigate = useNavigate();

  // State variables for form inputs
  const [city, setCity] = useState("");
  const [duration, setDuration] = useState("");
  const [errorDuration, setErrorDuration] = useState(false);
  const [recentlyViewedData, setRecentlyViewedData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [geocodingData, setGeocodingData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchRecentlyViewedData = async () => {
    const itinerariesCollectionRef = collection(db, `users/${uid}/itineraries`);
    const q1 = query(
      itinerariesCollectionRef,
      orderBy("timestamp", "desc"),
      limit(3)
    );

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

  const handleDurationChange = (e) => {
    // Get the input value
    const inputValue = e.target.value;

    // Validate if the input is a number
    if (!isNaN(inputValue)) {
      // Convert the input value to an integer
      const intValue = parseInt(inputValue, 10);

      // Check if the value is within the desired range (1 to 7)
      if (intValue >= 1 && intValue <= 7) {
        // Update the state if it's within the range
        setDuration(intValue);
        setErrorDuration(false);
      } else {
        // Handle out-of-range values
        setErrorDuration(true);
      }
    } else {
      // Handle non-numeric input
      setErrorDuration(true);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("Submitting form with data:", { city, duration });

      const response = await axios.post(
        "http://127.0.0.1:5000/itinerary/",
        {
          city: city,
          duration: parseInt(duration),
        },
        {
          headers: {
            Authorization: `${uid}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response);

      setSelectedData(response.data);
    } finally {
      setLoading(true); // Set loading to false when API response is received (success or error)
    }
  };

  const fetchRecommendedData = async () => {
    const recommendCollectionRef = collection(db, "recommend");
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
      navigate("/travel", { state: { selectedData, geocodingData } });
    }
  }, [geocodingData]);

  useEffect(() => {
    const fetchGeocodingData = async () => {
      try {
        const cityName = selectedData.city;

        const response = await axios.post(
          "http://127.0.0.1:5000/geocoding/",
          { name: cityName },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setGeocodingData(response.data);
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }
    };

    fetchGeocodingData();
  }, [selectedData]);

  return (
    <div className="flex flex-col justify-between bg-gray-100 h-screen">
      {/* Recently Viewed Section */}
      <div className="mr-4 p-10">
        <div className="mb-4">
          <strong className="text-lg">Recently Viewed</strong>
        </div>
        <div style={{ display: 'flex' }}>
          {recentlyViewedData.map((item, index) => (
            <div key={index} style={{ marginRight: '20px' }}>
              <Place data={item} onClick={setSelectedData} />
            </div>
          ))}
        </div>
      </div>

      {/* Travel Section */}
      <div className="mr-4 p-10">
        <div className="mb-4">
          <strong className="text-lg">Travel</strong>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="md:flex md:items-center mb-6">
            <div>
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="city"
              >
                City:
              </label>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="floating_filled"
                  value={city}
                  onChange={handleCityChange}
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-neutral-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="floating_filled"
                  className="absolute text-sm text-gray-900 dark:text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Where
                </label>
              </div>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div>
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="duration"
              >
                Days:
              </label>
            </div>
            <div>
              <div className="relative">
                <input
                  type="number"
                  id="floating_filled"
                  value={duration}
                  onChange={handleDurationChange}
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-neutral-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="floating_filled"
                  className="absolute text-sm text-gray-900 dark:text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Days
                </label>
              </div>
              <p
                id="helper-text-explanation"
                className={`mt-2 text-sm ${
                  errorDuration
                    ? "text-red-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Please select a number from 1 to 7 day(s).
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Recommended Section */}
      <div className="mr-4 p-10">
        <div className="mb-4">
          <strong className="text-lg">Recommended</strong>
        </div>
        <div style={{ display: 'flex' }}>
          {recommendedData.map((item, index) => (
            <div key={index} style={{ marginRight: '20px' }}>
              <Place data={item} onClick={setSelectedData} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
