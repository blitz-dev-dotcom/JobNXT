import React from 'react';
import useAuth from '../context.js/AuthContext';

function MachineModel() {
  const {CandidList} = useAuth();
  window.addEventListener('load',()=>{console.log(CandidList)})
  return (
    <div className='Model'>
        <div className="modelpad">
          <div className="row1">
            <div className="sno flex">
              <h1 className='modelhead'>S.NO</h1>
            </div>
            <div className="resume flex">
              <h1 className='modelhead'>Resume</h1>
            </div>
            <div className="rating flex">
              <h1 className='modelhead'>Score</h1>
            </div>
          </div>
          {
            CandidList ? (
              CandidList.map((item,index)=>{
                return(
                  <div className="row1">
                  <div className="sno flex">
                    <p>{index + 1}</p>
                  </div>
                  <div className="resume flex">
                    <a href={item.url} target='_blank'>{item.folder.name}</a>
                  </div>
                  <div className="rating flex">
                    <p>{item.Rank}</p>
                  </div>
                </div>
                )
              })
            ) :
            
            ""
          }
        </div>
    </div>
  )
}

export default MachineModel;