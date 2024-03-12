import React ,{useState} from 'react';
import logo from "../assets/logo.svg";
import { FaRegCircleUser } from "react-icons/fa6";
import '../App.css';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import useAuth from '../context.js/AuthContext';

function Header() {
  const {Reg , CurrentUser , Profile ,LogOut ,setReg} = useAuth();
  const [Open , setOpen] = useState(false);
  const CustomStyle = {
    backgroundImage:`url(${Profile})`,
    backgroundSize:'cover'
  }
  function GettingOut(){
    setTimeout(()=>{
      LogOut();
      window.localStorage.removeItem('RegStatus');
      window.localStorage.removeItem('localName');
      window.localStorage.removeItem('refer');
    },2000)
  }
  const status = window.localStorage.getItem('RegStatus');
  return (
    <div className="header">
        <div className="logo">
        <img src={logo} alt="" className='logo-img' />
        <h2 >jobnxt</h2>
        </div>
        < RxHamburgerMenu className='ham' onClick={()=>{setOpen(!Open)}}/>
        <ul className={Open? 'list open' : 'list'}>
            {Reg ? <li id='logout' onClick={GettingOut}>Logout</li> : ''}
            <NavLink to="/" className='link'>HOME</NavLink>
            <NavLink to="/profile" className='link'>PROFILE</NavLink>
            <NavLink to="/about" className='link'>ABOUT US</NavLink>
            <NavLink to="/contact" className='link'>CONTACT US</NavLink>
            {Reg ? <li>{CurrentUser}</li> : <NavLink to="/login" className='link'>LOGIN</NavLink> }
            {Reg ? <li><button className='prof' style={CustomStyle}>
                </button><p className='drop'  onClick={GettingOut}>Logout</p></li> : <li><FaRegCircleUser id="user" /></li>}
        </ul>
    </div>
  )
}

export default Header