import React from 'react'
import useAuth from '../context.js/AuthContext'
import { Navigate } from 'react-router-dom';

export const RequiredAuth = ({children}) => {
    const auth = useAuth;

    if(!auth.CurrentUser){
        return <Navigate to='/login' />
    }

  return children
  
}
