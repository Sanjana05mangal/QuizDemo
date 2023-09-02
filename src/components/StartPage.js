import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css';
import loginimage from './images/login.jpg';

const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(email,name);
  };

  return (
    <div>
        <h3 style={{marginTop:"35px"}}>Welcome to the Quiz!</h3>
    <div className="container" style={{width:"70%"}}>
    <div>
       <div className="login-form" >
      <Form onSubmit={handleSubmit} className='py-3'>
                <Form.Group controlId='email' className='py-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
          </Form.Group>
          <Form.Group controlId='name' className='py-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Your Name' value={name} onChange={(e) => { setName(e.target.value) }}></Form.Control>
                </Form.Group>
               
                <Button className= "button1" type='submit' variant='primary' onClick={handleSubmit}>Proceed</Button>
            </Form>
    </div>
    </div>
    <div className="image">
        <img src={loginimage} alt="Side Image" />
      </div>
    </div>
    </div>
  );
};

export default StartPage;
