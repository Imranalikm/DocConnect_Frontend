import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedAdminRoutes({ admin }) {
  return (
    <>
      {admin.login == null && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {admin.login === false && <Navigate to="/account/admin/login" />}
      {admin.login && <Outlet />}
    </>
  );
}
