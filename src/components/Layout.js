import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import PreLoader from './PreLoader';

function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const dataFetching = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    };
    dataFetching();
  }, []);

  return (
    <>
      {isLoading ? <PreLoader /> : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default Layout;
