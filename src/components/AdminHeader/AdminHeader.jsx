import { Avatar } from '@mui/material'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { RiMenu2Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import './AdminHeader.css'
import logo from './../../assets/images/logoheader.jpg'
import avatar from './../../assets/images/avatar.webp'
import axiosInstance from '../../axios/axiosInstance'

function AdminHeader(props) {
  const dispatch = useDispatch()
  async function handleLogout(e) {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure to logout?',
      text: "logout from this account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#da0303',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Logout'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosInstance.get("/admin/auth/logout")
        
        dispatch({ type: "refresh" })
      }
    })
  }
  return (
    <div className="admin-header">
      <div className='d-flex align-items-center' style={{ gap: "10px" }}>

        <RiMenu2Fill onClick={props.handleClick} className={"sideBtn"} />
        <div className="admin-header-item sec-1" style={{ marginTop: "10px" }}>
        <img src={logo} alt="" style={{ width: '180px', height: 'auto', overflow:'hidden' }} />
          
        </div>
          <h5>Admin Panel</h5>
      </div>
      <div className="admin-header-item">
      
        <div className="profile-dropdown">

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Avatar alt="Admin" src={avatar} sx={{ width: 32, height: 32 }} />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ background: 'black'}}>
              <Dropdown.Item href="#" onClick={handleLogout} style={{color:'white',background: 'black'}} >Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

    </div>
  )
}

export default AdminHeader