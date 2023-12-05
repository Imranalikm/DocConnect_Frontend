
import React from 'react'
import './Sidebar.css'
import { RiFileWarningLine, RiHome2Line, RiHospitalLine, RiRefundLine, RiUserLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import {BiSolidDashboard} from 'react-icons/bi'
import {BsHospital} from 'react-icons/bs'
import {HiUsers} from 'react-icons/hi2'



function AdminSidebar({page, clicked}) {
  return (
    <div className={`admin-sidebar ${clicked && 'open'}`}>
          <ul>
              <Link to="/account/admin/">
            <li className={`admin-sideitems ${page=="dashboard" && 'active'}`}>
              
              <div className="admin-sideItem" style={{marginTop:'8px'}}>

                <BiSolidDashboard className='icon' />
                <span>Dashboard</span>
              </div>
            </li>
              </Link>
              
            
            <Link to="/account/admin/hospitals">

            <li className={`admin-sideitems ${page=="hospital" && 'active'}`}>

              
              <div className="admin-sideItem">

                <BsHospital className='icon' />
                <span>Hospitals</span>
              </div>
            </li>
            </Link>
           
            <Link to="/account/admin/hospitals/requests">

            <li className={`admin-sideitems ${page=="hospital request" && 'active'}`}>

              
              <div className="admin-sideItem">

                <RiHospitalLine className='icon' />
                <span>Hospital Requests</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/users">

            <li className={`admin-sideitems ${page=="user" && 'active'}`}>

              
              <div className="admin-sideItem">

                <HiUsers className='icon' />
                <span>Users</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/refunds">

            <li className={`admin-sideitems ${page=="refund" && 'active'}`}>

              
              <div className="admin-sideItem">

                <RiRefundLine className='icon' />
                <span>Refunds</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/complaints">

            <li className={`admin-sideitems ${page=="complaints" && 'active'}`}>

              
              <div className="admin-sideItem">

                <RiFileWarningLine className='icon' />
                <span>Complaints</span>
              </div>
            </li>
            </Link>
            

          </ul>

        </div>
  )
}

export default AdminSidebar