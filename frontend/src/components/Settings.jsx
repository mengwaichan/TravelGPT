import React, { useState, useEffect } from "react";
import { useUserAuth } from "./UserAuth";
import axios from "axios";
import logo from "../assets/travel.png";

const Settings = () => {
  const { uid } = useUserAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Make a GET request to your Flask API using Axios
        const response = await axios.get("http://127.0.0.1:5000/profile/get_profile", {
          headers: {
            'Authorization': uid, // Assuming uid is the user ID
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          const userData = response.data;
          setFirstName(userData.first_name || "");
          setLastName(userData.last_name || "");
          setDob(userData.dob);
          setEmail(userData.email);
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
          // Handle error if needed
        }
      } catch (error) {
        console.error('Error during fetchUserProfile:', error.message);
        // Handle error if needed
      }
    };
  
    fetchUserProfile();
  }, [uid]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both fields are filled
    if (!firstName || !lastName) {
      setError("Please fill in both first name and last name.");
      return;
    }

    try {
      // Make an API call to update user profile
      await axios.post(
        "http://127.0.0.1:5000/profile/update_profile",
        {
          first_name: firstName,
          last_name: lastName,
        },
        {
          headers: {
            Authorization: `${uid}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile updated successfully");
      // You can handle success or navigate the user to another page here
    } catch (error) {
      setError("Error updating profile. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto bg-emerald-100 rounded-lg p-5">
        <div className="mb-8">
          <img
            src={logo}
            alt="Travel GPT Logo"
            className="mx-auto h-20 sm:h-32 md:h-40"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Email:{" "}
              </label>
            </div>
            <div className="md:w-2/3">
              <div class="relative">
                <input
                  type="text"
                  id="disabled_filled"
                  class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-neutral-200 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-neutral-200 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  disabled
                />
                <label
                  for="disabled_filled"
                  class="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  {email}
                </label>
              </div>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Date of Birth:{" "}
              </label>
            </div>
            <div className="md:w-2/3">
              <div class="relative">
                <input
                  type="text"
                  id="disabled_filled"
                  class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-neutral-200 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-neutral-200 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  disabled
                />
                <label
                  for="disabled_filled"
                  class="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  {dob}
                </label>
              </div>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                First Name:{" "}
              </label>
            </div>
            <div className="md:w-2/3">
              <div class="relative">
                <input
                  type="text"
                  id="floating_filled"
                  class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-neutral-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label
                  for="floating_filled"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  First Name
                </label>
              </div>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Last Name:{" "}
              </label>
            </div>
            <div className="md:w-2/3">
              <div class="relative">
                <input
                  type="text"
                  id="floating_filled"
                  class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-neutral-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label
                  for="floating_filled"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Last Name
                </label>
              </div>
            </div>
          </div>
          <div class="md:flex md:items-center">
            <div class="md:w-1/2"></div>
            <div class="md:w-1/2">
              <button
                class="shadow bg-emerald-700 hover:bg-cyan-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Settings;