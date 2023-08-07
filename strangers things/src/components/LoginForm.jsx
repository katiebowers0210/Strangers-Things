import React, { useState } from 'react';
import { onLogin } from './AuthHelpers'; 
import { useNavigate } from 'react-router-dom';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const LoginForm = () => {
  const navigate = useNavigate(); 
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
      await onLogin(username, password); 
      navigate('/dashboard'); 
    } catch(error) {
      console.log(`And then there was trouble: ${error.message}`);
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
        <button className='all-buttons'type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
