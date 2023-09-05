import React, { useState, useEffect } from 'react';
import { Alert, Button,Card,Col,Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';

const QuizPage =  ({ email,name}) => {
  const [questions, setQuestions] = useState([])
  const [loading, setloading] = useState(true)
  const [timer, setTimer] = useState(30*60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [markedQuestions, setMarkedQuestions] = useState([]);

  let reportindex = 1;
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
    
   useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=15')
      .then(response => {
        const data = response.data.results;
       //console.log(data);
        let temp = []
        
        for (let index = 0; index < 15; index++) {
          const q = data[index].question;
          let options = data[index].incorrect_answers;
          options.push(data[index].correct_answer)
          const correct = data[index].correct_answer;
          for (let i = options.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]]
          }
          temp.push({ question: q, options: options, correct_answer: correct, your_choice: '' });
        }

        setQuestions(temp);
        setloading(false);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleQuestionMarkforReview = (questionIndex) => {
    setMarkedQuestions((prevVisited) => [...new Set([...prevVisited, questionIndex])])
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      
    } else {
      const response = window.confirm("Do You want to submit Quiz?");

      if (response) {
        setTimer(0);
      } else setCurrentQuestion(0);
      
    }
  }

  const handleNextQuestion = () => {
    handleQuestionNavigation(currentQuestion)
    if(questions[currentQuestion].your_choice!='')handleQuestionAttempt(currentQuestion)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      
    } else {
      const response = window.confirm("Do You want to submit Quiz?");

      if (response) {
        setTimer(0);
      } else setCurrentQuestion(0);
      
    }
  };

  const handleChange = e => {
    e.preventDefault();
    let temp = questions
    
    temp[currentQuestion].your_choice = e.target.value;
    setQuestions(temp);
    console.log(questions);
  }

  const handleQuestionNavigation = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    if(!visitedQuestions.includes(questionIndex))
    setVisitedQuestions((prevVisited) => [...new Set([...prevVisited, questionIndex])]);
  };

  const handleQuestionAttempt = (questionIndex) => {
    if(!attemptedQuestions.includes(questionIndex))
    setAttemptedQuestions((prevAttempted) => [...new Set([...prevAttempted, questionIndex])]);
  };

  return (
    <div>
      {timer > 0 ? loading ?(<Spinner></Spinner>):(
        <>
          <Row style={{marginTop:"20px"}}>
            <Col xs={9}  style={{'text-align':'left','padding-left':'400px'}}>
              <h2>Hello {name}!</h2>
            </Col>
            <Col xs={3} style={{marginTop:"10px", marginLeft:'-25px'}}>
              <Button>Quiz Ends In: {Math.floor(timer / 60)}:{timer % 60}</Button>
            </Col>
             
          </Row>
          <Row style={{marginTop:"25px"}}>
          <Col xs={8}>
          <div className="overview-panel" style={{ 'display':'flex','justify-content':'space-evenly','margin-top':'25px'}}>
           
               {questions?.map((_, index) => (
                  <button
                    key={index}
                    className={`overview-item ${visitedQuestions.includes(index) ? 'visited' : ''} ${
                      attemptedQuestions.includes(index) ? 'attempted' : ''
                    } ${markedQuestions.includes(index)?'marked':''}`}
                    onClick={() => handleQuestionNavigation(index)}
                  >
                    {index + 1}
                  </button>
                 ))}
            </div>
      
        <div style={{ 'text-align':'left','padding-left':'10px', 'font-size':'large',  marginTop:"10px", marginLeft:"20px"}}>
        <h3>Question {currentQuestion + 1}</h3>  
        <p>{questions[currentQuestion]?.question}</p>
        <Form>
          {questions[currentQuestion]?.options?.map(element => 
            
            (
            <Form.Check
              value={element}
                type="radio"
                aria-label="radio 1"
              label={element}
              onChange={handleChange}
              checked={element===questions[currentQuestion].your_choice}
              />
            )
          )}
          </Form>
        
        <Button onClick={handleNextQuestion} variant='success' style={{'margin-right':'20px','margin-top':'40px'}}>Next Question</Button>
        <Button onClick={() => handleQuestionMarkforReview(currentQuestion)} variant='warning' style={{'margin-left':'10px','margin-top':'40px'}}>Mark for review</Button>
        
              </div>
              </Col>
            <Col xs={4} >
              <div style={{ 'width': '100%', 'margin-top': '15px' , marginLeft:"100px"}} >
                
              <Row style={{'text-align':'left','margin-top':'10px'}}>
                <Col xs={1}><button key='' className='overview-item visited' ></button></Col>
                <Col xs={11} style={{ 'margin-left':'-10px'}}>Visited but not answered or marked</Col>
              </Row>
              
              <Row style={{'text-align':'left','margin-top':'10px'}}>
                <Col xs={1}><button key='' className='overview-item '></button></Col>
                <Col xs={11} style={{ 'margin-left':'-10px'}}>Not visited</Col>
              </Row>
              
              <Row style={{'text-align':'left','margin-top':'10px'}}>
                <Col xs={1}><button key='' className='overview-item marked'></button></Col>
                <Col xs={11} style={{ 'margin-left':'-10px'}}>Marked for review</Col>
              </Row>
              
              <Row style={{'text-align':'left','margin-top':'10px'}}>
                <Col xs={1}><button key='' className='overview-item attempted'></button></Col>
                <Col xs={11} style={{ 'margin-left':'-10px'}}>Answered</Col>
              </Row>
              
            </div>
            </Col>
            
          </Row>
          
          
        </>) : (<>
          <h2 style={{marginTop:"15px"}}>Here is Quiz Report : {name}</h2>
          
          {
            questions?.map(e => (
            <div style={{'text-align':'left','margin-left':'50px', marginTop:"20px"}}>
                <h5>Q.{reportindex++} {e.question}</h5>
                <Row>
                  <Col xs={3}>
                    <p><b>Your Choice</b> : <p style={{ 'color': e.your_choice===e.correct_answer?'green':'red'}}> {e.your_choice}</p></p>
                  </Col>
                  <Col xs={3}>
                    <p><b>Correct Answer</b> :<p style={{'color':'green'}}> {e.correct_answer}</p></p>
                  </Col>
                  <Col xs={3}>
                    <Alert variant={e.your_choice === e.correct_answer ? 'success' : 'danger'}>
                      {e.your_choice === e.correct_answer ? (<p>Correct Answer</p>): (<p>Wrong Answer</p>)}
                    </Alert>
                  </Col>
                  </Row>
            </div>
          ))}
      </>)}
      
        
    </div>
  );
};

export default QuizPage;

