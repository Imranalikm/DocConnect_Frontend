import axiosInstance from "../../axios/axiosInstance";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { FaVideo } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddEMR from "../Modals/AddEMR/AddEMR";
import DoctorHeader from "../DoctorHeader/DoctorHeader";
import DoctorSideBar from "../DoctorSidebar/DoctorSidebar";
import notFoundImg from "../../assets/images/no-result.jpg";
import formatDate from "../../helpers/dateFormat";
import '../UserBooking/UserBooking'

function DoctorHome() {
  const [bookingList, setBookingList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [booking, setBooking] = useState({});
  const [showAddEmr, setShowAddEmr] = useState(false);
  const roomID = [...Array(25)]
    .map(() => ((Math.random() * 36) | 0).toString(36))
    .join("");

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get("/doctor/booking/today");
      console.log(data);
      if (!data.err) {
        setBookingList(data.bookings);
      }
    })();
  }, [refresh]);

  const showEmr = (data) => {
    setBooking(data);
    setShowAddEmr(true);
  };

  return (
    <div className="admin-home">
      <DoctorHeader />
      <div className="admin-main">
        <DoctorSideBar page={"home"} />
        <div className="admin-container">
          <Container fluid>
            <div className="user-booking-container" >
              <h4 className="">Todays Booking</h4>
              {bookingList[0] ? (
                <Row xs={1} md={2} lg={2} className="mx-md-3" style={{backgroundColor:'#f9fafb'}}>
                  {bookingList.map((item, index) => (
                    <div className="user-booking-item" key={index} >
                      <div className="ub-dr-desc">
                        <div className="ub-dr-desc-item">
                          <b>{item.patientName}</b>
                          <div className="mt-2">
                            <p>Date : </p>
                            <p> {formatDate(item.date)}</p>
                          </div>
                          <div>
                            <p>Time : </p>
                            <p>
                              {" "}
                              {new Date(item.time).toLocaleTimeString("en-US")}
                            </p>
                          </div>
                          <div>
                            <p>Token : </p>
                            <p> {item.token}</p>
                          </div>
                        </div>
                        <div
                          className="booking-status d-block flex-wrap "
                          style={{ gap: "10px", height: "100%" }}
                        >
                          <div>
                            <h6
                              className="btn "
                              style={{
                                borderColor: "e4c1f9",
                                borderRadius: "20px",
                                color: "ffafcc",
                                backgroundColor: "#e4c1f9",
                                // Added margin bottom
                              }}
                            >
                              {item.status}
                            </h6>
                          </div>
                          <div>
                            <h6
                              className="btn"
                              style={{
                                borderColor: "black",
                                borderRadius: "20px",
                                color: "cdb4db",
                                 // Added margin bottom
                              }}
                              onClick={() => showEmr(item)}
                            >
                             { item.status == "completed" ? "SHOW EMR" : "ADD EMR"} 
                            </h6>
                          </div>
                          {item.online && item.status !== "completed" && (
                            <div>
                              <Link
                                to={`/account/doctor/videocall/${roomID}/${item.userId.email}`}
                                className="btn d-flex align-items-md-center justify-content-center"
                                style={{
                                  borderColor: "black",
                                  borderRadius: "20px",
                                  color: "white",
                                  paddingTop:'11px',
                                  paddingBottom:'11px',
                                  backgroundColor:'#f7b801'
                                }}
                              >
                               Consult  <FaVideo style={{ color: "white" ,}} />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </Row>
              ) : (
                <Row className="d-flex justify-content-center flex-column align-items-center">
                  <img
                    src={notFoundImg}
                    style={{
                      maxHeight: "300px",
                      width: "400px",
                      maxWidth: "90%",
                    }}
                    alt=""
                  />
                  <h6 className="text-center">No Appointments</h6>
                </Row>
              )}
            </div>
          </Container>
        </div>
      </div>
      {showAddEmr && (
        <AddEMR
          booking={booking}
          setShowAddEmr={setShowAddEmr}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}

export default DoctorHome;
