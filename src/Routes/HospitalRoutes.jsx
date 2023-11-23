import React, { useEffect } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../axios/axiosInstance'
import HospitalHomePage from '../pages/hospital/HospitalHomePage';
import HospitalLoginPage from '../pages/hospital/HospitalLoginPage';
import HospitalSignupPage from '../pages/hospital/HospitalSignupPage';
import ProtectedHospitalRoutes from '../utils/ProtectedHospitalRoutes';
import HospitalDoctorPage from '../pages/hospital/HospitalDoctorPage';
import HospitalDepartmentPage from '../pages/hospital/HospitalDepartmentPage';
import HospitalSchedulePage from '../pages/hospital/HospitalSchedulePage';
import HospitalProfilePage from '../pages/hospital/HospitalProfilePage';
import HospitalApprovalPage from '../pages/hospital/HospitalApprovalPage';

export default function HospitalRoutes() {
    const { refresh, hospital } = useSelector((state) => state);
      const dispatch = useDispatch()
    
      useEffect(() => {
        (async function () {
          let { data: hospitalData } = await axiosInstance.get("/hospital/auth/check");
          dispatch({ type: "hospital", payload: { login: hospitalData.loggedIn, details: hospitalData.hospital } })
        })()
      }, [refresh])

  return (
    <Routes>
       
       {
          hospital.login && hospital.details.rejected &&
          <>
            <Route path='/' element={<HospitalApprovalPage rejected hospital={hospital.details} rejectedMessage={hospital.details.rejectedMessage} />} />
            <Route path='/*' element={<HospitalApprovalPage rejected hospital={hospital.details} rejectedMessage={hospital.details.rejectedMessage} />} />
          </>
        }
        
        {
          hospital.login && hospital.details.active === false &&
          <>
            <Route path='/' element={<HospitalApprovalPage rejected={false} />} />
            <Route path='/*' element={<HospitalApprovalPage rejected={false} />} />
          </>
        }
        

        <Route element={<ProtectedHospitalRoutes hospital={hospital} />}>
        <>
            <Route path='/' element={<HospitalHomePage />} />
            <Route path='/doctor' element={<HospitalDoctorPage />} />
            <Route path='/department' element={<HospitalDepartmentPage />} />
            <Route path='/schedule/:id' element={<HospitalSchedulePage />} />
            <Route path='/profile' element={<HospitalProfilePage />} />
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
