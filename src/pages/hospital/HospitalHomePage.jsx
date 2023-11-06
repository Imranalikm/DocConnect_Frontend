import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
const HospitalHomePage = () => {
  const dispatch = useDispatch()
  async function handleLogout(e) {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure? logout',
      text: "logout from this account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get("/hospital/auth/logout")
        dispatch({ type: "refresh" })
      }
    })
  }
  return (
    <>
    <div>HospitalHomePage</div>
     <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default HospitalHomePage