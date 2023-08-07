import React from 'react';
import { makeHeaders } from './AuthHelpers';

const COHORT_NAME = '2306-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const DeletePost = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const headers = makeHeaders();

      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: headers,
      });

      const data = await response.json();
      if (response.ok) {
        onDelete(postId);
        console.log('Post deleted successfully:', data);
      } else {
        console.error('Error deleting post:', data.error.message);
      }
    } catch (error) {
      console.error('Delete post error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
};

export default DeletePost;
