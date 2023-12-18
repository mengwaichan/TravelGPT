import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../components/UserAuth";
import TravelForm from "../components/TravelForm";
import Recommended from "../components/Recommended";
import RecentlyViewed from "../components/RecentlyViewed";

const Home = () => {
  const { uid } = useUserAuth();
  const navigate = useNavigate();

  const [selectedData, setSelectedData] = useState(null);
  const [geocodingData, setGeocodingData] = useState({});

  const handleTravelFormSubmit = (data) => {
    setSelectedData(data);
  };

  useEffect(() => {
    if (selectedData && geocodingData) {
      navigate("/travel", { state: { selectedData, geocodingData } });
    }
  }, [geocodingData, navigate, selectedData]);

  useEffect(() => {
    const fetchGeocodingData = async () => {
      try {
        const cityName = selectedData.city;

        // Assuming you have the geocoding API endpoint available
        // Unchanged code for Axios request
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

    if (selectedData) {
      fetchGeocodingData();
    }
  }, [selectedData]);

  return (
    <div className="flex flex-col justify-between bg-gray-100">
      {/* Recently Viewed Section */}
      <RecentlyViewed uid={uid} onClick={setSelectedData} />

      {/* Travel Section */}
      <div className="mr-4 p-10">
        <div className="mb-4">
          <strong className="text-lg">Travel</strong>
        </div>
        <TravelForm uid={uid} onSubmit={handleTravelFormSubmit} />
      </div>

      {/* Recommended Section */}
      <Recommended onClick={setSelectedData} />
    </div>
  );
};

export default Home;
