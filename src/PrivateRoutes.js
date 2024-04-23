import React from 'react';
import useAuth from './context.js/AuthContext';
import { Navigate } from 'react-router-dom';
import MisRoute from './MisRoute/MisRoute';


function PrivateRoutes() {
    const {DataGet} = useAuth();
  
    if(DataGet){
      return <Navigate to='/ModelOutput' />
    }

    return <MisRoute/>
}

export default PrivateRoutes;