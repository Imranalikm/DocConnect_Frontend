import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
// import HospitalReApply from '../../Modal/HospitalReApply/HospitalReApply';

function HospitalApproval({rejected, hospital}) {
    const dispatch = useDispatch()
    const [showModal, setShowModal]=useState(false)
    async function handleLogout(){
        let {data}=await axios.get("/hospital/auth/logout");
        dispatch({type:"refresh"})
    }
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
  <div className="col-md-4">
    <div className="border border-3 border-primary" />
    <div className="card  bg-white shadow p-5">
      <div className="mb-4 text-center">
        {
          !rejected &&
        <svg xmlns="http://www.w3.org/2000/svg" className="text-success" width={75} height={75} fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
        </svg>
        }
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