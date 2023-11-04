import React from 'react'
import UserHeader from '../UserHeader/UserHeader'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./UserHome.css"
import banner from "./../../assets/images/banner.jpg"

const UserHome = () => {
  return (
    <>
    
       <UserHeader></UserHeader>
       <Row className='row'>
         
            <Container>
            <div className="div ">
        <img
          loading="lazy"
          srcSet={banner}
          className="img"
        />
        <div className="div-2">Your Health, Your Choice, Our App.</div>
        
        <div className="div-4">
          <Link to='/search' className='link'>Take Appointment</Link>
          </div>
      </div>
            
            </Container>
        
        </Row>
    
   

    </>
  )
}

export default UserHome