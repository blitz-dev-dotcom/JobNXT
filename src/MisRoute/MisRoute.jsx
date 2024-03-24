import React from 'react';
import './MisRoute.css';
import sad from '../assets/sadface.gif';
import { Link } from 'react-router-dom';


function MisRoute() {
  const err = '{Message : "error Occured"}'
  return (
    <div className='err'>
      <img src={sad} alt="" height={300} width={300}/>
      <div className='hoem'><p>{err}</p></div>
      <p>Ooops Something Went Wrong!</p>
      <Link to='/' className='errlink'>Back To Home</Link>
    </div>
  )
}

export default MisRoute