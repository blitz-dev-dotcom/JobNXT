import React from 'react';
import useAuth from './context.js/AuthContext';
import { Navigate,Outlet} from 'react-router-dom';
import MisRoute from './MisRoute/MisRoute';


function PrivateRoutes() {
    const {DataGet} = useAuth();
  return (
    DataGet ? <Navigate to='/ModelOutput'/> : <MisRoute />
    )
}

export default PrivateRoutes;