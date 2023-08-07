import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from './AuthHelpers'; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2306-FTB-ET-WEB-FT/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleViewPost = (postId) => {
    if (isLoggedIn()) {
      navigate(`/post/${postId}`);
    } else {
      alert('Please log in or sign up to view posts.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to Strangers Things!</h1>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className='postlist'>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
              <button onClick={() => handleViewPost(post._id)}>View Post</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
