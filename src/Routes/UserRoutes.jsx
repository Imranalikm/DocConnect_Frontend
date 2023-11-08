import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserHomePage from "../pages/user/UserHomePage";
import ProtectedUserRoutes from "../utils/ProtectedUserRoutes";

import LoginPage from "../pages/user/UserLoginPage";
import UserSignupPage from "../pages/user/UserSignupPage";




export default function UserRoutes() {
  const { refresh, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/user/auth/check");
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, details: data.user },
      });
    })();
  }, [refresh]);

 

  return (
    <Routes>
       <Route element={<ProtectedUserRoutes user={user} />}>
        <Route path="/" element={<UserHomePage />} />
       
      </Route>

      {user.login === false && (
        <>
         
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<UserSignupPage />} />
        
        
        </>
      )}
      {user.login && (
        <>
          <Route path="/login" element={<Navigate to={"/"} />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          
         
        </>
      )}
       
    </Routes>
  );
}
