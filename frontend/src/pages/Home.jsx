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

  const handleTravelFormSubmit = (data) => {
    setSelectedData(data);
  };

  useEffect(() => {
    if (selectedData) {
      navigate("/travel", { state: { selectedData } });
    }
  }, [navigate, selectedData]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-cream-400 to-stone-900 justify-between bg-gray-100">
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
