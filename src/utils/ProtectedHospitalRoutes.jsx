import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedHospitalRoutes({hospital}) {
  return (
    <>
        {
          hospital.login==null &&
          <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        }
        {
            hospital.login===false && <Navigate to="/account/hospital/login"/>
        }
        {
            hospital.login && <Outlet/>
        }
    </>
  )
}
