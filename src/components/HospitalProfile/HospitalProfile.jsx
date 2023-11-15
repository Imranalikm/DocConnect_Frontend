import { Col, Container, Row } from "react-bootstrap"
import React, { useEffect, useState } from 'react'

import { Avatar, Rating } from "@mui/material"
import '../DoctorProfile/doctorProfile.css'
import UserDepartmentRow from "../UserDepartmentRow/UserDepartmentRow"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import HospitalHeader from "../HospitalHeader/HospitalHeader"
import EditHospitalProfile from "../Modals/EditHospitalProfile/EditHospitalProfile"
import { getHospitalProfile } from "../../api/hospitalApi"

export default function HospitalProfile() {
    const id = useSelector((state)=>state.hospital.details._id)
    const [departmentList, setDepartmentList]=useState([])
    const [showModal, setShowModal]=useState(false)
    const [refresh, setRefresh]=useState(false)
    const [hospital, setHospital]=useState({
        image:{
            url:"https://www.medibhai.com/uploads/hospital_image/hospital-profile-default.jpg"
        }
    })
      useEffect(()=>{
        (
            async function(){
                const data= await getHospitalProfile();
                if(!data.err){
                    setHospital({
                        ...data.hospital,reviews: data.reviews, rating: data.rating
                    })
                    setDepartmentList(data.departments)
                }
            }
        )()
    },[refresh])
    return (
        <div className="user-main">

            <HospitalHeader />
            <Container>
            <div className="admin-container">
                   
                        <Row>
                            <Col sm={12} md={5}>
                                <div className="dr-profile-sec sec-1">
                                    <div className="dr-profile-img">
                                        <img src={hospital.image.url} alt="" />
                                    </div>

                                </div>

                            </Col>
                            <Col sm={12} md={7}>
                                <div className="dr-profile-sec sec-2">
                                    <div className="dr-profile-sec-row head">
                                        <h5>{hospital.name}</h5>
                                        {/* <p>Paediatrician</p> */}
                                    </div>

                                    <div className="dr-profile-sec-row">
                                        <h6>Place</h6>
                                        <b>{hospital.place}</b>
                                    </div>
                                    <div className="dr-profile-sec-row">
                                        <h6>Address</h6>
                                        <b>{hospital.address}</b>
                                    </div>
                                    <div className="dr-profile-sec-row">
                                        <h6>About</h6>
                                        <b>{hospital.about}</b>
                                    </div>
                                    <div className="dr-profile-sec-row button">
                                        <button onClick={()=>setShowModal(true)}>Edit</button>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    {/* </Container> */}
                    {/* <Container> */}
                        <Row>
                            <UserDepartmentRow hospitalId={id} hospitalWise={true} list={departmentList}/>
                        </Row>
                    {/* </Container> */}
                   
                </div>
            </Container>
            {
                showModal &&
                <EditHospitalProfile refresh={refresh} setRefresh={setRefresh} hospital={hospital} setShowModal={setShowModal} />
            }
        </div>
    )
}
