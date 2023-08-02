import React, { useState } from 'react';
import axios from 'axios';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!username || !password || password !== confirmPassword) {
      setErrorMessage('Please fill out all fields correctly.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        user: {
          username,
          password,
        },
      });
      const token = response.data.data.token;
      // Save the token in state and sessionStorage (optional)
    } catch (error) {
      setErrorMessage('Error creating user. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default RegistrationForm;