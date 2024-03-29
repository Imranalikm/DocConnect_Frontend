import axiosInstance from '../../axios/axiosInstance'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
// import HospitalReApply from '../../Modal/HospitalReApply/HospitalReApply';
import wave from '../../assets/images/wave.png'
function HospitalApproval({rejected, hospital}) {
    const dispatch = useDispatch()
    const [showModal, setShowModal]=useState(false)
    async function handleLogout(){
        let {data}=await axiosInstance.get("/hospital/auth/logout");
        dispatch({type:"refresh"})
    }
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
  <div className="col-md-4">
    <div className="border border-3 border-success" />
    <div className="card  bg-white shadow p-5">
      <div className="mb-4 text-center">
        
      </div>
      <div className="text-center">
        {
          rejected ?
          <h1>Account Registration failed !</h1>
          :
          <h1>Thank You !</h1>
        }
        {
          rejected ?
          <p>Sorry, Your account registration rejected. Please edit your details and try again</p>
          :
          <p>Your Account has under approval process. We Will Inform You once the account got Approved</p>

        }
        {
          rejected ?
          <>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          <button className="btn btn-dark ms-1" onClick={()=>setShowModal(true)}>Re-Apply</button>
          </>
          :
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>

        }
        <img src={wave} alt="" />
      </div>
    </div>
  </div>
  {/* {
    showModal &&
    <HospitalReApply hospital={hospital} setShowModal={setShowModal} />
  } */}
</div>

  )
}

export default HospitalApproval