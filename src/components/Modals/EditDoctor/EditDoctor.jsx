import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axiosInstance from '../../../axios/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'
import '../../../assets/css/modalForm.css'

function EditDoctor({ setShowModal, setRefresh, refresh, id }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [department, setDepartment] = useState("")
    const [errMessage, setErrMessage] = useState("")
    const [qualification, setQualification] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [about, setAbout] = useState("")
    const [fees, setFees] = useState("")
    const [departmentList, setDepartmentList] = useState([])

    const [loading, setLoading] = useState({
        submit: false
    })
    useEffect(() => {
        (
            async function () {
                const { data: doctorData } = await axiosInstance.get("/user/doctor/" + id);
                console.log(doctorData);
                if (!doctorData.err) {
                    setName(doctorData.doctor.name)
                    setEmail(doctorData.doctor.email)
                    setDepartment(doctorData.doctor.department._id)
                    setQualification(doctorData.doctor.qualification)
                    if (doctorData.doctor.specialization) {
                        setSpecialization(doctorData.doctor.specialization)
                    }
                    setAbout(doctorData.doctor.about)
                    setFees(doctorData.doctor.fees)
                }

                const { data } = await axiosInstance.get("/hospital/departments")
                if (!data.err) {
                    setDepartmentList(data.departments)
                }
            }
        )();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading({ ...loading, submit: true })
        if (validForm()) {
            const { data } = await axiosInstance.patch("/hospital/doctor", {
                email, name, department, qualification, specialization, fees, about, _id: id
            })
            if (data.err) {
                setErrMessage(data.message)
            } else {
                setRefresh(!refresh)
                setShowModal(false)
            }
            setLoading({ ...loading, submit: false })
        }

    }
    function validForm() {
        if (email.trim() === "" || qualification.trim() === "" || specialization.trim() === "" || about.trim() === "" || fees.toString().trim() === "" || name.trim() === "" || department.trim() === "") {
            return false
        }
        return true
    }


    return (
        <div className="modal-form">
            <form className="modal-container" onSubmit={handleSubmit}>
                <div className="modal-form-row head">
                    <h5>Edit Doctor</h5>
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={name} onChange={(e) => setName(e.target.value)} label="Name" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={qualification} onChange={(e) => setQualification(e.target.value)} label="Qualification" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={specialization} onChange={(e) => setSpecialization(e.target.value)} label="Specialization" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={about} onChange={(e) => setAbout(e.target.value)} label="About" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={fees} onChange={(e) => setFees(e.target.value)} label="Fees" type="number" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                  
                    <Form.Select aria-label="Default select example" value={department} onChange={(e) => setDepartment(e.target.value)}>
                        <option value="">Select Department</option>
                        {
                            departmentList.map((item, index) => {
                                return <option value={item._id}>{item.name}</option>
                            })
                        }
                    </Form.Select>
                </div>
                {errMessage &&
                    <div className="modal-form-row">
                        <b>{errMessage}</b>
                    </div>
                }
                <div className="modal-form-row">
                    <button type='button' onClick={() => setShowModal(false)} className='btn btn-outline-dark w-50'>close</button>
                    <button type='submmit' disabled={!validForm()} className='btn btn-dark w-50'>
                        Edit
                        <ClipLoader size={20} color="white" loading={loading.submit} />

                    </button>
                </div>

            </form>
        </div>
    )
}

export default EditDoctor