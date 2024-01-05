import React, { useState } from "react";
import axios from "axios";

const TravelForm = ({ uid, onSubmit }) => {
  const [city, setCity] = useState("");
  const [duration, setDuration] = useState("");
  const [errorDuration, setErrorDuration] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDurationChange = (e) => {
    const inputValue = e.target.value;

    if (!isNaN(inputValue)) {
      const intValue = parseInt(inputValue, 10);

      if (intValue >= 1 && intValue <= 7) {
        setDuration(intValue);
        setErrorDuration(false);
      } else {
        setErrorDuration(true);
      }
    } else {
      setErrorDuration(true);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL}/itinerary/`,
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

      onSubmit(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default TravelForm;
