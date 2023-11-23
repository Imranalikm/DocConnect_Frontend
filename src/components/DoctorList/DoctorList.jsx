import { Rating } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import doctorImg from '../../assets/images/doctor.png'
import noResultImg from '../../assets/images/no-result.jpg'
import './doctorlist.css'



function DoctorList({ list, title }) {

    const departmentColors = {
        'Cardiology': 'lightblue',
        'Nephrology': 'lightgreen',
        'General Medicine':'#fb6f92',
        'Dental Medicine':'#fcbf49',
        'Orthology':'#deaaff'
      }
    return (
        <div>
            <Row className='d-flex justify-content-center'>
                <h5 className='text-center'>{title ? title : "Doctors"}</h5>

            </Row>
            <Row className='d-flex justify-content-center mt-5'>
                {
                    list[0] ?
                    list.map((item, index) => {

                        return <Col md={4} xs={12} key={index} className="p-2">
                            <Link to={"/doctor/"+item._id}>
                                <div className="dr-container">
                                    <div className="dr-container-profile" style={{ backgroundImage: `url(${item.image.url})` }}>

                                    </div>
                                    <div className="dr-container-profile-desc">
                                        <h5>{item.name}</h5>
                                        
                                        <div className="desc">
                                            
                                            <span>{item.department.name}</span>
                                            <span>{item.hospitalId.name}</span>
                                            <b style={{ backgroundColor: departmentColors[item.department.name] }} >₹{item.fees}</b>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    })
                    :
                    <div className='no-result-container'>
                        <img src={noResultImg} alt="" />
                    </div>
                }



            </Row>
        </div>
    )
}

export default DoctorList