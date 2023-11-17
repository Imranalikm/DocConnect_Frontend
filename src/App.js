import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import HospitalRoutes from './Routes/HospitalRoutes';
import { useSelector } from 'react-redux';


function App() {

  axios.defaults.baseURL ='http://localhost:3000';
  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(
    (config) => {
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { status } = error.response;
  
      if (status === 401) {
        window.location.href = '/login'; 
      } else {
        console.error('Request failed with error:', error);
      }
  
      return Promise.reject(error);
    }
  );

  

  const { loading } = useSelector((state) => state);
  return (
    <div className="App">
       <Routes>
      
       <Route path='/account/admin/*' element={<AdminRoutes/>}/>
       <Route path='/account/hospital/*' element={<HospitalRoutes/>}/>
        <Route path='/*' element={<UserRoutes/>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
