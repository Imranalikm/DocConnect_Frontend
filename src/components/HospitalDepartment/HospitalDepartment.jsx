import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { RiMore2Fill, RiSearch2Line } from 'react-icons/ri';
import {BiSolidEdit} from 'react-icons/bi'
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress } from '@mui/material';
import HospitalSidebar from '../HospitalSidebar/HospitalSidebar';
import { useDispatch, useSelector } from 'react-redux'
import HospitalHeader from '../HospitalHeader/HospitalHeader';
import { useEffect } from 'react';

export default function HospitalDepartment() {
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)
    const { hospital } = useSelector((state) => state)
    const [departmentList, setDepartmentList] = useState([])
    const dispatch = useDispatch()
    const [clicked, setCLicked] = useState(false)
    const [name, setName]=useState("")

    const handleClick = () => {
        setCLicked(!clicked)
    }

    useEffect(() => {
        (
            async function () {
                const { data } = await axios.get("/hospital/departments?name="+name)
                if (!data.err) {
                    setDepartmentList(data.departments)
                }
            }
        )()
    }, [refresh, name])


    const addDepartment = async () => {
        const { value: department } = await Swal.fire({
            title: 'Add Department',
            input: 'text',
            inputLabel: 'Enter Department name',
            inputPlaceholder: 'Enter your department name',
            confirmButtonText: 'Add',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })

        if (department) {
            let { data } = await axios.post("/hospital/department", { department });
            if (!data.err) {
                Swal.fire(
                    'Success!',
                    'Successfully Added',
                    'success'
                )
            } else {
                Swal.fire(
                    'Failed!',
                    data.message,
                    'error'
                )

            }
            setRefresh(!refresh)
        }
    }
    const editDepartment = async (id, name) => {
        const { value: department } = await Swal.fire({
            title: 'Add Department',
            input: 'text',
            inputValue:name,
            inputLabel: 'Enter Department name',
            inputPlaceholder: 'Enter your department name',
            confirmButtonText: 'Edit',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })

        if (department) {
            let { data } = await axios.patch("/hospital/department", { department, id });
            if (!data.err) {
                Swal.fire(
                    'Success!',
                    'Successfully Added',
                    'success'
                )
            } else {
                Swal.fire(
                    'Failed!',
                    data.message,
                    'error'
                )

            }
            setRefresh(!refresh)
        }
    }
    return (
        <div className="admin-home">

            <HospitalHeader handleClick={handleClick} />
            <div className="admin-main">
                <HospitalSidebar page={'department'} clicked={clicked} />
                <Container fluid>

                    <div className="admin-container">
                        <div className="container-header">
                            <h5>Departments</h5>
                            <div className="admin-search-box">
                                <input type="text" placeholder='Search...' value={name} onChange={(e)=>setName(e.target.value)} />
                                <button><RiSearch2Line/></button>
                            </div>
                            <button className='btn btn-dark' onClick={addDepartment}>Add Department</button>
                        </div>
                        <Table className='table-main' striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departmentList[0] ?
                                    departmentList.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td className='option-btn'>
    {/* Replace the Dropdown with a button for Edit */}
    <button className="btn btn-secondary" onClick={(e) => { editDepartment(item._id, item.name) }}>
        <BiSolidEdit  size={30}      // Set the size to 30 or your preferred size
        color="red"/>
    </button>
</td>

                                        </tr>
                                    })
                                    :
                                    <tr>
                                        <th colSpan={3} className='text-center'>no data found</th>
                                    </tr>
                                }

                            </tbody>
                        </Table>

                    </div>
                </Container>
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