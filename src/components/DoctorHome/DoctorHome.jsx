import { Button, Chip } from '@mui/material';
import axiosInstance from '../../axios/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Container, Dropdown, Row, Table } from 'react-bootstrap';
import { RiMore2Fill } from 'react-icons/ri';
import AddEMR from '../Modals/AddEMR/AddEMR';
import DoctorHeader from '../DoctorHeader/DoctorHeader';
import DoctorSideBar from '../DoctorSidebar/DoctorSidebar';
import notFoundImg from '../../assets/images/no-result.jpg'
import formatDate from '../../helpers/dateFormat'


function DoctorHome() {
    const [bookingList, setBookingList] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [booking, setBooking] = useState({})
    const [showAddEmr, setShowAddEmr] = useState(false)
    useEffect(() => {
        (
            async function () {
                const { data } = await axiosInstance.get("/doctor/booking/today");
                if (!data.err) {
                    setBookingList(data.bookings)
                }
            }
        )()
    }, [refresh]);

    const showEmr = (data) => {
        setBooking(data);
        setShowAddEmr(true)
    }

    return (
        <div className="admin-home">
            <DoctorHeader />
            <div className="admin-main">
                <DoctorSideBar page={'home'} />
                <div className="admin-container">

                    <Container fluid>

                        <div className="user-booking-container">
                            <h4 className=''>Todays Booking</h4>
                            {
                                bookingList[0] ?

                                    bookingList.map((item, index) => {
                                        return <div className="user-booking-item" key={index} onClick={() => showEmr(item)}>
                                            <div className="ub-dr-desc">
                                                <div className="ub-dr-desc-item">
                                                    <b>{item.patientName}</b>
                                                    <div className="mt-2">
                                                        <p>Date : </p>
                                                        <p> {formatDate(item.date)}</p>
                                                    </div>
                                                    <div>
                                                        <p>Time : </p>
                                                        <p> {new Date(item.time).toLocaleTimeString('en-US')}</p>
                                                    </div>
                                                    <div>
                                                        <p>Token : </p>
                                                        <p> {item.token}</p>
                                                    </div>
                                                </div>
                                                <div className="booking-status d-flex flex-wrap" style={{gap:"10px", height:"100%"}}>
                                                    <Chip label={item.status} color="secondary" variant="outlined" />
                                                    <Button variant='contained' className='bg-dark'>Edit EMR</Button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                    :
                                    <Row className='d-flex justify-content-center flex-column align-items-center'>
                                        <img src={notFoundImg} style={{ maxHeight: "300px",width:"400px", maxWidth: "90%" }} alt="" />
                                        <h6 className='text-center'>No Appointments</h6>
                                    </Row>
                            }

                        </div>
                    </Container>


                </div>
            </div>
            {
                showAddEmr &&
                <AddEMR booking={booking} setShowAddEmr={setShowAddEmr} refresh={refresh} setRefresh={setRefresh} />
            }
           
        </div>
    )
}

export default DoctorHome