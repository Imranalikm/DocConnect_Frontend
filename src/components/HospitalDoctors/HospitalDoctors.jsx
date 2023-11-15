import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { RiMore2Fill, RiSearch2Line } from 'react-icons/ri';
 import {BiSolidEdit} from 'react-icons/bi'
 import {GrSchedulePlay} from 'react-icons/gr'
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress, setRef } from '@mui/material';
import HospitalSidebar from '../HospitalSidebar/HospitalSidebar';
import { useDispatch, useSelector } from 'react-redux'
import HospitalHeader from '../HospitalHeader/HospitalHeader';
import AddDoctor from '../Modals/AddDoctor/AddDoctor';
import { useEffect } from 'react';
import EditDoctor from '../Modals/EditDoctor/EditDoctor';
import { Link, useNavigate } from 'react-router-dom';

export default function HospitalDoctor() {
    const [refresh, setRefresh] = useState(false)
    const [editDoctorId, setEditDoctorId] = useState("")
    const [load, setLoad] = useState(false)
    const { hospital } = useSelector((state) => state)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [doctorList, setDoctorList] = useState([])
    const [clicked, setCLicked] = useState(false)
    const [name, setName]=useState("")
    const navigate= useNavigate()
    const handleClick = () => {
        setCLicked(!clicked)
    }
    const dispatch = useDispatch()

    const addDoctor = async () => {
        setShowModal(true)
    }
    const blockDoctor = (id) => {
        Swal.fire({
            title: 'Are you sure? Block',
            text: "Block this doctor!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '##a8a8a8',
            confirmButtonText: 'Yes, Block!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.patch("/hospital/doctor/block", { id });
                setRefresh(!refresh)
            }
        })
    }
    const unBlockDoctor = (id) => {
        Swal.fire({
            title: 'Are you sure? Unblock',
            text: "Unblock this doctor!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '##a8a8a8',
            confirmButtonText: 'Yes, Unblock!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.patch("/hospital/doctor/unblock", { id });
                setRefresh(!refresh)
            }
        })
    }
    useEffect(() => {
        (
            async function () {
                const { data } = await axios.get("/hospital/doctors?name="+name);
                if (!data.err) {
                    setDoctorList(data.doctors)
                }
            }
        )()
    }, [refresh, name]);

    return (
        <div className="admin-home">

            <HospitalHeader handleClick={handleClick} />
            <div className="admin-main">
                <HospitalSidebar page={'doctor'} clicked={clicked} />
                <Container fluid>

                    <div className="admin-container">
                        <div className="container-header">
                            <h5>Doctors</h5>
                            <div className="admin-search-box">
                                <input type="text" placeholder='Search...' value={name} onChange={(e)=>setName(e.target.value)} />
                                <button><RiSearch2Line/></button>
                            </div>
                            <button className='btn btn-dark' onClick={addDoctor}>Add Doctor</button>
                        </div>
                        <Table className='table-main' striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Qualification</th>
                                    <th>Fees</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    <th>Schedule</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    doctorList[0] ?
                                    doctorList.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link to={"/doctor/"+item._id}>
                                                {item.name}
                                                </Link>
                                                </td>
                                            <td>{item.email}</td>
                                            <td>{item.qualification}</td>
                                            <td>{item.fees}</td>
                                            <td>{item.block ? <span style={{ color: 'red', fontWeight: "bold" }}>Blocked</span> : <span style={{ color: 'green', fontWeight: "bold" }}>Active</span>}</td>
                                            <td><div className="button-column">
                    <button onClick={() => { setShowEditModal(true); setEditDoctorId(item._id) }}>
                        <BiSolidEdit size={30} color="red" />
                    </button>
                </div></td>
                <td><div className="button-column">
                    <button onClick={() => { navigate('/account/hospital/schedule/'+item._id) }}><GrSchedulePlay size={30} color="blue" /></button>
                </div></td>
                <td><div className="button-column">
                    {
                        item.block ?
                        <button onClick={() => { unBlockDoctor(item._id) }} style={{ backgroundColor: 'green', padding: '4px 8px', borderRadius: '.25rem', color: 'white' }}>Unblock</button>
                        :
                        <button onClick={() => { blockDoctor(item._id) }} style={{ backgroundColor: 'red', padding: '4px 8px', borderRadius: '.25rem', color: 'white' }}>Block</button>
                    }
                </div></td>
                                          
                                        </tr>
                                    })
                                    :
                                    <tr>
                                        <th colSpan={7} className='text-center'>No data found</th>
                                    </tr>
                                }

                            </tbody>
                        </Table>

                    </div>
                </Container>
            </div>
            {
                showModal &&
                <AddDoctor setShowModal={setShowModal} refresh={refresh} setRefresh={setRefresh} />
            }
            {
                showEditModal &&
                <EditDoctor setShowModal={setShowEditModal} id={editDoctorId} refresh={refresh} setRefresh={setRefresh} />
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={load}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>

    );
}