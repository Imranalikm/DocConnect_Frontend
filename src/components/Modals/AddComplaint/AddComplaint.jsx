import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import { addComplaint, getAllDoctors, getAllHospitals } from '../../../api/userApi'
import '../../../assets/css/modalForm.css'

function AddComplaint({ setShowModal }) {
    const [description, setDescription] = useState("")
    const [type, setType] = useState('doctor')
    const [errMessage, setErrMessage] = useState("")
    const [doctors, setDoctors]= useState([])
    const [hospitals, setHospitals]= useState([])
    const [complaintAgainst, setComplaintAgainst]= useState("")

    const dispatch = useDispatch()
    const [loading, setLoading] = useState({
        submit: false
    })
    useEffect(() => {
        (
            async function () {
                const doctorsData = await getAllDoctors();
                const hospitalData = await getAllHospitals();
                if(!doctorsData.err){
                    setDoctors(doctorsData.doctors)
                }
                if(!hospitalData.err){
                    setHospitals(hospitalData.hospitals)
                }

            }
        )()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading({ ...loading, submit: true })
        console.log("**************************************")
        if (validForm()) {
            const data = await addComplaint(complaintAgainst, type, description);
            console.log(data)
            if(!data.err){
                Swal.fire(
                    'Success!',
                    'Your complaint is registered with complaint Id "'+data.complaint.complaintId+'". We will contact you within 2 days.',
                    'success'
                )
                setShowModal(false)
            }

            setLoading({ ...loading, submit: false })
        }

    }
    function validForm() {
        if (description === "" || complaintAgainst==="") {
            return false
        }
        return true
    }


    return (
        <div className="modal-form">
            <form className="modal-container complaint" onSubmit={handleSubmit}>
                <div className="modal-form-row head">
                    <h5>Register Complaint</h5>
                </div>

                <div className="modal-form-row flex-column">
                    <label>Complaint against</label>

                    <Form.Select aria-label="Default select example" value={type} onChange={(e) => {setType(e.target.value); setComplaintAgainst("")}}>
                        <option value="doctor">Doctor</option>
                        <option value="hospital">Hospital</option>

                    </Form.Select>
                </div>
                {
                    type === 'doctor' &&
                    <div className="modal-form-row">

                        <Form.Select aria-label="Default select example" value={complaintAgainst} onChange={(e) => setComplaintAgainst(e.target.value)}>
                            <option value="">Select Doctor</option>
                            {
                                doctors.map((item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>
                                })
                            }

                        </Form.Select>
                    </div>
                }
                {
                    type === 'hospital' &&
                    <div className="modal-form-row">

                        <Form.Select aria-label="Default select example" value={complaintAgainst} onChange={(e) => setComplaintAgainst(e.target.value)}>
                            <option value="">Select Hospital</option>
                            {
                                hospitals.map((item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>
                                })
                            }

                        </Form.Select>
                    </div>
                }
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={description}
                        multiline
                        onChange={(e) => setDescription(e.target.value)}
                        minRows={10}
                        label="description" type="text" variant="outlined" fullWidth className='input' />
                </div>
                
                {errMessage &&
                    <div className="modal-form-row">
                        <b>{errMessage}</b>
                    </div>
                }
                <div className="modal-form-row">
                    <button type='button' onClick={() => setShowModal(false)} className='btn btn-outline-dark w-50'>close</button>
                    <button type='submit' disabled={!validForm()} className='btn btn-dark w-50'>
                        Register Complaint
                        <ClipLoader size={20} color="white" loading={loading.submit} />

                    </button>
                </div>

            </form>
        </div>
    )
}

export default AddComplaint