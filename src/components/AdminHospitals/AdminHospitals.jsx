import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Table } from 'react-bootstrap';
import { RiSearch2Line } from 'react-icons/ri';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Swal from 'sweetalert2';
import { Backdrop, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AdminHospitals() {
  const [hospitalList, setHospitalList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState('');

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    async function fetchHospitalData() {
      try {
        const { data } = await axios.get('/admin/hospitals?name=' + name);
        if (!data.err) {
          setHospitalList(data.hospitals);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchHospitalData();
  }, [refresh, name]);

  const blockHospital = async (id) => {
    Swal.fire({
      title: 'Are you sure? Block',
      text: 'Block this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Block!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.patch('/admin/hospital/block', { id });
        setRefresh(!refresh);
      }
    });
  };

  const unBlockHospital = async (id) => {
    Swal.fire({
      title: 'Are you sure? Unblock',
      text: 'Unblock this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Unblock!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.patch('/admin/hospital/unblock', { id });
        setRefresh(!refresh);
      }
    });
  };

  return (
    <div className="admin-home">
      <AdminHeader handleClick={handleClick} />
      <div className="admin-main">
        <AdminSidebar page="hospital" clicked={clicked} />
        <Container fluid>
          <div className="admin-container">
            <div className="container-header">
              <h5>Hospitals</h5>
              <div className="admin-search-box">
                <input type="text" placeholder="Search..." value={name} onChange={(e) => setName(e.target.value)} />
                <button><RiSearch2Line /></button>
              </div>
            </div>
            {hospitalList.length === 0 ? (
              <p style={{ fontSize: '18px', color: '#888', textAlign: 'center', marginTop: '20px' }}>No Hospitals Found</p>
            ) : (
              <Table className="table-main" striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Place</th>
                    <th>Address</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitalList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={'/hospital/' + item._id}>
                          {item.name}
                        </Link>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.place}</td>
                      <td>{item.address}</td>
                      <td>{item.mobile}</td>
                      <td>{item.block ? <span style={{ color: 'red', fontWeight: "bold" }}>Blocked</span> : <span style={{ color: 'green', fontWeight: "bold" }}>Active</span>}</td>
                      <td>
                        {item.block ? (
                          <Button variant="success" onClick={(e) => unBlockHospital(item._id)} style={{ backgroundColor: 'green', padding: '4px 8px', borderRadius: '.25rem', color: 'white' }}>Unblock</Button>
                        ) : (
                          <Button variant="danger" onClick={(e) => blockHospital(item._id)} style={{ backgroundColor: 'red', padding: '4px 8px', borderRadius: '.25rem', color: 'white' }}>Block</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Container>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
