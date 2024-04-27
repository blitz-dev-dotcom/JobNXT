import React from 'react';
import useAuth from './context.js/AuthContext';
import MisRoute from './MisRoute/MisRoute';


function PrivateRoutes({children}) {
    const {DataGet} = useAuth();
  
    if(DataGet){
      return children
    }

    return <MisRoute/>
}

export default PrivateRoutes;