import React from 'react'
import '../styles/Homepage.css';
import { Button } from 'react-bootstrap';

const HomePage = () => {

  const handleLogOut=()=>{
    fetch('http://localhost:5000/signout', {
      method: 'GET'
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
    <div className='home_display d-flex flex-column align-items-center justify-content-center min-vh-100'>
        <h1>Welcome to UniGhana!</h1>
        <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  )
}


export default HomePage