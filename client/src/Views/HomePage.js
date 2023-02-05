import React, { useEffect, useState } from 'react'
import '../styles/Homepage.css';
import { Button } from 'react-bootstrap';

const HomePage = () => {
  const [user, setUser] = useState({});

  const handleLogOut=()=>{
    fetch('http://localhost:5000/signout', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(res=>{
      if (res.status==='success'){
        window.location.href = '/'
      }
    })
    .catch(err=>console.log(err))
  }
  
  useEffect(()=>{
    fetch('http://localhost:5000/home', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(res=>{
      if (res.status==='success'){
        setUser(res.data);
      }else { window.location.href = '/'}
    })
    .catch(err=>console.log(err))
  },[])


  return (  
    <div className='home_display d-flex flex-column align-items-center justify-content-center min-vh-100'>
        <h1>Welcome to UniGhana!</h1>
        <p className='fs-3 text-dark'>{user.firstname} {user.lastname}</p>
        <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  )
}


export default HomePage