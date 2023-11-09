import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux
import { Col, Container, Row } from 'react-bootstrap';
import HospitalHeader from '../HospitalHeader/HospitalHeader'



function HospitalHome() {
  const [clicked, setClicked] = useState(false);

  const hospital = useSelector((state) => state.hospital.details); // Assuming you're using Redux

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="admin-home">
      <HospitalHeader handleClick={handleClick} />
      <div className="admin-main">
        {/* <HospitalSidebar page={'dashboard'} clicked={clicked} /> */}
        <div className="admin-container">
          {/* Place your content here */}
        </div>
      </div>
    </div>
  );
}

export default HospitalHome;
