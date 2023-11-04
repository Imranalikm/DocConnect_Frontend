import { Backdrop, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedUserRoutes({user}) {
  return (
    <>
        {
          user.login==null &&
          <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        }
        {
            user.login===false && <Navigate to="/login"/>
        }
        {
            user.login && <Outlet/>
        }
    </>
  )
}
