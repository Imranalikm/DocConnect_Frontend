import React, { useEffect } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AdminHomePage from '../pages/admin/AdminHomePage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import HospitalrequestPage from '../pages/admin/AdminHospitalRequestPage';
import ProtectedAdminRoutes from '../utils/ProtectedAdminRoutes';
import AdminHospitalPage from '../pages/admin/AdminHospitalPage';
export default function AdminRoutes() {
    
    const { refresh, admin} = useSelector((state) =>state);
      const dispatch = useDispatch()
    
      useEffect(() => {
        (async function () {
          let { data: adminData } = await axios.get("/admin/auth/check");
          dispatch({ type: "admin", payload: { login: adminData.loggedIn, details: adminData.admin } })
        })()
      }, [refresh])

  return (
    <Routes>

        <Route element={<ProtectedAdminRoutes admin={admin} />}>
        <>
            <Route path='/' element={<AdminHomePage />} />
            <Route path='/users' element={<AdminUsersPage />} />
            <Route path='/hospitals/requests' element={<HospitalrequestPage />} />
            <Route path='/hospitals' element={<AdminHospitalPage />} />
           
        </>
        </Route>
        {
          admin.login &&
          <Route path='/login' element={<Navigate to="/account/admin" />} />
        }
        {
          admin.login === false &&
          <>
            <Route path='/login' element={<AdminLoginPage />} />
          </>
        }
    </Routes>
  )
}
