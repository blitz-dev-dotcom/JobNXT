import React from 'react';
import useAuth from './context.js/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const {CurrentUser} = useAuth();
    if(CurrentUser === null){
        return <Navigate to='login'/>
    }
  return children
}

export default ProtectedRoute