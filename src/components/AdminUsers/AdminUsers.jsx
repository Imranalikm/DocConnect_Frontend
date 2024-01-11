import axiosInstance from '../../axios/axiosInstance'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { RiMore2Fill, RiSearch2Line } from 'react-icons/ri';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Swal from 'sweetalert2';
import { Backdrop, CircularProgress } from '@mui/material';

export default function AdminUsers() {
  const [usersList, setUsersList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState('');

  const handleClick = () => {
    setClicked(!clicked);
  }

  useEffect(() => {
    (
      async function () {
        try {
          const { data } = await axiosInstance.get("/admin/users?name=" + name);
          if (!data.err) {
            setUsersList(data.users);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )(); 
  }, [refresh, name]);

  async function toggleBlockStatus(id, isBlocked) {
    const action = isBlocked ? 'Unblock' : 'Block';
    Swal.fire({
      title: `Are you sure? ${action}`,
      text: `${action} this user!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: `Yes, ${action}!`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosInstance.patch(`/admin/user/${isBlocked ? 'un' : ''}block`, { id });
        console.log(data);
        setRefresh(!refresh);
      }
    });
  }

  return (
    <div className="admin-home">
      <AdminHeader handleClick={handleClick} />
      <div className="admin-main">
        <AdminSidebar page={'user'} clicked={clicked} />
        <Container fluid>
        <div className="admin-container">
          <div className="container-header">
            <h5>Users</h5>
            <div className="admin-search-box">
              <input
                type="text"
                placeholder='Search...'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button><RiSearch2Line /></button>
            </div>
          </div>
          {usersList.length > 0 ? ( // Check if usersList is not empty
            <Table className='table-main' striped bordered hover responsive>
              <thead>
                <tr>
                  <th>SI.no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.block ? <span style={{ color: 'red', fontWeight: "bold" }}>Blocked</span> : <span style={{ color: 'green', fontWeight: "bold" }}>Active</span>}</td>
                    <td className='option-btn'>
                      <button onClick={() => toggleBlockStatus(item._id, item.block)} style={{ backgroundColor: item.block ? 'green' : 'red', padding: '4px 8px', borderRadius: '.25rem', color: 'white' }}>
                        {item.block ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p style={{ fontSize: '18px', color: '#888', textAlign: 'center', marginTop: '20px' }}>
    No users found
  </p>
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
