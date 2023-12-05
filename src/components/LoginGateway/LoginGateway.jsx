import React from 'react';
import { Link } from 'react-router-dom';
import userImage from '../../assets/images/user.png'; // Replace with the actual path to your user image
import hospitalImage from '../../assets/images/hspi.png' // Replace with the actual path to your hospital image
import doctorImage from '../../assets/images/doctr.png'; // Replace with the actual path to your doctor image
import './LoginGateway.css'; // Add your CSS styles for responsiveness
import logo from './../../assets/images/logoheader.jpg'
const LoginGateway = () => {
  return (
    <div className="login-gateway">
       <img src={logo} alt="" style={{ width: '500px', height: 'auto', overflow:'hidden',marginBottom:'15px' }} />
      <div className="gateway">
      <div className="user-type">
        <Link to="/login" className="user-link">
          <div className="user-type-card">
            <img className='imagegate' src={userImage} alt="User" />
            <h3>User Login</h3>
            {/* Add any additional user-related content or styling here */}
          </div>
        </Link>
      </div>
      <div className="hospital-type">
        <Link to="/account/hospital/login" className="hospital-link">
          <div className="user-type-card">
            <img className='imagegate' src={hospitalImage} alt="Hospital" />
            <h3>Hospital Login</h3>
            {/* Add any additional hospital-related content or styling here */}
          </div>
        </Link>
      </div>
      <div className="doctor-type ">
        <Link to="/account/doctor/login" className="doctor-link">
          <div className="user-type-card">
            <img className='imagegate' src={doctorImage} alt="Doctor" />
            <h3>Doctor Login</h3>
            {/* Add any additional doctor-related content or styling here */}
          </div>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default LoginGateway;
