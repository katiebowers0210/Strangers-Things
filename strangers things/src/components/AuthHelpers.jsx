export const logIn = (token) => {
    // Set the token in state and optionally in sessionStorage
  };
  
  export const logOut = () => {
    // Clear the token from state and sessionStorage
  };
  
  export const isLoggedIn = () => {
    // Check if the token is present in state (and optionally in sessionStorage)
    return false; // Return true if logged in, false if not
  };
  
  export const makeHeaders = () => {
    // Create a headers object with or without the bearer token depending on whether the user is logged in
    return {};
  };