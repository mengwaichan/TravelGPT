import React, { useState } from "react";
import { useUserAuth } from "../components/UserAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CreateProfile = () => {
  const { uid, email } = useUserAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!firstName || !lastName || !dob) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Make an API call to create user profile
      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL}/profile/create_profile`,
        {
          email: email,
          first_name: firstName,
          last_name: lastName,
          dob: dob,
        },
        {
          headers: {
            Authorization: `${uid}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile created:", response.data);
      // You can handle success or navigate the user to another page here

      navigate("/");
    } catch (error) {
      setError("Error creating profile. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-400 to-green-900 justify-center items-center px-4 sm:px-6 lg:px-8 sm:mt-0">
    <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-[#e8e7d5] rounded-lg shadow-md p-6 sm:p-8 text-center">
      <div>
        <h1 className="text-center font-bold text-3xl">Create Profile</h1>
        <hr className="w-40 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
        <form className="flex-col justify-left" onSubmit={handleSubmit}>
          <label>
            <strong>First Name:</strong>
            <input
              className="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded mt-4 ml-4"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
          <label>
            <strong>Last Name:</strong>
            <input
              className="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded mt-4 ml-4"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br />
          <label>
            <strong>Date of Birth:</strong>
            <input
              className="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded mt-4 ml-4"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </label>
          <br />

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider text-center"
            >
              Submit
            </button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      </div>
    </div>
  );
};

export default CreateProfile;
