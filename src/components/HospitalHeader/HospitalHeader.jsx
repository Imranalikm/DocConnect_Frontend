import { Avatar } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { RiMenu2Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import logo from './../../assets/images/logoheader.jpg'
import '../AdminHeader/AdminHeader.css'

function HospitalHeader(props) {
  const dispatch = useDispatch()
  const navigate= useNavigate()
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
    <div className="admin-header">
      <div className='d-flex align-items-center' style={{gap:"10px"}}>

      <RiMenu2Fill onClick={props.handleClick} className={"sideBtn"} />
      <div className="admin-header-item sec-1" style={{ marginTop: "10px" }}>
        <img src={logo} alt="" style={{ width: '180px', height: 'auto', overflow:'hidden' }} />
          
        </div>
          <h5>Hospital Panel</h5>
      </div>
      <div className="admin-header-item">
        <div className="profile-dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={()=>navigate("/account/hospital/profile")}>Profile</Dropdown.Item>
              <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>

    </div>
  )
}

export default HospitalHeader