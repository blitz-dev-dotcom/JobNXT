import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter , RouterProvider ,createRoutesFromElements, Route } from 'react-router-dom';
import Header from './components/Header';
import ErrorPage from './MisRoute/MisRoute';
import Login from './components/Login';
import Layout from './components/Layout';
import Index from './components/Index';
import GetHired from './components/GetHired';

const route = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>} errorElement={<ErrorPage />}>
    <Route path='/' element={<Index />} />
    <Route path='login' element={<Login/>}/>
    <Route path='getDetails' element={<GetHired/>}/>
  </Route>
))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {route} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
