import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import loginImage from "../../assets/images/logo.PNG";
import "../UserLogin/userlogin.css";
import { ClipLoader } from "react-spinners";
import axiosInstance from "../../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../../assets/images/adminlottie.json";

function AdminLogin() {
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
  const [loading, setLoading] = useState({
    submit: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    const { data } = await axiosInstance.post("/admin/auth/login", {
      email,
      password,
    });
    if (data.err) {
      toast.error(data.message);
      setErrMessage(data.message);
    } else {
      dispatch({ type: "refresh" });
    }
    setLoading({ ...loading, submit: false });
  };

  return (
    <div className="login-main">
      <ToastContainer position="top-right" autoClose={5000} />
      <Row>
        <nav className="login-nav">
          <Container>
            <Row>
              <img
                src={loginImage}
                alt=""
                style={{ width: "150px", height: "auto", overflow: "hidden" }}
              />
            </Row>
          </Container>
        </nav>
      </Row>
      <Row>
        <div className="login-container">
          <Row>
            <Col md={6}>
              <Lottie
                animationData={animationData}
                loop
                speed={0.5}
                style={{ width: "580px", height: "500px" }} // Set the desired dimensions
              />
            </Col>
            <Col md={6}>
              <div className="login-sec">
                <form onSubmit={handleSubmit} className="login-box">
                  <div className="login-row head">
                    <h3>Admin Login</h3>
                  </div>
                  <div className="login-row w-100 mt-3">
                    <TextField
                      id="outlined-basic"
                      value={email}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
                      type="password"
                      variant="outlined"
                      className="input"
                      fullWidth
                    />
                  </div>
                  {/* {
                                        errMessage &&
                                        <div className="login-row" style={{ justifyContent: "flex-start" }}>
                                            <p className='text-danger'>{errMessage}</p>
                                        </div>
                                    } */}
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
                  <div className="login-row google-btn"></div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
}

export default AdminLogin;
