const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const makeHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getToken = () => {
  return sessionStorage.getItem('token') || '';
};

export const logIn = (token) => {
  sessionStorage.setItem('token', token);
};

export const logOut = () => {
  sessionStorage.removeItem('token');
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};

export const onLogin = async (username, password) => {
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
      logIn(token); // Call the logIn function to store the token
      console.log('Login successful:', data.data.message);
    } else {
      console.error('Login error:', data.error.message);
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
