import React, { useState } from 'react';
import axios from 'axios';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        user: {
          username,
          password,
        },
      });
      const token = response.data.data.token;
      logIn(token); // Call the logIn function to set the token in state and sessionStorage
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
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
