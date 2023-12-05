import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { RiMore2Fill } from 'react-icons/ri';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress } from '@mui/material';
import { getAdminComplaints } from '../../api/adminApi';
import ViewComplaint from '../../Modal/ViewComplaint/ViewComplaint';

export default function AdminComplaints() {
  const [refresh, setRefresh] = useState(false)
  const [load, setLoad]=useState(false)
  const [clicked, setCLicked]=useState(false)
  const [complaints, setComplaints]= useState([])
  const [complaint, setComplaint]=useState({})
  const [showModal, setShowModal] = useState(false)
  const handleClick=()=>{
    setCLicked(!clicked)
  }
  React.useEffect(() => {
    (
      async function () {
          const data = await getAdminComplaints()
          if (!data.err) {
            setComplaints(data.complaints)
          }
      }
    )()
  }, [refresh])
  return (
    <div className="admin-home">

      <AdminHeader handleClick={handleClick} />
      <div className="admin-main">
        <AdminSidebar page={'complaints'} clicked={clicked} />
        <Container fluid>

          <div className="admin-container">
            <h5>Complaints</h5>
            <Table className='table-main' responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Complaint ID</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Doctor Name</th>
                  <th>Hospital Name</th>
                  <th>option</th>
                </tr>
              </thead>
              <tbody>
                {
                  complaints.map((item, index) => {
                    return <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.complaintId}</td>
                      <td>{item.userId.name}</td>
                      <td>{item.userId.email}</td>
                      <td>{item.doctorId ? item.doctorId.name : ""}</td>
                      <td>{item.hospitalId ? item.hospitalId.name : ""}</td>
                      <td>
                        <button className='btn btn-outline-dark btn-sm'
                        onClick={()=>{
                          setComplaint(item)
                          setShowModal(true)
                        }}
                        >View</button>
                      </td>
                    </tr>
                  })
                }

              </tbody>
            </Table>

          </div>
        </Container>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {
        showModal &&
        <ViewComplaint setShowModal={setShowModal} complaint={complaint} />
      }
    </div>

  );
}