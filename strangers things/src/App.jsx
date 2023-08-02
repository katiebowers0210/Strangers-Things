import { useState } from 'react'
import './App.css'
import PostView from './components/PostView';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import { isLoggedIn } from './components/AuthHelpers';
// import PostForm from './components/PostForm';
import RegistrationForm from './components/RegistrationForm';


const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function App() {
  

  return (
    <>
      {isLoggedIn() ? (
          <LogoutButton /> // Show the LogoutButton if the user is logged in
        ) : (
          <>
            <RegistrationForm />
            <LoginForm />
            <PostView />
          </>
        )}
      </>
    );
  }

  

export default App
