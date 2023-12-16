import React, { useState } from 'react';
import { useUserAuth } from './UserAuth';
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';

const CreateProfile = () => {
  const { uid, email } = useUserAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!firstName || !lastName || !dob) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Make an API call to create user profile
      const response = await axios.post(
        'http://127.0.0.1:5000/profile/create_profile',
        {
          email : email,
          first_name : firstName,
          last_name : lastName,
          dob : dob,
        },
        {
          headers: {
            Authorization: `${uid}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Profile created:', response.data);
      // You can handle success or navigate the user to another page here

      navigate('/home');
    } catch (error) {
      setError('Error creating profile. Please try again.');
      console.error(error);
    }
  };

  return (
    <div class="flex justify-center items-center py-10 px-4">
      <div >
      <h1 class="text-center font-bold">Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>First Name:</strong>
          <input
            class="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded mt-4 ml-4"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          <strong>Last Name:</strong>
          <input
            class="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded mt-4 ml-4"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          <strong>Date of Birth:</strong>
          <input
            class="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded mt-4 ml-4"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <br />

        <div class="flex justify-center items-center">
        <button type="submit"
        class="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider text-center"
        >Submit</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default CreateProfile;

