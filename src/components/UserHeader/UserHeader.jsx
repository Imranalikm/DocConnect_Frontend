import React, { useState } from 'react'
import { Avatar, Button, getFormLabelUtilityClasses, Menu, MenuItem } from '@mui/material'
import './UserHeader.css'
import { Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from "./../../../src/assets/images/logoheader.jpg"
import Swal from 'sweetalert2'
function UserHeader({fullWidth}) {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.details)
  async function handleLogout() {
    
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
        const { data } = await axios.get("user/auth/logout")
        dispatch({ type: "refresh" })
      }
    })
  }

  return (
    <div className="header-main">
      <Container fluid={fullWidth ? true : false} >
        <div className="user-header ">
          <div className="user-header-item">

            <Link to="/" className='link'>
            <img src={logo} alt="" style={{ width: '180px', height: 'auto', overflow:'hidden' }} />

              
            </Link>
          </div>
          <div className="user-header-item">
           <Link to="/" className='link'><span>Home</span></Link> 
           <Link to="/chat" className='link'><span>Chat</span></Link> 
           <Link to="/profile" className='link'><span>Bookings</span></Link> 
           
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => { setOpen(true); setAnchorEl(e.currentTarget); }}
            >
              <Avatar alt="djhsk sjdhkjs" src={(user && user.picture) ? user.picture.replace('=s96-c', '') : "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"} sx={{ width: 32, height: 32 }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setOpen(false)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => navigate("/profile")} >Profile</MenuItem>
              
              <MenuItem onClick={handleLogout} >Logout</MenuItem>
            </Menu>
          </div>

        </div>
      </Container>
      
    </div>

  )

}

export default UserHeader