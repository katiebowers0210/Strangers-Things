import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    logOut(); // Call the logOut function to clear the token from state and sessionStorage
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;