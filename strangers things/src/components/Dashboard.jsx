import React, { useEffect, useState } from 'react';
import { makeHeaders } from './AuthHelpers';
import AddPosts from './AddPosts';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Dashboard = ({ addNewPost }) => {
  const [posts, setPosts] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchReceivedMessages = async () => {
      try {
        const headers = makeHeaders();
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch received messages');
        }

        const data = await response.json();
        setReceivedMessages(data.data?.messages || []);
      } catch (error) {
        console.error('Error fetching received messages:', error);
      }
    };

    fetchPosts();
    fetchReceivedMessages();
  }, []);

  const fetchPostsAgain = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const headers = makeHeaders();
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          ...headers,
        },
      });
  
      console.log('Deletion response:', response);
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`Failed to delete post: ${data.error.message}`);
      }
  
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      console.log('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div>
      <h1>Welcome to your dashboard</h1>
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
              <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Received Messages</h3>
      {receivedMessages.length === 0 ? (
        <p>No received messages.</p>
      ) : (
        <ul>
          {receivedMessages.map((message) => (
            <li key={message._id}>
              <p>{message.content}</p>
              <p>From: {message.fromUser.username}</p>
            </li>
          ))}
        </ul>
      )}

      <AddPosts onPostCreated={() => fetchPostsAgain()} />
    </div>
    </>
  );
};

export default Dashboard;
