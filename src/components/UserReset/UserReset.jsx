import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { TextField } from '@mui/material';
import resetImage from '../../assets/images/resetPassword.jpg'
import "../UserLogin/userlogin.css"
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import { useDispatch } from "react-redux";
import { ClipLoader } from 'react-spinners';
import validatePassword from '../../helpers/validatePassword';


export default function UserReset({email, otp}) {
    const [errMessage, setErrMessage] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState({
        submit: false
    })
    const navigate= useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading({ ...loading, submit: true })
        const {data}= await axiosInstance.post("/user/auth/forgot/reset", {otp, email, password});
        if(data.err){
            setErrMessage(data.message)
        }else{
            navigate("/login")
        }
        setLoading({ ...loading, submit: false })
    }

    const validForm=()=>{
        if(password.trim()==="" || !validatePassword(password).status || password!=confirmPassword){
            return false
        }
        return true
    }

    useEffect(() => {
        if (password) {
            !validatePassword(password).status ?
                setErrMessage(validatePassword(password).message[0].message.replace("string", 'password')) :
                setErrMessage("")
        }
        if (confirmPassword) {
            {
                password !== confirmPassword ? setErrMessage("Password not match") :
                setErrMessage("")
            }
        }
    }, [password, confirmPassword])
    

    return (
        <Row>
            <div className="login-container">
                <Row>

                    <Col md={6}>
                        <div className="login-sec bg">
                            <img src={resetImage} alt="" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <form className="login-sec sec-2" onSubmit={handleSubmit}>
                            <div className="login-box">
                                <div className="login-row head">
                                    <h3>Change Password</h3>
                                </div>
                      
                                <div className="login-row w-100 mt-3">
                                    <TextField id="outlined-basic" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="outlined" fullWidth className='input' />
                                </div>
                                <div className="login-row w-100 mt-3">
                                    <TextField id="outlined-basic" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label="Confirm Password" type="password" variant="outlined" fullWidth className='input' />
                                </div>
                                {
                                    errMessage &&
                                    <div className="login-row" style={{ justifyContent: "flex-start" }}>
                                        <p className='text-danger'>{errMessage}</p>
                                    </div>
                                }
                                <div className="login-row">
                                    <button type='submit' disabled={!validForm()} onClick={handleSubmit}>
                                        Next
                                        <ClipLoader size={20} color="white" loading={loading.submit} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </Row>
    )
}

