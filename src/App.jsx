import React from 'react';
import indeximage from './assets/indesjob.png';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='index flex'>
      <div className="indexpad">
          <div className="col1 flex">
              <h1 className='defaultfont'>Jobnxt: Your one stop <br/> <span>Platform</span>!!!</h1>
              <p>We are here to bridge the gap between employers <br/> and employees, making the hiring process simple,<br/> efficient, and enjoyable for everyone involved</p>
          </div>
          <div className="col2">

          </div>
          <div className="col3">
              <img src={indeximage} alt="" className='indeximg' />
              <p>Tell us about yourself !!?</p>
              <div className="indexbut">
              <Link to='/recruit'><button className='hirebut'>TO HIRE</button></Link>
                <Link to='getDetails/fill'><button className='hirebut'>GET HIRED</button></Link>
              </div>
          </div>
      </div>
      
    </div>
    </div> 
  );
}

export default App;
