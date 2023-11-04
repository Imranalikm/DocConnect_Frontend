import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';

import { useSelector } from 'react-redux';


function App() {
  axios.defaults.baseURL ='http://localhost:3000';
  axios.defaults.withCredentials = true;
  
  const { loading } = useSelector((state) => state);
  return (
    <div className="App">
       <Routes>
      
       <Route path='/account/admin/*' element={<AdminRoutes/>}/>
        <Route path='/*' element={<UserRoutes/>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
