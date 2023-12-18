import React, {useEffect, useState} from "react";
import axios from "axios";
import defaultImage from '../assets/travel.png'

const Place = ({ data, onClick }) => {

    const [placeImage, setPlaceImage] = useState(defaultImage)

    useEffect(() => {
        const fetchPlaceImages = async () => {
          try {
            const url = `https://api.teleport.org/api/urban_areas/slug:${data.city.toLowerCase().replace(/\s+/g, '-')}/images/`
            const response = await axios.get(
              url,
              {
                headers: {
                  Accept: "application/vnd.teleport.v1+json",
                },
              }
            );
              
            const image = response.data.photos[0]?.image.mobile;
    
            if (image) {
              setPlaceImage(image);
            }
          } catch (error) {
            console.error("Error fetching place images:", error);
          }
        };
    
        fetchPlaceImages();
      }, [data.city]);

  return (
    <div className="w-60 mb-4 p-4 border rounded-lg hover:shadow-lg transition duration-300">
      <img
    src={placeImage}
    alt="Place"
    className="w-full h-48 object-cover rounded-t-lg"
    style={{ maxHeight: '150px' }}
  />
      <button
        className="text-blue-500 hover:underline focus:outline-none"
        onClick={() => onClick(data)}
      >
        {data.city}
      </button>
      <p className="text-gray-500">{`${data.days.length} Day(s)`}</p>
    </div>

  );
};

export default Place;
