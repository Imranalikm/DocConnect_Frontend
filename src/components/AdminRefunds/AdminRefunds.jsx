import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Container, Dropdown, Row, Table } from 'react-bootstrap';
import { RiMore2Fill, RiSearch2Line } from 'react-icons/ri';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress } from '@mui/material';
import { getAdminRefundList, refundComplete } from '../../api/adminApi';
import notFoundImg from '../../assets/images/no-result.jpg'
import { useDispatch } from 'react-redux';

export default function AdminRefunds() {
  const [refundList, setRefundList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [load, setLoad] = useState(false)
  const [clicked, setCLicked] = useState(false)
  const [name, setName] = useState("")
  const handleClick = () => {
    setCLicked(!clicked)
  }
  const dispatch= useDispatch()
  React.useEffect(() => {
    (
      async function () {
        const data = await getAdminRefundList();
        if (!data.err) {
          setRefundList(data.bookings)
        }
      }
    )()
  }, [refresh, name])
  async function issueRefund(id) {
    Swal.fire({
      title: 'Are you sure? Issue refund',
      text: "Issue Refund!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Refund!',
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({type:"loading", payload:true})
        const data = await refundComplete(id)
        if (!data.err) {
          Swal.fire(
            'Success!',
            'Successfully Issued refund',
            'success'
          )
          setRefresh(!refresh)
        }
        dispatch({type:"loading", payload:false})
      }
    })
  }


  return (
    <div className="admin-home">

      <AdminHeader handleClick={handleClick} />
      <div className="admin-main">
        <AdminSidebar page={'refund'} clicked={clicked} />
        <Container fluid>

          <div className="admin-container">
            <div className="container-header">
              <h5>Hospitals</h5>
              {/* <div className="admin-search-box">
                <input type="text" placeholder='Search...' value={name} onChange={(e) => setName(e.target.value)} />
                <button><RiSearch2Line /></button>
              </div> */}

            </div>
            {
              refundList[0] ?

                <Table className='table-main' responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Booking Id</th>
                      <th>Payment Id</th>
                      <th>order Id</th>
                      <th>Fees</th>
                      <th>Status</th>
                      <th>Options</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      refundList.map((item, index) => {
                        return <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item._id}</td>
                          <td>{item.payment.razorpay_payment_id}</td>
                          <td>{item.payment.razorpay_order_id}</td>
                          <td>{item.fees}</td>
                          <td>{item.status}</td>
                          <td>
                            <button className='btn btn-outline-dark btn-sm' onClick={() => issueRefund(item._id)}>Issue Refund</button>
                          </td>
                        </tr>
                      })
                    }

                  </tbody>
                </Table>
                :
                <Row className='d-flex justify-content-center flex-column align-items-center'>
                  <img src={notFoundImg} style={{ maxHeight: "300px", maxWidth: "90%", width: "300px" }} alt="" />
                  <h6 className='text-center'>No data found</h6>
                </Row>
            }


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