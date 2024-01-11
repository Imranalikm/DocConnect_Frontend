import { Rating } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import doctorImg from '../../assets/images/doctor.png'
import noResultImg from '../../assets/images/no-result.jpg'
import './doctorlist.css'



function DoctorList({ list, title,rating }) {

    const departmentColors = {
        'Cardiology': 'lightblue',
        'Nephrology': 'lightgreen',
        'General Medicine':'#fb6f92',
        'Dental Medicine':'#fcbf49',
        'Orthology':'#deaaff',
        'Pediatry':'#0d3b66',
        'Gynacology':'  '
      }
    return (
        <div>
            <Row className='d-flex justify-content-center' style={{borderRadius:'15px'}}>
                <h5 className='text-center' style={{marginTop:'10px',fontWeight:'bold'}}>{title ? title : "Doctors"}</h5>

            </Row>
            <Row className='d-flex justify-content-center mt-5 mb-5' style={{borderRadius:'15px'}}>
                {
                    list[0] ?
                    list.map((item, index) => {

                        return <Col md={4} xs={12} key={index} className="p-2">
                            <Link to={"/doctor/"+item._id}>
                                <div className="dr-container">
                                    <div className="dr-container-profile" style={{ backgroundImage: `url(${item.image.url})` }}>

                                    </div>
                                    <div className="dr-container-profile-desc">
                                        <h5 >{item.name}</h5>
                                        <Rating name="size-small" readOnly defaultValue={rating?.[item._id]} size="small" />
                                        <div className="desc">
                                        
                                            <span>{item.department.name}</span>
                                            <span>{item.hospitalId.name}</span>
                                            <b style={{ background: "linear-gradient(90deg, hsla(254, 68%, 9%, 1) 0%, hsla(269, 97%, 37%, 1) 33%, hsla(320, 77%, 55%, 1) 66%,  hsla(254, 68%, 9%, 1) 100%)" ,marginTop:'5px'}} >₹{item.fees}</b>
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