import { useEffect, useState } from 'react'
import './App.css'
import PostView from './components/PostView';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import { isLoggedIn } from './components/AuthHelpers';
import AddPosts from './components/AddPosts';
// import PostForm from './components/PostForm';
import RegistrationForm from './components/RegistrationForm';


const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function App() {
  const [posts, setPosts]= useState([]);

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost])
  };


  return (
    <>
      {isLoggedIn() ? (
          <LogoutButton /> // Show the LogoutButton if the user is logged in
        ) : (
          <>
          <h1>Welcome to Strangers Things!</h1>
          <LoginForm />
           <PostView />
            <RegistrationForm />
            <AddPosts onPostCreated={{addNewPost}}/>
           
          </>
        )}
      </>
    );
  }

  

export default App
