import React, { useState } from 'react';

const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(email);
  };

  return (
    <div>
      <h1>Welcome to the Quiz!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default StartPage;
