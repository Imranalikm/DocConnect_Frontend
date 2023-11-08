import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import otpImage from "../../assets/images/otp.png";
import "../UserLogin/userlogin.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

function VerifyOtp(props) {
  const [errMessage, setErrMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState({
    submit: false,
  });
  const [countdown, setCountdown] = useState(30); // Initial countdown time in seconds
  const [resendDisabled, setResendDisabled] = useState(true); // Initially, the button is disabled
  const dispatch = useDispatch();

  // Function to start the countdown timer
  const startCountdown = () => {
    if (resendDisabled) {
      let seconds = countdown;
      const countdownInterval = setInterval(() => {
        if (seconds > 0) {
          seconds -= 1;
          setCountdown(seconds);
        } else {
          clearInterval(countdownInterval);
          setResendDisabled(false);
        }
      }, 1000);
    }
  };

  // Start the countdown timer when the component mounts
  useEffect(() => {
    if (resendDisabled) {
      startCountdown();
    }
  }, [resendDisabled]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    let { data } = await axios.post("/user/auth/register/verify", {
      otp,
      ...props.data,
    });
    if (data.err) {
      setErrMessage(data.message);
    } else {
      dispatch({ type: "refresh" });
    }
    setLoading({ ...loading, submit: false });
  }

  const handleResendClick = async () => {
    if (!resendDisabled) {
      setResendDisabled(true);
      setCountdown(30);

      try {
        const response = await axios.post('/user/auth/register/verify/resend', {
          ...props.data
        });

        if (response.data.err) {
          console.log(response.data.message);
        } else {
          // Handle the successful resend here if needed.
          // For example, you can show a success message to the user.
          console.log("success");
        }
      } catch (error) {
        // Handle any errors from the request here.
        console.error('Error while resending OTP:', error);
      }
      startCountdown();
    }
  };

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
                <div
                  className="countdown"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {resendDisabled ? (
                    <p>
                      Resend OTP in 00:
                      {countdown < 10 ? `0${countdown}` : countdown} seconds
                    </p>
                  ) : null}
                </div>

                <div className="login-row w-100 mt-3">
                  <TextField
                    id="outlined-basic"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    label="OTP"
                    type="number"
                    variant="outlined"
                    fullWidth
                    className="input"
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
                <div className="login-row">
                  <button type="submit" disabled={otp.trim() === ""}>
                    Verify
                    <ClipLoader
                      size={20}
                      color="white"
                      loading={loading.submit}
                    />
                  </button>
                </div>
                <div
                  className="resend-button"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button onClick={handleResendClick} disabled={resendDisabled || countdown > 0}>
                    Resend OTP
                  </button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Row>
  );
}

export default VerifyOtp;
