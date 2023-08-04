import React, { useState } from 'react';
import { onLogin } from './AuthHelpers'; // Import the logIn function

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
  

    if (!username || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
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
      if (response.ok) {
        const token = data.data.token;
        onLogin(token);
        onLogin();
        console.log('Login successful:', data.data.message);
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
        console.error('Login error:', data.error.message);
      }
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;