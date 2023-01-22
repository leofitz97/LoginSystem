import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const ForgottenPassword = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailFound, setEmailFound] = useState(false);


  const findEmail=(e)=>{
    e.preventDefault();
    fetch('http://localhost:5000/forgot_password/'+email, {
      method:'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res=>res.json())
    .then(res=>{
      if (res.status==='success'){
        setEmailFound(true);
      };
    })
    .catch(err=>console.log(err))
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (password===confirmPassword){
      fetch('http://localhost:5000/reset_password', {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({password: password, email: email})
      })
      .then(res=>res.json())
      .then(res=>{
        if (res.status==='success'){
          window.location.href = '/'
          setEmailFound(false);
          alert(res.message);
        }else{
          setEmailFound(false);
          alert(res.message);
        }
      })
      .catch(err=>alert('Network Error'))
    }else{
      alert("Passwords doesn't match!")
    }
  }
  return (
    <div style={{backgroundColor: 'rgba(210, 105, 30, 0.413)'}} className='min-vh-100 d-flex flex-column align-items-center justify-content-center'>
      <Form onSubmit={emailFound===true?handleSubmit:findEmail} className='bg-light d-flex flex-column p-4 rounded-2'>
        <Form.Group className='mb-3' controlId='formBasicEmail' >
          <Form.Label className='fw-bold'>Email</Form.Label>
          <Form.Control type='email' value={email} required disabled={emailFound===true&&true} onChange={(e)=>setEmail(e.target.value)}/>
          <Form.Text>Enter your email address</Form.Text>
        </Form.Group>
        {emailFound === true && 
        <>
          <Form.Group className='d-flex flex-column mb-3' controlId='formBasicPassword'>
            <Form.Label className='password fw-bold'>New Password</Form.Label>
            <Form.Control type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3' controlId='formConfirmPassword'>
          <Form.Label className='form-label password fw-bold'>Confirm Password</Form.Label>
          <Form.Control type='password' size='sm' maxLength={10} required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </Form.Group></>
      }
      <Button size='sm' type='submit'>{emailFound===true ? 'Reset Password': 'Submit'}</Button>
      </Form>
    </div>
  )
}

export default ForgottenPassword;