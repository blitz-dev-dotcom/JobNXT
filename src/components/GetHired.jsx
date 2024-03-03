import React, { useState } from 'react';
import Details from '../components/FillDetails';
import Upload from '../components/UploadResume';
import Saved from '../components/SavedResume';

function GetHired() {
  const [X , setX] = useState();
  const [Y,setY] = useState();
  const styles = {
    top:`${Y}px`,
    left:`${X}px`
  }
  // Child To parent Data Function
  function CtoP(a){
    setCurrentCard(a);
  }
  window.addEventListener('mousemove',(e)=>{
    setX(e.pageX);
    setY(e.pageY);
   
    
  })
  const [currentCard, setCurrentCard] = useState(0);
  let cardComponent;

  function getCard(a) {
    switch(a) {
      case 1: 
        setCurrentCard(1);
        break;
      case 2:
        setCurrentCard(2);
        break;
      default:
        setCurrentCard(0);
    }
  }

  switch (currentCard) {
    case 1:
      cardComponent = <Upload value={CtoP}/>;
      break;
    case 2:
      cardComponent = <Saved />;
      break;
    default:
      cardComponent = <Details CtoP={CtoP}/>;
  }

  return (
    <div className='details flex'>
      <div className="card">
        <div className="card1">
          <div className="butpad">
            <button className='cardbut' onClick={() => getCard(0)}>1.Fill Details</button>
            <button className='cardbut' onClick={() => getCard(1)}>2.Upload Resume</button>
            <button className='cardbut' onClick={() => getCard(2)}>3.Save Resume</button>
          </div>
          <div className="cardRender">
            {cardComponent}
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
