import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import DoctorHeader from '../DoctorHeader/DoctorHeader';
import DoctorSideBar from '../DoctorSidebar/DoctorSidebar';

import './doctorProfile.css'

import EditDoctorProfile from '../Modals/EditDoctorProfile/EditDoctorProfile';

import { getDoctorProfile } from '../../api/doctorApi';

export default function DoctorProfile() {
    const [value, setValue]=useState('')
    const [showModal, setShowModal]=useState(false)
    const [refresh, setRefresh]=useState(false)
    const [doctor, setDoctor]=useState({
        image:{
            url:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        }
    })

    useEffect(() => {
        (
            async function(){
                const data =await getDoctorProfile();
                if(!data.err){
                    setDoctor({...data.doctor})
                }
            }

        )()
        
    }, [refresh]);

    return (
        <div className="admin-home" >
            <DoctorHeader />
            <div className="admin-main" >
                <DoctorSideBar page={'profile'} />
                <div className="admin-container" >
                    <Container  >
                        <h5>Profile</h5>
                    </Container>
                    <Container fluid>
                        <Row style={{borderRadius:'20px',marginLeft:'15px',marginRight:'15px'}}>
                            <Col sm={12} md={4}>
                                <div className="dr-profile-sec sec-1">
                                    <div className="dr-profile-img">
                                        <img src={doctor.image.url} alt="" />
                                    </div>
                                  

                                </div>

                            </Col>
                            <Col sm={12} md={8}>
                                <div className="dr-profile-sec sec-2">
                                    <div className="dr-profile-sec-row head">
                                        <h5>{doctor.name}</h5>
                                        <p>{doctor.department && doctor.department.name.toUpperCase()} Department</p>
                                    </div>

                                    <div className="dr-profile-sec-row">
                                        <h6>Fees</h6>
                                        <b>₹{doctor.fees}</b>
                                    </div>
                                    <div className="dr-profile-sec-row">
                                        <h6>About</h6>
                                        <p>{doctor.about}</p>
                                    </div>
                                   
                                </div>
                                <button className='mt-3 btn btn-dark' onClick={()=>setShowModal(true)}>Edit Profile Picture</button>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row  style={{borderRadius:'20px',marginLeft:'15px',marginRight:'15px'}}>
                            <Col sm={12} md={4}>
                            <div className="dr-profile-sec sec-1">
                                <div className="dr-profile-sec-row">
                                    <h6>Email</h6>
                                    <p>{doctor.email}</p>
                                </div>
                                <div className="dr-profile-sec-row">
                                    <h6>Hospital</h6>
                                    <p>{doctor.hospitalId && doctor.hospitalId.name}</p>
                                </div>
                                <div className="dr-profile-sec-row">
                                    <h6>About</h6>
                                    <p>{doctor.about}</p>
                                </div>

                            </div>

                            </Col>
                           
                        </Row>
                    </Container>

                </div>
            </div>
                    {
                        showModal &&
                    <EditDoctorProfile setShowModal={setShowModal} refresh={refresh} setRefresh={setRefresh}  />
                    }
            
        </div>
    )
}
