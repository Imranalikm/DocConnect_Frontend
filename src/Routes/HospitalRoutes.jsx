import React, { useEffect } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import HospitalHomePage from '../pages/hospital/HospitalHomePage';
import HospitalLoginPage from '../pages/hospital/HospitalLoginPage';
import HospitalSignupPage from '../pages/hospital/HospitalSignupPage';
import ProtectedHospitalRoutes from '../utils/ProtectedHospitalRoutes';
import HospitalDoctorPage from '../pages/hospital/HospitalDoctorPage';
export default function HospitalRoutes() {
    const { refresh, hospital } = useSelector((state) => state);
      const dispatch = useDispatch()
    
      useEffect(() => {
        (async function () {
          let { data: hospitalData } = await axios.get("/hospital/auth/check");
          dispatch({ type: "hospital", payload: { login: hospitalData.loggedIn, details: hospitalData.hospital } })
        })()
      }, [refresh])

  return (
    <Routes>
       
        
        

        <Route element={<ProtectedHospitalRoutes hospital={hospital} />}>
        <>
            <Route path='/' element={<HospitalHomePage />} />
            <Route path='/doctor' element={<HospitalDoctorPage />} />
          </>
        </Route>
        {
          hospital.login &&
          <>
            <Route path='/login' element={<Navigate to="/account/hospital/" />} />
            <Route path='/signup' element={<Navigate to="/account/hospital/" />} />
           
          </>
        }
        {
          hospital.login === false &&
          <>
            <Route path='/login' element={<HospitalLoginPage />} />
            <Route path='/signup' element={<HospitalSignupPage />} />
            
          </>
        }
    </Routes>
  )
}
