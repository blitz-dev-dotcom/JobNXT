import React from 'react';
import './MisRoute.css';
import err from '../assets/err.jpg';
import { Link } from 'react-router-dom';


function MisRoute() {
  
  return (
    <div className='err'>
      <img src={err} alt="" />
      <div className='hoem'><Link to='/' className='errlink'><h1>Go back to Home</h1></Link></div>
    </div>
  )
}

export default MisRoute