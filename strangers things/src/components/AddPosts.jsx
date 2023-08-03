import React, { useState } from 'react';
import axios from 'axios';
import { makeHeaders } from './AuthHelpers'; // Import the makeHeaders function

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const AddPosts = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const headers = makeHeaders(); // Get the headers with the bearer token

      const response = await axios.post(
        `${BASE_URL}/posts`,
        {
          post: {
            title,
            description,
            price,
          },
        },
        { headers }
      );

      // Add the new post to the state
      onPostCreated(response.data.data.post);

      // Clear the form fields
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      setErrorMessage('Error creating post. Please try again.');
      console.error('Post creation error:', error);
    }
  };

  return (
    <div>
      <h2>Create New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit">Create Listing</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default AddPosts;