import React from 'react';
import useAuth from './context.js/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoutes({ children }) {
    const { CurrentUser } = useAuth();

    return (
        <>
            {CurrentUser ? (
                children
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}

export default PrivateRoutes;
