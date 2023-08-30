// import React, { useState, useEffect } from 'react';

// const QuizPage = ({ email }) => {
//   const [timer, setTimer] = useState(30 * 60);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   // Define your questions array here
//   const questions = ["1","2","3","4","5"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//     } else {
//       // Handle quiz completion
//     }
//   };

//   return (
//     <div>
//       <h2>Quiz Timer: {Math.floor(timer / 60)}:{timer % 60}</h2>
//       <h3>Question {currentQuestion + 1}</h3>
//       <p>{questions[currentQuestion]}</p>
//       {/* Render answer options */}
//       <button onClick={handleNextQuestion}>Next Question</button>
//     </div>
//   );
// };

// export default QuizPage;
import React, { useState, useEffect } from 'react';

const QuizPage = ({ email }) => {
  const [timer, setTimer] = useState(30 * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  // Define your questions array here
  const questions = ["1","2","3","4","5"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      // Handle quiz completion
    }
  };

  const handleQuestionNavigation = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setVisitedQuestions((prevVisited) => [...new Set([...prevVisited, questionIndex])]);
  };

  const handleQuestionAttempt = (questionIndex) => {
    setAttemptedQuestions((prevAttempted) => [...new Set([...prevAttempted, questionIndex])]);
  };

  return (
    <div>
      <h2>Quiz Timer: {Math.floor(timer / 60)}:{timer % 60}</h2>
      <div className="overview-panel">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`overview-item ${visitedQuestions.includes(index) ? 'visited' : ''} ${
              attemptedQuestions.includes(index) ? 'attempted' : ''
            }`}
            onClick={() => handleQuestionNavigation(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="question-container">
        <h3>Question {currentQuestion + 1}</h3>
        <p>{questions[currentQuestion]}</p>
        {/* Render answer options */}
        <button onClick={handleNextQuestion}>Next Question</button>
        <button onClick={() => handleQuestionAttempt(currentQuestion)}>Mark as Attempted</button>
      </div>
    </div>
  );
};

export default QuizPage;

