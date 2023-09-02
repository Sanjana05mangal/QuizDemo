import React, { useState } from 'react';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import "./bootstrap.min.css";
import './App.css'

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStart = (userEmail,name) => {
    setEmail(userEmail);
    setName(name)
    setQuizStarted(true);
  };

  return (
    <div className="App">
      {!quizStarted ? <StartPage onStart={handleStart} /> : <QuizPage email={email} name={name} />}
    </div>
  );
}



export default App;
