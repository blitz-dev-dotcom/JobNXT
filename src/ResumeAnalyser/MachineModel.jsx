import React from 'react';
import useAuth from '../context.js/AuthContext';

function MachineModel() {
  const {Ranks} = useAuth();
  
  return (
    <div className='Model'>
        <div className="modelpad">
          <div className="row1">
            <div className="sno"></div>
            <div className="resume"></div>
            <div className="rating"></div>
          </div>
        </div>
    </div>
  )
}

export default MachineModel;