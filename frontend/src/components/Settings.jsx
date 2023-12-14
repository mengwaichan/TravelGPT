import React, { useState, useEffect } from 'react';
import { useUserAuth } from './UserAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const Settings = () => {
  const { uid } = useUserAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async (e) => {
        
        try {
            
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)

            const userData = docSnap.data();
            setFirstName(userData.first_name || '');
            setLastName(userData.last_name || '');
            }
        catch (error) {
            setError('Error fetching user profile. Please try again.');
            console.error(error);
        } 
    }

    fetchUserProfile();
    }, [uid]);
     
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both fields are filled
    if (!firstName || !lastName) {
      setError('Please fill in both first name and last name.');
      return;
    }

    try {
      // Make an API call to update user profile
      await axios.post(
        'http://127.0.0.1:5000/profile/update_profile',
        {
          first_name: firstName,
          last_name: lastName,
        },
        {
          headers: {
            Authorization: `${uid}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Profile updated successfully');
      // You can handle success or navigate the user to another page here
    } catch (error) {
      setError('Error updating profile. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
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
        <button type="submit">Update</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Settings;
