import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../axios/axiosInstance.js";
import ProtectedUserRoutes from "../utils/ProtectedUserRoutes";
import UserDepartmentPage from "../pages/user/UserDepartmentPage";
import LoginPage from "../pages/user/UserLoginPage";
import UserSignupPage from "../pages/user/UserSignupPage";
import UserHospitalPage from "../pages/user/UserHospitalPage";
import UserDoctorPage from "../pages/user/UserDoctorPage";
import UserAuthCallbackPage from "../pages/user/UserAuthCallbackPage.jsx";
import UserVideoCallPage from "../pages/user/UserVideoCallPage.jsx";
import LoginGateWayPage from "../pages/user/LoginGateWayPage.jsx";
import Chat from "../components/Chat/MainChat/Chat.jsx";
import UserForgotPage from "../pages/user/UserForgotPage.jsx";
import Loading from "../components/Loading/Loading.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";


const LazyHome = React.lazy(() => import("../pages/user/UserHomePage.jsx"));
const LazyUserProfile = React.lazy(() =>
  import("../pages/user/UserProfilePage")
);
const LazyUserDocbot = React.lazy(() =>
  import("../pages/user/userDocBotPage.jsx")
);
const LazyUserSearch = React.lazy(() => import("../pages/user/UserSearchPage"));



export default function UserRoutes() {
  const { refresh, user } = useSelector((state) => state);
  const dispatch = useDispatch();

useEffect(() => {
  (async function () {
    try {
      
      let { data } = await axiosInstance.get("/user/auth/check");
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, details: data.user },
      });
    } catch (error) {
      console.error("Error during user authentication check:", error);
      dispatch({
        type: "user",
        payload: { login: false, details: null },
      });
    }
  })();
}, [refresh, user]);


  return (
    <Routes>
      <Route element={<ProtectedUserRoutes user={user} />}>
        <Route
          path="/home"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyHome />
            </React.Suspense>
          }
        />
        <Route path="/department/:id" element={<UserDepartmentPage />} />

        <Route
          path="/search"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyUserSearch />
            </React.Suspense>
          }
        />

        <Route path="/hospital/:id" element={<UserHospitalPage />} />
        <Route path="/doctor/:id" element={<UserDoctorPage />} />
        <Route
          path="/profile"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyUserProfile />
            </React.Suspense>
          }
        />
        <Route
          path="/docbot"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyUserDocbot />
            </React.Suspense>
          }
        />
        <Route path="/videocall/:roomID" element={<UserVideoCallPage />} />
        <Route path="/chat" element={<Chat />} />
      </Route>

      {user.login === false && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<UserSignupPage />} />
          <Route path="/callback" element={<UserAuthCallbackPage />} />
          <Route path="/forgot" element={<UserForgotPage />} />
          <Route path="/" element={<LoginGateWayPage />} />
        </>
      )}
      {user.login && (
        <>
          <Route path="/" element={<LoginGateWayPage />} />
          <Route path="/login" element={<Navigate to={"/home"} />} />
          <Route path="/signup" element={<Navigate to="/home" />} />
          <Route path="/forgot" element={<Navigate to="/home" />} />
          <Route path="/callback" element={<UserAuthCallbackPage />} />
        </>
      )}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}





