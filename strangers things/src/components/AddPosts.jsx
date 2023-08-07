import React, { useState } from 'react';
import { makeHeaders, isLoggedIn } from './AuthHelpers';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const AddPosts = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      setIsModalOpen(true);
      return;
    }

    const listing = {
      title,
      description,
      price: parseFloat(price),
    };

    try {
      const headers = makeHeaders();

      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: listing }),
      });

      const data = await response.json();
      if (response.ok) {
        onPostCreated(data.data.post);
        console.log('Listing created:', data.data.post);

        setTitle('');
        setDescription('');
        setPrice('');
      } else {
        console.error('Error creating listing:', data.error.message);
      }
    } catch (error) {
      console.error('Listing creation error:', error);
    }
  };

  return (
    <div>
      {isLoggedIn() ? (
        <>
          <h2>Create New Listing</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit">Create Listing</button>
          </form>
        </>
      ) : (
        <p>Please log in or sign up to create a new listing.</p>
      )}
      {isModalOpen && (
        <div className="modal">
          <p>Please sign in or sign up to create a new listing.</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AddPosts;
