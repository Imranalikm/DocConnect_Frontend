import React from 'react';
import './Sidebar.css';
import { RiHome2Line, RiBuilding4Line, RiHospitalLine, RiUserLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const sidebarItems = [
  { to: '/account/admin/', icon: <RiHome2Line />, text: 'Dashboard' },
  { to: '/account/admin/hospitals', icon: <RiBuilding4Line />, text: 'Hospitals' },
  { to: '/account/admin/hospitals/requests', icon: <RiHospitalLine />, text: 'Hospital Requests' },
  { to: '/account/admin/users', icon: <RiUserLine />, text: 'Users' },
];

function AdminSidebar({ page, clicked }) {
  return (
    <div className={`admin-sidebar ${clicked && 'open'}`}>
      <ul>
        {sidebarItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <li className={`admin-sideitems ${page === item.text.toLowerCase() && 'active'}`}>
              <div className='side'></div>
              <div className="admin-sideItem">
                {item.icon}
                <span>{item.text}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidebar;
