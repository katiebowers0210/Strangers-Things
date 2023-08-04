import React, { useState, useEffect } from 'react';
import { isLoggedIn, getToken } from './AuthHelpers'; // Import the isLoggedIn and getToken functions

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function PostView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const userIsLoggedIn = isLoggedIn(); // Check if the user is logged in
  const token = getToken(); // Get the token if available

  useEffect(() => {
    // Function to fetch the posts from the server
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to handle changes in the search term input
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to check if the post matches the search term
  const postMatches = (post, text) => {
    // Return true if any of the fields you want to check against include the text
    return (
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.description.toLowerCase().includes(text.toLowerCase())
      // Add more fields if needed
    );
  };

  // Filter the posts based on the search term
  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div>
      <h2>Posts</h2>
      <div>
        {/* Search form */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>
      {postsToDisplay.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {postsToDisplay.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
              {userIsLoggedIn && !post.isAuthor && token && (
                <>
                  {/* Show message form only if there is a logged-in user and the user is not the post author */}
                  <form onSubmit={(event) => handleMessageSubmit(event, post._id)}>
                    <input type="text" name="message" placeholder="Enter your message" />
                    <button type="submit">Send Message</button>
                  </form>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostView;
