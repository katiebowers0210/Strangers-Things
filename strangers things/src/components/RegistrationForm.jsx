import React, { useState } from 'react';
import { logIn } from './AuthHelpers';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); 

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!username || !password || password !== confirmPassword) {
      setErrorMessage('Please fill out all fields correctly.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      });

      const data = await response.json();
      console.log('Response:', response);
      console.log('Data:', data);

      if (response.ok) {
        const token = data.data.token;
        logIn(token);
        console.log('Registration successful:', data.data.message);
        setIsRegistered(true); 
      } else {
        setErrorMessage('Registration failed. Please try again.');
        console.error('Registration error:', data.error.message);
      }
    } catch (error) {
      setErrorMessage('Error creating user. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      {isRegistered && <p>Registration successful. You can now log in.</p>}
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
