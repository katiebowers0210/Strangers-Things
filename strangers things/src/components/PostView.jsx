import React, { useState, useEffect } from 'react';
import axios from 'axios';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const PostView = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the posts from the server
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts`);
        setPosts(response.data.data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostView;
