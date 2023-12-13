import React, { useState } from 'react';
import { useUserAuth } from './UserAuth';
import axios from 'axios';

const CreateProfile = () => {
  const { uid } = useUserAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState(null);

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
          firstName,
          lastName,
          dob,
        },
        {
          headers: {
            Authorization: `${uid}`, // Include UID in the Authorization header
          },
        }
      );

      console.log('Profile created:', response.data);
      // You can handle success or navigate the user to another page here
    } catch (error) {
      setError('Error creating profile. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date" 
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateProfile;
