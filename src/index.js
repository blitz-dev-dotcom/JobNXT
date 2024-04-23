import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter , RouterProvider ,createRoutesFromElements, Route } from 'react-router-dom';
import ErrorPage from './MisRoute/MisRoute';
import Login from './components/Login';
import Layout from './components/Layout';
import GetHired from './components/GetHired';
import { AuthProvider } from './context.js/AuthContext';
import App from './App';
import FillDetails from './components/FillDetails';
import UploadResume from './components/UploadResume';
import SavedResume from './components/SavedResume';
import Analyser from './ResumeAnalyser/Analyser';
import MachineModel from './ResumeAnalyser/MachineModel';
import PrivateRoutes from './PrivateRoutes';
import { RequiredAuth } from './components/RequiredAuth';



const route = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path='/' element={<Layout/>} errorElement={<ErrorPage />}>
    <Route path='/' element={<App />} />
    <Route path='login' element={<Login/>} />
    <Route path='getDetails' element={<GetHired/>}>
      <Route index path='fill'  element={<FillDetails/>} />
      <Route path='upload' element={<UploadResume/>} />
      <Route path='saved' element={<SavedResume/>} />
    </Route>
  </Route>
  <Route path='/recruit' element={<Analyser/>}>
  </Route>
  <Route path='/ModelOutput' element={<PrivateRoutes><MachineModel /></PrivateRoutes>}/>
  
  </>
  
))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router = {route} />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
