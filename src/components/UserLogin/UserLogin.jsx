import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import loginImage from "../../assets/images/logo.PNG";
import "./userlogin.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axiosInstance from '../../axios/axiosInstance'
import { useDispatch } from "react-redux";
import logo from "./../../assets/images/logoheader.jpg";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FcGoogle } from "react-icons/fc";


function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  

 

  const validForm = () => {
    if (password.trim() === "" || email.trim() === "") {
      return false;
    }
    return true;
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    let redirectUri = "http://localhost:3000/user/auth/google/callback"
    let clientId = "875796229095-mvsbce4r9va50psiblggbsqv1jhpv24i.apps.googleusercontent.com"
    try {
        window.open(
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile`,
            "_self"
        )
    } catch (error) {
        console.log('Google login error:', error);
    }
  }
  const [loading, setLoading] = useState({
    submit: false,
  });

  const testLogin=async(e)=>{
    e.preventDefault();
    setLoading({ ...loading, submit: true })
    let tempEmail="imranalikm@gmail.com"
    let tempPassword="asdf"
    const { data } = await axiosInstance.post("/user/auth/login", { email:tempEmail, password:tempPassword });
    if (data.err) {
        setErrMessage(data.message)
    } else {
        dispatch({ type: "refresh" })
    }
    setLoading({ ...loading, submit: false })
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    const { data } = await axiosInstance.post("/user/auth/login", { email, password });
    if (data.err) {
      setErrMessage(data.message);
    } else {
      dispatch({ type: "refresh" });
    }
    setLoading({ ...loading, submit: false });
  };

  return (
    
    <div className="login-main" >
      
      <Row>
        <nav className="login-nav">
          <Container fluid>
            <Row>
              {/* <img
                src={logo}
                alt=""
                style={{ width: "180px", height: "auto", overflow: "hidden" }}
              /> */}
            </Row>
          </Container>
        </nav>
      </Row>
      <Row>
        <div className="login-container" >
          <Row>
            <Col md={6}>
              <div className="login-sec bg" >
                <img src={loginImage} alt="" />
              </div>
            </Col>
            <Col md={6}>
              <div className="login-sec" >
                <form className="login-box" onSubmit={handleSubmit}>
                  <div className="login-row head">
                    <h3>Login</h3>
                  </div>
                  <div className="login-row w-100 mt-3">
                    <TextField
                      id="outlined-basic"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      className="input"
                    />
                  </div>
                  <div className="login-row">
                    <TextField
                      id="outlined-basic"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
                      type="password"
                      variant="outlined"
                      className="input"
                      fullWidth
                    />
                  </div>
                  {errMessage && (
                    <div
                      className="login-row"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <p className="text-danger">{errMessage}</p>
                    </div>
                  )}
                  <div className="login-row d-flex justify-content-start">
                    <Link to="/forgot" className="link">
                      Forgot Password
                    </Link>
                  </div>
                  <div className="login-row">
                    <button type="submit" disabled={!validForm()}>
                      login
                      <ClipLoader
                        size={20}
                        color="white"
                        loading={loading.submit}
                      />
                    </button>
                  </div>
                  <div className="login-row google-btn">
                    <Button variant="contained" onClick={testLogin}>
                                            Test Login
                                    </Button>
                  </div>
                  <div className="login-row">OR</div>
                  <div className="login-row google-btn">
                    <Button variant="contained" onClick={handleGoogleLogin}>
                                            <FcGoogle className='icon' />
                                            Login with Google
                                    </Button>
                  </div>
                  <div className="login-row mt-3">
                    <Link to="/signup" className="link">
                      Don't Have an Account? Signin
                    </Link>
                  </div>
                 
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
}

export default UserLogin;
