import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import '../App.css';
import {toast, ToastContainer} from 'react-toastify';
import loginimage from './images/login.jpg';
import 'react-toastify/dist/ReactToastify.min.css';

const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email.match(validRegex)){
      toast.error("Please enter a valid email")
    }
  
   else if(name.trim()==='') {
      toast.error("Please enter your name")
    }
     else{
      onStart(email,name);
  
    }
    
  };

  return (
    <div>
      
        <h1 style={{marginTop:"39px"}}>Welcome to the Quiz!</h1>
    <div className="container">
    <div>
       <div className="login-form" >
      <Form onSubmit={handleSubmit} className='py-3'>
                <Form.Group controlId='email' className='py-3'>
                    <Form.Label style={{color:"black"}}>Email Address</Form.Label>
                    <Form.Control  title= 'this is title' type='email' placeholder='Enter Email Address' value={email} onChange={(e) => { setEmail(e.target.value) }} ></Form.Control>
          </Form.Group>
          <Form.Group controlId='name' className='py-3'>
                    <Form.Label style={{color:"black"}}>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Your Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                </Form.Group>
                <Button className= "button1" type='submit' variant='primary' onClick={handleSubmit}>Proceed</Button>
                <ToastContainer
                position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"/>
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
