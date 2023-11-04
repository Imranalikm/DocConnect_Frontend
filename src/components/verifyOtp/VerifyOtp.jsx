import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { TextField } from '@mui/material';
import otpImage from '../../assets/images/otp.png'
import "../UserLogin/userlogin.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { ClipLoader } from 'react-spinners';


function VerifyOtp(props) {
    const [errMessage, setErrMessage] = useState("")
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState({
        submit: false
    })

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading({ ...loading, submit: true })
        let { data } = await axios.post("/user/auth/register/verify", { otp, ...props.data });
        if (data.err) {
            setErrMessage(data.message)
        } else {
            dispatch({ type: "refresh" })
        }
        setLoading({ ...loading, submit: false })
    }

    return (

        <Row>
            <div className="login-container">
                <Row>

                    <Col md={6}>
                        <div className="login-sec bg">
                            <img src={otpImage} alt="" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <form className="login-sec sec-2" onSubmit={handleSubmit}>
                            <div className="login-box">
                                <div className="login-row head">
                                    <h3>Verify Email</h3>
                                </div>
                                <div className="login-row head">
                                    <b>Enter the OTP</b>
                                </div>
                                <div className="login-row w-100 mt-3">
                                    <TextField id="outlined-basic" value={otp} onChange={(e) => setOtp(e.target.value)} label="OTP" type="number" variant="outlined" fullWidth className='input' />
                                </div>
                                {
                                    errMessage &&
                                    <div className="login-row" style={{ justifyContent: "flex-start" }}>
                                        <p className='text-danger'>{errMessage}</p>
                                    </div>
                                }
                                <div className="login-row">
                                    <button type='submit' disabled={otp.trim() == ""}>
                                        Verify
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

export default VerifyOtp