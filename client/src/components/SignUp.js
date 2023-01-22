import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../styles/SignUp.css';

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: '', lastname: '', email: '',
    password:'',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (userInfo.password===confirmPassword){
      signUp(userInfo);
    }else{
      alert('Password must be the same!')
    }
  }

  const signUp=(userInfo)=>{
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(userInfo)
    })
    .then(res=>res.json())
    .then(res=>{
      if (res.status==='success'){
        window.location.href = '/'
      }
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='signup d-flex flex-column p-3 align-items-center min-vh-100'>
      <Form onSubmit={handleSubmit} className='d-flex flex-column p-4 bg-light rounded-2 w-50'>
        <h1 className='text-center fw-bold'>Welcome</h1>
        <h3 id='signup-border' className='text-center d-flex flex-column align-self-center text-center fs-5 my-4'>Sign Up</h3>
        <Form.Group className='d-flex flex-column mb-3' controlId='validationCustom01'>
          <Form.Label className='form-label fw-bold'>First Name <Form.Text style={{color:'red'}}>*</Form.Text></Form.Label>
          <Form.Control type='text' placeholder='John' size='sm' required value={userInfo.firstname} onChange={(e)=>setUserInfo({...userInfo, firstname:e.target.value})}/>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3' controlId='validationCustom02'>
          <Form.Label className='form-label fw-bold'>Last Name <Form.Text style={{color:'red'}}>*</Form.Text></Form.Label>
          <Form.Control type='text' placeholder='Doe' size='sm' required value={userInfo.lastname} onChange={(e)=>setUserInfo({...userInfo, lastname:e.target.value})}/>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3' controlId='validationCustomEmail'>
          <Form.Label className='form-label fw-bold'>Email <Form.Text style={{color:'red'}}>*</Form.Text></Form.Label>
          <Form.Control type='email' placeholder='abc@email.com' size='sm' required value={userInfo.email} onChange={(e)=>setUserInfo({...userInfo, email:e.target.value})}/>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3' controlId='formPassword'>
          <Form.Label className='form-label password fw-bold'>Password <Form.Text style={{color:'red'}}>*</Form.Text></Form.Label>
          <Form.Control type='password' size='sm' maxLength={10} required value={userInfo.password} onChange={(e)=>setUserInfo({...userInfo, password:e.target.value})}/>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3' controlId='formConfirmPassword'>
          <Form.Label className='form-label password fw-bold'>Confirm Password <Form.Text style={{color:'red'}}>*</Form.Text></Form.Label>
          <Form.Control type='password' size='sm' maxLength={10} required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </Form.Group>
        <Button className='fw-bold mb-3' size='sm' type='submit'>Sign Up</Button>
        <Form.Group className='d-flex justify-content-sm-between justify-content-lg-end'>
          <Form.Text>Already have an account?</Form.Text>
          <Button size='sm' className='btn-sm ms-lg-2' variant='outline-primary' href='/'>Sign In</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SignUp