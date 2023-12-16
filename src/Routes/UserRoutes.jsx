import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../axios/axiosInstance.js';
import UserHomePage from "../pages/user/UserHomePage";
import ProtectedUserRoutes from "../utils/ProtectedUserRoutes";
import UserDepartmentPage from "../pages/user/UserDepartmentPage";
import LoginPage from "../pages/user/UserLoginPage";
import UserSignupPage from "../pages/user/UserSignupPage";
import UserSearchPage from "../pages/user/UserSearchPage";
import UserHospitalPage from "../pages/user/UserHospitalPage"
import UserDoctorPage from "../pages/user/UserDoctorPage";
import UserProfilePage from '../pages/user/UserProfilePage'
import UserDocBotPage from "../pages/user/userDocBotPage.jsx";
import UserAuthCallbackPage from "../pages/user/UserAuthCallbackPage.jsx"
import UserVideoCallPage from "../pages/user/UserVideoCallPage.jsx";
import LoginGateWayPage from "../pages/user/LoginGateWayPage.jsx"
import Chat from "../components/Chat/MainChat/Chat.jsx"
import UserForgotPage from "../pages/user/UserForgotPage.jsx"
export default function UserRoutes() {
  const { refresh, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      let { data } = await axiosInstance.get("/user/auth/check");
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, details: data.user },
      });
    })();
  }, [refresh,user]);

 

  return (
    <Routes>
       <Route element={<ProtectedUserRoutes user={user} />}>
        
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/department/:id" element={<UserDepartmentPage />} />
        <Route path="/search" element={<UserSearchPage />} />
        <Route path="/hospital/:id" element={<UserHospitalPage />} />
        <Route path="/doctor/:id" element={<UserDoctorPage/>}/>
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/docbot" element={<UserDocBotPage/>}/>
        <Route path="/videocall/:roomID" element={<UserVideoCallPage/>}/>
        <Route path="/chat" element={<Chat />} />
      </Route>

      {user.login === false && (
        <>
         
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<UserSignupPage />} />
          <Route path="/callback" element={<UserAuthCallbackPage />} />
          <Route path="/forgot" element={<UserForgotPage />} />
          <Route path="/" element={<LoginGateWayPage/>}/>
        
        </>
      )}
      {user.login && (
        <>
           <Route path="/" element={<LoginGateWayPage/>} />
          <Route path="/login" element={<Navigate to={"/home"} />} />
          <Route path="/signup" element={<Navigate to="/home" />} />
          <Route path="/forgot" element={<Navigate to="/home" />} />
          <Route path="/callback" element={<UserAuthCallbackPage />} />
          
         
        </>
      )}
       
    </Routes>
  );
}
