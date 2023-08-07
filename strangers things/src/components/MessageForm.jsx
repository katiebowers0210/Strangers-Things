import React, { useState } from 'react';

const MessageForm = ({ postId, onMessageSent }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      alert('Please log in to send a message.');
      return;
    }

    const messageData = {
      content: message,
    };

    try {
      const headers = makeHeaders();

      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageData }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Message sent:', data.data.message);
        setMessage('');
        onMessageSent(); // Notify the parent component about the successful message sent
      } else {
        console.error('Error sending message:', data.error.message);
      }
    } catch (error) {
      console.error('Message sending error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default MessageForm;
