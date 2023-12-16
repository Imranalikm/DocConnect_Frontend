import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import UserHeader from "../UserHeader/UserHeader";
import UserDepartmentRow from "../UserDepartmentRow/UserDepartmentRow";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import "./UserHome.css";
import banner from "./../../assets/images/banner.jpg";
import homeChatImg from "./../../assets/images/chatdctr1.jpg";
import homeChatBotImg from "./../../assets/images/drbothome_50.jpg";
import { getTop3Doctors, getTop3Hospitals } from "../../api/userApi";
import UserBottom from "../UserBottom/UserBottom";
import DoctorList from '../DoctorList/DoctorList'
import HospitalList from '../HospitalList/HospitalList'

const UserHome = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [doctorRating, setDoctorRating] = useState({});
  const [hospitalRating, setHospitalRating] = useState({});
  const [hospitalList, setHospitalList] = useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get("/user/departments");
      if (data.departments) {
        setDepartmentList(data.departments);
      }
      const doctorsData = await getTop3Doctors();
      console.log(doctorsData);
      if (!doctorsData.err) {
        setDoctorList(doctorsData.doctors);
        setDoctorRating(doctorsData.rating);
      }
      const hospitalData = await getTop3Hospitals();
      if (!hospitalData.err) {
        setHospitalList(hospitalData.hospitals);
        setHospitalRating(hospitalData.rating);
      }
    })();
  }, []);
  return (
    <>
      <UserHeader></UserHeader>
      <Row className="row">
        <Container>
          <div className="div ">
            <img loading="lazy" srcSet={banner} className="img" />
            <div className="div-2">Your Health, Your Choice, Our App.</div>

            <div className="div-4">
              <Link to="/search" className="link">
                Take Appointment
              </Link>
            </div>
          </div>
        </Container>
      </Row>
      <Container>
        <Row>
          <UserDepartmentRow hospitalWise={false} list={departmentList} />
        </Row>
      </Container>

      <Container>
          <Row className='mt-5'>
            <DoctorList list={doctorList} rating={doctorRating} title="Top Doctors" />
          </Row>
        </Container>
        

      <Container>
        <Row className="mt-5">
          <Col md={6}>
            <div className="user-home-chat-img"  style={{ marginTop: "20px" }}>
              <img
                src={homeChatImg}
                alt=""
                style={{ borderRadius: "15px" }}
                loading="lazy"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="user-home-chat-desc"  style={{ marginTop: "20px" }}>
              <h4>Chat with a Doctor</h4>
              <p className="text-center">
                Chat with your favourite doctor and clarify your doubts
              </p>
              <Link to={"/chat"}>
                <button>Go to Chat</button>
              </Link>
              {/* </div> */}
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="mt-5 mb-5" >
          <Col md={6}>
            <div className="user-home-chat-desc" style={{ marginTop: "30px" }}>
              <h4>Chat with a Dr.BOT</h4>
              <p className="text-center">
                Empower Your Health: Seamless Chat with our Virtual Health
                Assistant{" "}
              </p>
              <Link to={"/docbot"}>
                <button>Dr.BOT</button>
              </Link>
              {/* </div> */}
            </div>
          </Col>
          <Col md={6}>
            <div className="user-home-chat-img" style={{ marginTop: "30px" }}>
              <img
                src={homeChatBotImg}
                alt=""
                style={{ borderRadius: "15px" }}
              />
            </div>
          </Col>
        </Row>
      </Container>

     
        {/* <Container>
          <Row className='mt-5'>
            <HospitalList list={hospitalList} title={"Top Hospitals"} rating={hospitalRating} />
          </Row>
        </Container> */}

      <UserBottom page={"home"}></UserBottom>

      <footer
        className="text-center text-white"
        style={{
          background:
            "linear-gradient(90deg, hsla(254, 68%, 9%, 1) 0%, hsla(269, 97%, 37%, 1) 33%, hsla(320, 77%, 55%, 1) 66%,  hsla(254, 68%, 9%, 1) 100%)",
        }}
      >
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="imranalikm@gmail.com"
              role="button"
            >
              <i className="fab fa-google" />
            </a>
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="https://github.com/Imranalikm"
              role="button"
            >
              <i className="fab fa-github" />
            </a>
          </section>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: "black" }}>
          <a className="text-white" href="">
            DocConnect.app
          </a>
        </div>
      </footer>
    </>
  );
};

export default UserHome;
