import React from 'react';
import useAuth from './context.js/AuthContext';
import MachineModel from './ResumeAnalyser/MachineModel';
import MisRoute from './MisRoute/MisRoute';


function PrivateRoutes() {
    const {DataGet} = useAuth();
  return (
    DataGet ? <MachineModel/> : <MisRoute />
    )
}

export default PrivateRoutes;