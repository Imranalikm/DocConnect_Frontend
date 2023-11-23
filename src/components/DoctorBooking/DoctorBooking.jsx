import axiosInstance from '../../axios/axiosInstance'
import * as React from 'react';
import { useState } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { RiMore2Fill, RiSearch2Line } from 'react-icons/ri';
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress, setRef } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoctorHeader from '../DoctorHeader/DoctorHeader';
import DoctorSidebar from '../DoctorSidebar/DoctorSidebar';
import ViewDoctorEmr from '../Modals/ViewDoctorEmr/ViewDoctorEmr';


export default function DoctorBooking() {
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)
    const [bookingList, setBookingList] = useState([])
    const [booking, setBooking]=useState({})
    const [showAddEmr,setShowAddEmr]=useState(false)
    const [clicked, setCLicked] = useState(false)
    const [name, setName]=useState("")
    const navigate= useNavigate()
    const handleClick = () => {
        setCLicked(!clicked) 
        
    }
    const handleShowEmr=(data)=>{
        setBooking(data)
        setShowAddEmr(true)
    }

    useEffect(() => {
        (
            async function () {
                const { data } = await axiosInstance.get("/doctor/bookings?name="+name);
                if (!data.err) {
                    setBookingList(data.bookings)
                }
            }
        )()
    }, [refresh, name]);

    return (
        <div className="admin-home">

            <DoctorHeader handleClick={handleClick} />
            <div className="admin-main">
                <DoctorSidebar page={'booking'} clicked={clicked} />
                <Container fluid>

                    <div className="admin-container">
                        <div className="container-header">
                            <h5>Doctors</h5>
                            <div className="admin-search-box">
                                <input type="text" placeholder='Search...' value={name} onChange={(e)=>setName(e.target.value)} />
                                <button><RiSearch2Line/></button>
                            </div>
                            {/* <button className='btn btn-dark' onClick={addDoctor}>Add Doctor</button> */}
                        </div>
                        <Table className='table-main' responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Patient Name</th>
                                    <th>Fees</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookingList.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {/* <Link to={"/doctor/"+item._id}> */}
                                                {item.user.name}
                                                {/* </Link> */}
                                                </td>
                                            <td>
                                                {/* <Link to={"/doctor/"+item._id}> */}
                                                {item.patientName}
                                                {/* </Link> */}
                                                </td>
                                            <td>{item.fees}</td>
                                            <td>{
                                            new Date(item.date).toLocaleDateString()
                                            }</td>
                                            <td>{new Date(item.time).toLocaleTimeString('en-US')}</td>
                                            <td>
                                                {item.status ? (item?.status==="upcoming" && new Date(item?.date) <= new Date() ? "Not Attended" : item?.status ) : 'pending'}
                                            </td>
                                            <td>
                                                <button className='btn btn-outline-dark btn-sm' onClick={()=>handleShowEmr(item)}>Show EMR</button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>

                    </div>
                </Container>
                {
                    showAddEmr && 
                <ViewDoctorEmr setShowAddEmr={setShowAddEmr} booking={booking} />
                }
            </div>
           

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={load}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>

    );
}