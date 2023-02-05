import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../styles/Signin.css'


const Signin = () => {
  const [invalid, setInvalid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (email===''){
      alert('Please type your email address!');
    }else{
      signIn();
    };
  };

  const signIn=()=>{
    fetch('http://localhost:5000/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email:email, password:password, rememberMe:rememberMe}),
    })
    .then(res=>res.json())
    .then(res=>{
      if (res.status==='success'){
        window.location.href = '/home'
        setInvalid('');
      }else{
        setInvalid(res.message);
      }
    })
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    fetch('http://localhost:5000/', {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type':'application/json'}
    })
    .then(res=>res.json())
    .then(res=>{
      if (res.status==='success'){
        window.location.href = '/home'
      }
    })
    .catch(err=>alert('Network Error!'))
  },[])

  return (
    <div className='signin d-flex justify-content-center'>
      <div className='d-flex flex-column justify-content-center align-items-center p-3 min-vh-100'>
      <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center p-4 bg-light rounded-2 w-100'>
      <h1 className='text-center fw-bold fs-3 my-1'>Welcome</h1>
      <h3 className='signin-border d-flex flex-column align-self-center text-center fs-5 my-3'>Sign In</h3>
      <Form.Group className='d-flex flex-column mb-3' controlId='formBasicEmail'>
        <Form.Label className='form-label fw-bold'>Email</Form.Label>
        <Form.Control type='email' placeholder='abc@email.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className='d-flex flex-column' controlId='formBasicPassword'>
        <Form.Label className='password fw-bold'>Password</Form.Label>
        <Form.Control type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        {invalid !=='' && <Form.Text style={{color:'red'}}>{invalid}</Form.Text>}
      </Form.Group>
      <Form.Group className='d-flex justify-content-between m-2 mb-4' controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" className='me-5' checked={rememberMe} onChange={(e)=>setRememberMe(e.target.checked)}/>
        <a className='' href='/forgot_password' role={'button'}>Forgot password?</a>
      </Form.Group>
      <Button className='mb-3 btn-sm fw-bold fs-7' type='submit'>Sign In</Button>
      <Form.Group className='d-flex justify-content-between'>
        <Form.Text>Don't have an account?</Form.Text>
        <Button className='btn-sm' href='/signup' variant='outline-primary'>Sign Up</Button>
      </Form.Group>
    </Form>
    </div>
    </div>
  )
}

export default Signin;