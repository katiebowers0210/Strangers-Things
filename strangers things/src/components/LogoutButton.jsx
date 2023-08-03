import React from 'react';
import { logOut } from './AuthHelpers'; // Import the logOut function

const LogoutButton = () => {
  const handleLogout = () => {
    logOut(); // Call the logOut function to clear the token from state (and optionally from sessionStorage)
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
