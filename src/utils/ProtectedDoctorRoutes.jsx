import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedDoctorRoutes({doctor}) {
  return (
    <>
        {
          doctor.login==null &&
          <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        }
        {
            doctor.login===false && <Navigate to="/account/doctor/login"/>
        }
        {
            doctor.login && <Outlet/>
        }
    </>
  )
}
