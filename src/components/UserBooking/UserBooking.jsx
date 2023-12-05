import React, { useEffect, useState } from 'react';
import UserHeader from '../UserHeader/UserHeader';
import './userBooking.css';
import { Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../axios/axiosInstance';
import { Chip, FormControl, InputLabel, MenuItem, Select ,Stack} from '@mui/material';
import Swal from 'sweetalert2';
import Confetti from 'react-confetti';
import notFoundImg from '../../assets/images/no-result.jpg';
import { useSelector } from 'react-redux';
import formatDate from '../../helpers/dateFormat';
import ViewEmr from '../Modals/ViewEmr/ViewEmr';
import { cancelBooking } from "../../api/userApi"


function isSameDayAsToday(date) {
  const today = new Date();
  const appointmentDate = new Date(date);
  return (
    today.getFullYear() === appointmentDate.getFullYear() &&
    today.getMonth() === appointmentDate.getMonth() &&
    today.getDate() === appointmentDate.getDate()
  );
}

function isWithinOneDayFromCreation(createdAt) {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const currentDate = new Date();
  return Math.abs(new Date(createdAt) - currentDate) < oneDayInMilliseconds;
}

export default function UserBooking() {
  const [bookingList, setBookingList] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [booking, setBooking] = useState({})
  const [filter, setFilter] = useState('all')
  const [showAddEmr, setShowAddEmr] = useState(false)

  const user = useSelector((state) => state.user.details)

  useEffect(() => {
    (
      async function () {
        const { data } = await axiosInstance.get("/user/booking?filter=" + filter);
        if (!data.err) {
          setBookingList(data.bookings)
          console.log(data.bookings)
        }
      }
    )()
  }, [filter, refresh])

  const showEmr = (data) => {

    setBooking(data);
    setShowAddEmr(true)
  }

  const handleCancelBooking = async (bookingId) => {
    Swal.fire({
      title: 'Are you sure? Cancel this appointment',
      text: "Cancel appointment",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await cancelBooking(bookingId);
        if (!data.err) {
          Swal.fire(
            'Success!',
            'Successfully Cancelled Appoiintments',
            'success'
          )
          setRefresh(!refresh);
        }
      }
    })

  }
  return (
    <div className="user-main">
      <UserHeader />
      <Container
      >

        <div className="user-booking-container">

          <div className="profile-comp">
            <img src={user.picture ? user.picture.replace('=s96-c', '') : "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"} alt="" />
            <h6 className="text-center mt-2">{user.name.toUpperCase()}</h6>
            <span className="text-center">{user.email}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <h4 className='mt-3'>Recent Booking</h4>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                autoWidth
                label="Age"
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'upcoming'}>upcoming</MenuItem>
                <MenuItem value={'completed'}>completed</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Row xs={1} md={2} className="g-4">
  {bookingList.map((item, index) => (
    <Col xs={6} key={index} onClick={() => item.status === "completed" && showEmr(item)}>
      <div className="user-booking-item">
        <div className="ub-dr-profile">
          <img src={item.doctorId.image.url} alt="" />
        </div>
        <div className="ub-dr-desc">
          <div className="ub-dr-desc-item">
            <b>{item.doctorId.name}</b>
            <div className="mt-2">
              <p>Date : </p>
              <p>{formatDate(item.date)}</p>
            </div>
            <div>
              <p>Time : </p>
              <p>{new Date(item.time).toLocaleTimeString('en-US')}</p>
            </div>
            <div>
              <p>Token : </p>
              <p>{item.token}</p>
            </div>
          </div>
          <div className="booking-status d-flex align-items-center justify-content-center" style={{ gap: "10px", flexWrap: "wrap" }}>
            {item.status === 'upcoming' && (
              <>
                {new Date(item.date) < new Date() ? (
                  <Chip label={"Not attended"} color={"error"}  />
                ) : (
                  <>
                    <Chip label={"Upcoming"} color={item.status === 'consulted' ? "primary" : "secondary"}  />
                    {item.status === 'upcoming' && isWithinOneDayFromCreation(item.createdAt) && !isSameDayAsToday(item.date) && (
                      <button className='btn btn-dark' onClick={() => handleCancelBooking(item._id)}>Cancel</button>
                    )}
                  </>
                )}
              </>
            )}
            {item.status !== 'upcoming' && item.status !== 'refund processing' && (
              <>
                <Chip label={item.status} color={item.status === 'completed' ? "primary" : "secondary"}  />
                {item.status === 'completed' && <button className='btn btn-dark'>View EMR</button>}
              </>
            )}
            {
              item.status === 'refund processing' && (
                <Chip label={item.status} color={"warning"} />
              )
            }
          </div>
        </div>
      </div>
    </Col>
  ))}
</Row>



          {
            !bookingList[0] &&
            <Row className='d-flex justify-content-center flex-column align-items-center'>
              <img src={notFoundImg} style={{ maxHeight: "300px", width: "400px", maxWidth: "90%" }} alt="" />
              <h6 className='text-center'>No data found</h6>
            </Row>
          }

        </div>

      </Container>
      
      {
        showAddEmr &&
        <ViewEmr booking={booking} setShowAddEmr={setShowAddEmr} />
      }


    </div>
  )
}
