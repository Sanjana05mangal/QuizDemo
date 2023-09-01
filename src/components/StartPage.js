import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(email,name);
  };

  return (
    <div style={{ 'margin-top': '100px'}}>
      <h1>Welcome to the Quiz!</h1>
       <div className="login-form" style={{'margin-top':'100px'}}>
      <Form onSubmit={handleSubmit} className='py-3'>
                <Form.Group controlId='email' className='py-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
          </Form.Group>
          <Form.Group controlId='name' className='py-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Your Name' value={name} onChange={(e) => { setName(e.target.value) }}></Form.Control>
                </Form.Group>
               
                <Button type='submit' variant='primary' onClick={handleSubmit}>Proceed</Button>
            </Form>
    </div>
    </div>
  );
};

export default StartPage;
