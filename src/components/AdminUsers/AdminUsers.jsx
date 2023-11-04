import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { RiMore2Fill, RiSearch2Line } from 'react-icons/ri';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress } from '@mui/material';

export default function AdminUsers() {
  const [usersList, setUsersList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [load, setLoad] = useState(false)
  const [clicked, setCLicked] = useState(false)
  const [name, setName] = useState("")
  const handleClick = () => {
    setCLicked(!clicked)
  }
  React.useEffect(() => {
    (
      async function () {
        try {
          const { data } = await axios.get("/admin/users?name=" + name)
          if (!data.err) {
            setUsersList(data.users)
          }

        } catch (err) {
          console.log(err)
        }
      }
    )()
  }, [refresh, name])
  async function blockUser(id) {
    Swal.fire({
      title: 'Are you sure? Block',
      text: "Block this user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Block!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.patch("/admin/user/block", { id });
        setRefresh(!refresh)
      }
    })
  }
  async function unBlockUser(id) {
    Swal.fire({
      title: 'Are you sure? Unblock',
      text: "Unblock this user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Unblock!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.patch("/admin/user/unblock", { id });
        setRefresh(!refresh)
      }
    })
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
                <input type="text" placeholder='Search...' value={name} onChange={(e) => setName(e.target.value)} />
                <button><RiSearch2Line /></button>
              </div>

            </div>
            <Table className='table-main' striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>option</th>
                </tr>
              </thead>
              <tbody>
                {
                  usersList.map((item, index) => {
                    return <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.block ? "bocked" : "Active"}</td>
                      {/* <td>{item.mobile}</td> */}
                      <td className='option-btn'>
                        <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <RiMore2Fill />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {
                              item.block ?
                                <Dropdown.Item href="#" onClick={(e) => unBlockUser(item._id)}>Unblock</Dropdown.Item>
                                :
                                <Dropdown.Item href="#" onClick={(e) => blockUser(item._id)}>Block</Dropdown.Item>
                            }
                          </Dropdown.Menu>
                        </Dropdown>
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
    </div>

  );
}