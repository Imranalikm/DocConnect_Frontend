import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import { RiMore2Fill } from "react-icons/ri";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import Swal from "sweetalert2";
import { Backdrop, CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

export default function HospitalRequests() {
  const [hospitalList, setHospitalList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(false);
  const [clicked, setCLicked] = useState(false);
  const handleClick = () => {
    setCLicked(!clicked);
  };
  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/admin/hospital/requests");
        console.log(data);
        if (!data.err) {
          setHospitalList(data.hospitalRequests);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);
  const acceptRequest = async (e, email) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "accept this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "##a8a8a8",
      confirmButtonText: "Yes, Accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoad(true);
        const { data } = await axios.post("/admin/hospital/accept", { email });
        if (!data.err) {
          Swal.fire("Success!", "Successfully Accepted", "success");
        } else {
          Swal.fire("Failed!", "Something Went Wrong", "error");
        }
        setRefresh(!refresh);
        setLoad(false);
      }
    });
  };
  const rejectRequest = async (e, email) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da0303",
      cancelButtonColor: "##a8a8a8",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoad(true);
        const { data } = await axios.post("/admin/hospital/reject", { email });
        if (!data.err) {
          Swal.fire("Success!", "Successfully Rejected", "success");
          setRefresh(!refresh);
        } else {
          Swal.fire("Failed!", "Something Went Wrong", "error");
        }
        setLoad(false);
      }
    });
  };
  return (
    <div className="admin-home">
      <AdminHeader handleClick={handleClick} />
      <div className="admin-main">
        <AdminSidebar page={"hospital request"} clicked={clicked} />
        <Container fluid>
          <div className="admin-container">
            <h5>Hospital Requests</h5>
            <Table className="table-main" striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Proof</th>
                  <th>Document No</th>
                  <th>Accept</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {hospitalList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>
                        <a href={item.proof.url} target="_blank">
                          <img
                            src={item.proof.url}
                            className="table-img"
                            alt=""
                          />
                        </a>
                      </td>
                      <td>{item.documentNo}</td>
                      <td>
                        <button
                          onClick={(e) => acceptRequest(e, item.email)}
                          className="btn "
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          <FontAwesomeIcon
                            icon={faSquareCheck}
                            style={{ color: "white" }}
                          />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => rejectRequest(e, item.email)}
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          <FontAwesomeIcon
                            icon={faSquareXmark}
                            style={{ color: "white" }}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
