import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, {  useState } from 'react'
import { Form } from 'react-bootstrap'
import '../../../assets/css/modalForm.css'

export default function ViewComplaint({ setShowModal, complaint }) {
    const [loading, setLoading] = useState({
        submit: false
    })
    return (
        <div className="modal-form">
            <form className="modal-container complaint">
                <div className="modal-form-row head">
                    <h5>Register Complaint</h5>
                </div>

                <div className="modal-form-row flex-column">
                    <label>Complaint against</label>
                    <Form.Select aria-label="Default select example" value={complaint.type} disabled>
                        <option value="doctor">Doctor</option>
                        <option value="hospital">Hospital</option>

                    </Form.Select>
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={complaint.userId.name}
                        readOnly
                        label="User Name" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={complaint.userId.email}
                        readOnly
                        label="User Email" type="text" variant="outlined" fullWidth className='input' />
                </div>
                {
                    complaint.hospitalId &&
                    <div className="modal-form-row">
                        <TextField id="outlined-basic" value={complaint.hospitalId.name}
                            readOnly
                            label="Hospital Name" type="text" variant="outlined" fullWidth className='input' />
                    </div>
                }
                {
                    complaint.doctorId &&
                    <div className="modal-form-row">
                        <TextField id="outlined-basic" value={complaint.doctorId.name}
                            readOnly
                            label="Doctor Name" type="text" variant="outlined" fullWidth className='input' />
                    </div>
                }
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={complaint.description}
                        multiline
                        readOnly
                        minRows={10}
                        label="description" type="text" variant="outlined" fullWidth className='input' />
                </div>



                <div className="modal-form-row">
                    <button type='button' onClick={() => setShowModal(false)} className='btn btn-outline-dark w-100'>close</button>
                    {/* <button type='submmit' disabled={!validForm()} className='btn btn-dark w-50'>
                        Register Complaint
                        <ClipLoader size={20} color="white" loading={loading.submit} />

                    </button> */}
                </div>

            </form>
        </div>
    )
}
