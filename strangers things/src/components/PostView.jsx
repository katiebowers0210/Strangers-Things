import React, { useState, useEffect } from 'react';
import { isLoggedIn, getToken } from './AuthHelpers'; 
const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function PostView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const userIsLoggedIn = isLoggedIn(); 
  const token = getToken(); 

  useEffect(() => {
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

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const postMatches = (post, text) => {
    return (
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.description.toLowerCase().includes(text.toLowerCase())
    );
  };

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div>
      <h2>Posts</h2>
      <div>
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
