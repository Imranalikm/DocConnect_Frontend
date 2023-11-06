import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Button, TextField } from '@mui/material';
import loginImage from '../../assets/images/logo.PNG'
import "../UserLogin/userlogin.css"
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios'
import { useDispatch } from 'react-redux';

function HospitalLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrMessage] = useState("")
    const [loading, setLoading] = useState({
        submit: false
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading({ ...loading, submit: true })
        if (validForm()) {
            const { data } = await axios.post("/hospital/auth/login", {
                email, password
            })
            if (data.err) {
                setErrMessage(data.message)
            } else {
                dispatch({type:"refresh"})
            }
            setLoading({ ...loading, submit: false })

        }

    }
    
    function validForm() {
        if (email.trim() === "" || password.trim() === "") {
            return false
        }
        return true
    }
    return (
        <div className="login-main">
            <Row>
                <nav className='login-nav'>
                    <Container>
                        <Row>
                            <h3></h3>
                        </Row>
                    </Container>
                </nav>
            </Row>
            <Row>
                <div className="login-container">
                    <Row>

                        <Col md={6}>
                            <div className="login-sec bg">
                                <img src={loginImage} alt="" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="login-sec">
                                <form onSubmit={handleSubmit} className="login-box">
                                    <div className="login-row head">
                                        <h3>Hospital Login</h3>
                                    </div>
                                    <div className="login-row w-100">
                                        <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" variant="outlined" fullWidth className='input' />
                                    </div>
                                    <div className="login-row">
                                        <TextField id="outlined-basic" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="outlined" className='input' fullWidth />
                                    </div>
                                    {
                                        errMessage &&
                                        <div className="login-row" style={{ justifyContent: "flex-start" }}>
                                            <p className='text-danger'>{errMessage}</p>
                                        </div>
                                    }
                                    <div className="login-row justify-content-start">
                                        <Link to="/account/hospital/forgot" className='link'>Forgot password</Link>
                                    </div>
                                    <div className="login-row">
                                        <button type='submit' disabled={!validForm() || loading.submit}>
                                            Login
                                            <ClipLoader size={20} color="white" loading={loading.submit} />
                                        </button>
                                    </div>
                                    <div className="login-row google-btn">
                                   
                                        
                                    </div>
                                    <div className="login-row mt-3">
                                        <Link to="/account/hospital/signup" className='link'>Don't Have an Account? Signup</Link>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Row>
        </div>
    )
}

export default HospitalLogin