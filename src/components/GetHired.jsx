import React, { useState } from 'react';
import Details from '../components/FillDetails';
import Upload from '../components/UploadResume';
import Saved from '../components/SavedResume';
import { NavLink, Outlet } from 'react-router-dom';

function GetHired() {
  const [X , setX] = useState();
  const [Y,setY] = useState();
  const styles = {
    top:`${Y}px`,
    left:`${X}px`
  }
  window.addEventListener('mousemove',(e)=>{
    setX(e.pageX);
    setY(e.pageY);
   
    
  })
  

  return (
    <div className='details flex'>
      <div className="card">
        <div className="card1">
          <div className="butpad">
            <NavLink to='fill'><button className='cardbut' >1.Fill Details</button></NavLink>
            <NavLink to='upload'><button className='cardbut' >2.Upload Resume</button></NavLink>
            <NavLink to='saved'><button className='cardbut' >3.Save Resume</button></NavLink>
          </div>
          <div className="cardRender">
            <Outlet/>
          </div>
        </div>
        <div className="card2">
        </div>
      </div>
      <div className="pointer" style={styles}></div>
    </div>
  )
}

export default GetHired;
