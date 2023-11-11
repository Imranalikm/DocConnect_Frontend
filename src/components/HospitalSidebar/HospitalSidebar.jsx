import React from 'react'
import '../AdminSidebar/Sidebar.css'
import { Link } from 'react-router-dom';
import {BiSolidDashboard} from 'react-icons/bi'
import {FaUserDoctor} from 'react-icons/fa6'
import {AiOutlineApartment} from 'react-icons/ai'


function HospitalSidebar({ page, clicked }) {
  return (
    <div className={`admin-sidebar ${clicked && 'open'}`}>
      <ul>
        <Link to="/account/hospital/">
          <li className={`admin-sideitems ${page == "dashboard" && 'active'}`}>
           
            <div className="admin-sideItem" style={{marginTop:'8px'}}>

              <BiSolidDashboard className='icon' />
              <span>Dashboard</span>
            </div>
          </li>
        </Link>
        <Link to="/account/hospital/doctor">

          <li className={`admin-sideitems ${page == "doctor" && 'active'}`}>
           
            <div className="admin-sideItem">

              <FaUserDoctor className='icon' />
              <span>Doctors</span>
            </div>
          </li>
        </Link>
       
        <Link to="/account/hospital/department">

          <li className={`admin-sideitems ${page == "department" && 'active'}`}>
            
            <div className="admin-sideItem">

              <AiOutlineApartment className="icon" />
              <span>Department</span>
            </div>
          </li>
        </Link>
        
        


      </ul>

    </div>
  )
}

export default HospitalSidebar