import React, { useEffect, useState } from "react";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Place from "./Place";

const RecentlyViewed = ({ uid, onClick }) => {
  const [recentlyViewedData, setRecentlyViewedData] = useState([]);

  useEffect(() => {
    const fetchRecentlyViewedData = async () => {
      const itinerariesCollectionRef = collection(db, `users/${uid}/itineraries`);
      const q1 = query(
        itinerariesCollectionRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );

      const itinerariesSnapshot = await getDocs(q1);
      const recentlyViewedData = [];
      itinerariesSnapshot.forEach((doc) => {
        recentlyViewedData.push(doc.data());
      });
      setRecentlyViewedData(recentlyViewedData);
    };

    fetchRecentlyViewedData();
  }, [uid]);

  return (
    <div className="mr-4 p-10">
      <div className="mb-4">
        <strong className="text-lg">Recently Viewed</strong>
      </div>
      <div style={{ display: 'flex' }}>
        {recentlyViewedData.map((item, index) => (
          <div key={index} style={{ marginRight: '20px' }}>
            <Place data={item} onClick={onClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
