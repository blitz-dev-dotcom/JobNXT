import React from 'react';
import logo from "../assets/logo.svg";
import { FaRegCircleUser } from "react-icons/fa6";
import '../App.css';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
  const opener = document.querySelector('.list');
  const HandleResp = ()=>{
    opener.classList.toggle('open');
  }
  
  return (
    <div className="header">
        <div className="logo">
        <img src={logo} alt="" className='logo-img' />
        <h2 >jobnxt</h2>
        </div>
        < RxHamburgerMenu className='ham' onClick={()=>{HandleResp( )}}/>
        <ul className='list'>
            <NavLink to="/profile" className='link'>My Profile</NavLink>
            <NavLink to="/about" className='link'>About Us</NavLink>
            <NavLink to="/contact" className='link'>Contact Us</NavLink>
            <NavLink to="/login" className='link'>LOGIN</NavLink>
            <li><FaRegCircleUser id="user" /></li>
        </ul>
    </div>
  )
}

export default Header