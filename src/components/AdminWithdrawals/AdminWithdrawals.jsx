import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { RiMore2Fill } from 'react-icons/ri';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress } from '@mui/material';
import { getAdminComplaints, getAdminWitdrawals, withdrawComplete } from '../../api/adminApi';

export default function AdminWithdrawals() {
  const [refresh, setRefresh] = useState(false)
  const [load, setLoad] = useState(false)
  const [clicked, setCLicked] = useState(false)
  const [withdrawals, setWithdrawals] = useState([])
  const handleClick = () => {
    setCLicked(!clicked)
  }
  React.useEffect(() => {
    (
      async function () {
        const data = await getAdminWitdrawals()
        if (!data.err) {
          setWithdrawals(data.withdrawals)

        }
      }
    )()
  }, [refresh])
  const handleWithdraw=(id)=>{
    Swal.fire({
      title: 'Are you sure? Complete Withdraw',
      text: "Withdraw Complete",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Completed!',
      cancelButtonText:"No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await withdrawComplete(id)
        if(!data.err){
          Swal.fire(
            'Success!',
            'Withdrawal completed',
            'success'
        )
        setRefresh(!refresh)
        }
      }
    })

  }
  return (
    <div className="admin-home">

      <AdminHeader handleClick={handleClick} />
      <div className="admin-main">
        <AdminSidebar page={'withdrawals'} clicked={clicked} />
        <Container fluid>

          <div className="admin-container">
            <h5>Complaints</h5>
            <Table className='table-main' responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hospital ID</th>
                  <th>Hospital Name</th>
                  <th>Wallet</th>
                  <th>Status</th>
                  <th>option</th>
                </tr>
              </thead>
              <tbody>
                {
                  withdrawals[0] &&
                  withdrawals.map((item, index) => {
                    return <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.hospitalId._id}</td>
                      <td>{item.hospitalId.name}</td>
                      <td>{item.hospitalId.wallet}</td>
                      <td>{item.status ? "Withdrawal Completed" : "pending"}</td>
                      <td>
                            <button className='btn btn-outline-dark btn-sm'
                            disabled={item.status}
                              onClick={()=>handleWithdraw(item.hospitalId._id)}
                            >Complete Withdrawal</button>
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