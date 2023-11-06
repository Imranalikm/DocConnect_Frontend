import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import loginImage from "../../assets/images/logo.PNG";
import "./userlogin.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import logo from "./../../assets/images/logoheader.jpg";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const [loginType, setLoginType] = useState("doctor");

  const handleLoginTypeChange = (event, newLoginType) => {
    if (newLoginType !== null) {
      setLoginType(newLoginType);
    }
  };

  const validForm = () => {
    if (password.trim() === "" || email.trim() === "") {
      return false;
    }
    return true;
  };

  const [loading, setLoading] = useState({
    submit: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    const { data } = await axios.post("/user/auth/login", { email, password });
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
          <Container>
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
        <div className="login-container">
          <Row>
            <Col md={6}>
              <div className="login-sec bg">
                <img src={loginImage} alt="" />
              </div>
            </Col>
            <Col md={6}>
              <div className="login-sec">
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
                    {/* <Button variant="contained" onClick={demoLogin}>
                                            Demo Login
                                    </Button> */}
                  </div>
                  <div className="login-row"></div>
                  <div className="login-row google-btn">
                    {/* <Button variant="contained" onClick={handleGoogleLogin}>
                                            <FcGoogle className='icon' />
                                            Login with Google
                                    </Button> */}
                  </div>
                  <div className="login-row mt-3">
                    <Link to="/signup" className="link">
                      Don't Have an Account? Signin
                    </Link>
                  </div>
                  {/* <div className="login-row mt-3">
                    <ToggleButtonGroup
                      value={loginType}
                      exclusive
                      onChange={handleLoginTypeChange}
                      aria-label="login-type"
                    >
                      <ToggleButton value="doctor" aria-label="doctor">
                        Doctor
                      </ToggleButton>
                      <ToggleButton value="hospital" aria-label="hospital">
                        Hospital
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div> */}
                  {/* <div className="login-row mt-3">
                    <Link
                      to={
                        loginType === "doctor"
                          ? "/account/doctor"
                          : "/account/hospital"
                      }
                    >
                      Login as{" "}
                      <b>
                        {loginType.charAt(0).toUpperCase() + loginType.slice(1)}
                      </b>
                    </Link>
                  </div> */}
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
