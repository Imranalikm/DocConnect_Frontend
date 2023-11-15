import { Col, Container, Row } from "react-bootstrap"
import UserHeader from "../UserHeader/UserHeader"
import React, { useEffect, useState } from 'react'
import { Avatar, Rating, setRef, TextField } from "@mui/material"
import '../DoctorProfile/doctorProfile.css'
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

import {  getDoctor } from "../../api/userApi"
import Swal from "sweetalert2" 

function UserDoctor() {
    const { id } = useParams()
    const [refresh, setRefresh] = useState(false)
    const [doctorSchedule, setDoctorSchedule] = useState({})
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const [daysAvailable, setDaysAvailable] = useState([])
    const [showBookNow, setShowBookNow] = useState(false)
    const [doctor, setDoctor] = useState({
        image: {
            url: "https://bharajhospital.in/wp-content/uploads/2015/11/doctor-placeholder-500x500.jpg"
        },
        department: {
            name: " "

        },
        hospitalId: {
            name: ""
        }
    })
    const navigate= useNavigate()
    
    useEffect(() => {
        (
            async function () {
                const data = await getDoctor(id)
                if (!data.err) {
                    setDoctor({ ...data.doctor })
                    
                }
               
                const { data: scheduleData } = await axios.get("/user/doctor/schedule/" + id);
                console.log(scheduleData)
                if (!scheduleData.err) {
                    let n = 0;
                    let date = new Date()
                    let tempDaysAvailable = []
                    while (n < 9) {
                        date = new Date(new Date().setDate(new Date(date).getDate() + 1));
                        console.log(date)
                        let day = new Date(date).getDay();
                        console.log(scheduleData.schedule[days[day]])
                        if (scheduleData.schedule[days[day]][0]) {
                            console.log( date,scheduleData.schedule[days[day]])
                            const { data } = await axios.post("/user/check-time", {
                                date,
                                schedule: scheduleData.schedule[days[day]]
                            })
                            console.log(data)
                            if (!data.err) {
                                tempDaysAvailable.push({
                                    ...data.result
                                })
                            }
                        }
                        n++;
                    }
                    console.log(tempDaysAvailable)
                    setDaysAvailable([...tempDaysAvailable])
                }
            }
        )()
    }, [refresh])


    return (
        <div className="user-main">

            <UserHeader />
            <Container>
                <div className="admin-container">
                   
                    <Row>
                        <Col sm={12} md={5}>
                            <div className="dr-profile-sec sec-1">
                                <div className="dr-profile-img">
                                    <img src={doctor.image.url} alt="" />
                                </div>

                            </div>

                        </Col>
                        <Col sm={12} md={7}>
                            <div className="dr-profile-sec sec-2">
                                <div className="dr-profile-sec-row head">
                                    <h5>{doctor.name}</h5>
                                    <p>{doctor.department.name.toUpperCase()} Department</p>
                                </div>

                                <div className="dr-profile-sec-row">
                                    <h6>Fees</h6>
                                    <b>₹{doctor.fees}</b>
                                </div>
                                <div className="dr-profile-sec-row">
                                    <h6>Qualification</h6>
                                    <b>{doctor.qualification}</b>
                                </div>
                                <div className="dr-profile-sec-row">
                                    <h6>Appointments Available</h6>
                                    {
                                        daysAvailable[0] ?
                                        <div className="doctor-time-list">
                                        {
                                            daysAvailable.map((item, index) => {
                                                return <div className="time-box" key={index}>
                                                    {new Date(item.date).toLocaleDateString()}
                                                </div>
                                            })
                                        }
                                    </div>
                                        :
                                        "No appointments available"

                                    }

                                </div>
                                <div className="dr-profile-sec-row button">
                                    <button >Chat</button>
                                    <button onClick={() => setShowBookNow(true)} disabled={!daysAvailable[0]} >Book Now</button>
                                </div>
                            </div>

                        </Col>
                    </Row>
                    
                    <Row>
                        <Col sm={12} md={5}>
                            <div className="dr-profile-sec sec-1">
                                <div className="dr-profile-sec-row">
                                    <h6>Email</h6>
                                    <p>{doctor.email}</p>
                                </div>
                                <div className="dr-profile-sec-row">
                                    <h6>Hospital</h6>
                                    <p>{doctor.hospitalId.name}</p>
                                </div>
                                <div className="dr-profile-sec-row">
                                    <h6>About</h6>
                                    <p>{doctor.about}</p>
                                </div>

                            </div>

                        </Col>
                        
                        {/* {
                            showBookNow &&
                            <BookNow daysAvailable={daysAvailable} doctor={doctor} setShowBookNow={setShowBookNow} refresh={refresh} setRefresh={setRefresh} />
                        } */}

                    </Row>
                   
                </div>
            </Container>
           

        </div>
    )
}

export default UserDoctor