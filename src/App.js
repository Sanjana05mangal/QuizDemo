import React, { useState } from 'react';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';

function App() {
  const [email, setEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStart = (userEmail) => {
    setEmail(userEmail);
    setQuizStarted(true);
  };

  return (
    <div className="App">
      {!quizStarted ? <StartPage onStart={handleStart} /> : <QuizPage email={email} />}
    </div>
  );
}

export default App;
