import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Place from "./Place";

const Recommended = ({ onClick }) => {
  const [recommendedData, setRecommendedData] = useState([]);

  const fetchRecommendedData = async () => {
    try {
      const recommendCollectionRef = collection(db, "recommend");
      const recommendSnapshot = await getDocs(recommendCollectionRef);
      const recommendData = [];
      recommendSnapshot.forEach((doc) => {
        recommendData.push(doc.data());
      });
      setRecommendedData(recommendData);
    } catch (error) {
      console.error("Error fetching recommended data:", error);
    }
  };

  useEffect(() => {
    fetchRecommendedData();
  }, []);

  return (
    <div className="mr-4 p-10">
      <div className="mb-4">
        <strong className="text-lg">Recommended</strong>
      </div>
      <div style={{ display: 'flex' }}>
        {recommendedData.map((item, index) => (
          <div key={index} style={{ marginRight: '20px' }}>
            <Place data={item} onClick={onClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
