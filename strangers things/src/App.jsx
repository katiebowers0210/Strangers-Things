import React, { useEffect, useState } from 'react';
import './App.css';
import PostView from './components/PostView';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { isLoggedIn } from './components/AuthHelpers';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function App() {
  const [posts, setPosts] = useState([]);

  const addNewPost = (newPost) => {
    console.log(`Adding new post: ${JSON.stringify(newPost)}`);
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <>
      <div className='container'>
        <div className='navbar'>
          <Link to='/'>Home</Link>
          <br />
          <Link to='/LoginForm'>Login</Link>
          <br />
          <Link to='/RegistrationForm'>Sign up</Link>
        </div>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/LoginForm' element={<LoginForm />} />
            <Route path='/RegistrationForm' element={<RegistrationForm />} />
            <Route path='/Dashboard' element={<ProtectedDashboard addNewPost={addNewPost} />} />
            {/* Add the updated PostView component here */}
            <Route path='/posts' element={<PostView />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

// Wrapper component for the Dashboard that checks for authentication
function ProtectedDashboard({ addNewPost }) {
  return isLoggedIn() ? <Dashboard addNewPost={addNewPost} /> : <Navigate to='/LoginForm' />;
}

export default App;
