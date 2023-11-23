import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axiosInstance from '../../../axios/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'
import '../../../assets/css/modalForm.css'

export default function EditDoctorProfile({ setShowModal, setRefresh, refresh }) {
    const [loading, setLoading] = useState({
        submit: false
    })
    const [image, setImage]=useState(null)
    const [finalImage, setFinalImage]=useState(null)
    const [errMessage, setErrMessage]=useState("")
    const isValidFileUploaded=(file)=>{
        const validExtensions = ['png','jpeg','jpg','avif']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
      }
    
    const handleImage=(e)=>{
        if(isValidFileUploaded(e.target.files[0])){
            setImage(e.target.files[0])
            setErrMessage("")
            ImageTOBase(e.target.files[0])
        }else{
            setErrMessage("Invalid File type")
        }
    }
    const ImageTOBase=(file)=>{
      const reader= new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setFinalImage(reader.result)
      }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading({ ...loading, submit: true })
        const {data}= await axiosInstance.patch("/doctor/profile", {image:finalImage});
        if(data.err){
            setErrMessage(data.message)
        }
        setLoading({ ...loading, submit: false })
        setRefresh(!refresh)
        setShowModal(false)

        
       

    }
    function validForm() {
        if (!image) {
            return false
        }
        return true
    }


    return (
        <div className="modal-form">
            <form className="modal-container" onSubmit={handleSubmit}>
                <div className="modal-form-row head">
                    <h5>Edit Profile</h5>
                </div>

                <div className="modal-form-row">
                    <Form.Group controlId="formFile" className="mb-3 w-100">
                        <Form.Label>Input profile photo</Form.Label>
                        <Form.Control type="file" className='w-100' onChange={handleImage} />
                    </Form.Group>
                </div>
                {
                    finalImage &&
                <div className="modal-form-row image">
                    <img src={finalImage} alt="" />
                </div>
                }

                {errMessage &&
                    <div className="modal-form-row">
                        <b>{errMessage}</b>
                    </div>
                }
                <div className="modal-form-row">
                    <button type='button' onClick={() => setShowModal(false)} className='btn btn-outline-dark w-50'>close</button>
                    <button type='submmit' disabled={!validForm()} className='btn btn-dark w-50'>
                        Update
                        <ClipLoader size={20} color="white" loading={loading.submit} />

                    </button>
                </div>

            </form>
        </div>
    )
}
