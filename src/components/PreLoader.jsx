import React from 'react';
import logo from '../assets/logo.svg';

function PreLoader() {
  return (
    <div className='pre-loader'>
        <img src={logo} alt="" />
        <h1>JobNxt</h1>
    </div>
  )
}

export default PreLoader