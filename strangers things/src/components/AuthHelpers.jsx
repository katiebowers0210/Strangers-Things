// authHelpers.js
const TOKEN_KEY = 'myAppAuthToken';

export const logIn = (token) => {
  // Set the token in state and optionally in sessionStorage
  localStorage.setItem(TOKEN_KEY, token);
};

export const logOut = () => {
  // Clear the token from state and optionally from sessionStorage
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  // Check if the token is present in state (and optionally in sessionStorage)
  return !!localStorage.getItem(TOKEN_KEY);
};

export const makeHeaders = () => {
  // Create a headers object with or without the bearer token depending on whether the user is logged in
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
