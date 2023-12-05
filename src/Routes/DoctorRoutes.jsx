import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../axios/axiosInstance'
import DoctorLoginPage from "../pages/doctor/DoctorLoginPage";
import ProtectedDoctorRoutes from "../utils/ProtectedDoctorRoutes"
import DoctorHomePage from "../pages/doctor/DoctorHomePage"
import DoctorProfilePage from "../pages/doctor/DoctorProfilePage"
import DoctorBookingPage from "../pages/doctor/DoctorBookingPage"
import DoctorSchedulePage from "../pages/doctor/DoctorSchedulePage"
import DoctorVideoCallPage from "../pages/doctor/DoctorVideoCallPage";
import DoctorChat from "../components/Chat/DoctorChat/DoctorChat"


export default function DoctorRoutes() {
  const { refresh, doctor } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data: doctorData } = await axiosInstance.get("/doctor/auth/check");
      dispatch({
        type: "doctor",
        payload: { login: doctorData.loggedIn, details: doctorData.doctor }
      });
    })();
  }, [refresh]);
  return (
    <Routes>
      <Route element={<ProtectedDoctorRoutes doctor={doctor} />}>
        <Route path="/" element={<DoctorHomePage />} />
        <Route path="/profile" element={<DoctorProfilePage />} />
        <Route path="/booking" element={<DoctorBookingPage />} />
        <Route path="/schedule" element={<DoctorSchedulePage />} />
        <Route path="/videocall/:roomID/:userEmail" element={<DoctorVideoCallPage/>}/>
        <Route path="/chat" element={<DoctorChat />} />
      </Route>


      {doctor.login === false && (
        <>
          <Route path="/login" element={<DoctorLoginPage />} />
          
        </>
      )}
      
      {doctor.login && (
        <>
          <Route path="/login" element={<Navigate to="/account/doctor/" />} />
          
        </>
      )}
    </Routes>
  );
}
