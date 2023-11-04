import React from 'react'
import { useState } from 'react'
import AdminHeader from './../AdminHeader/AdminHeader'
import './AdminHome.css'
import AdminSidebar from '../AdminSidebar/AdminSidebar';
const AdminHome = () => {
    const [clicked, setCLicked]=useState(false)
  const handleClick=()=>{
    setCLicked(!clicked)
  }
  return (
    <div>
        <div className="admin-home">
            <AdminHeader handleClick={handleClick}  />
            <div className="admin-main">
            <AdminSidebar page={'dashboard'} clicked={clicked} />
            </div>
        </div>
    </div>
  )
}

export default AdminHome