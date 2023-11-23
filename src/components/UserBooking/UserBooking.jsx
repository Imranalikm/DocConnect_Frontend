  import React, { useEffect, useState } from 'react'
  import UserHeader from '../UserHeader/UserHeader'
  import './userBooking.css'
  import { Container, Row } from 'react-bootstrap'
  import axiosInstance from '../../axios/axiosInstance'
  import { Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
  import Swal from 'sweetalert2'
  import Confetti from 'react-confetti'
  import notFoundImg from '../../assets/images/no-result.jpg'
  import { useSelector } from 'react-redux'
  import formatDate from '../../helpers/dateFormat'
 

  export default function UserBooking() {
    const [bookingList, setBookingList] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [booking, setBooking] = useState({})
    const [filter, setFilter] = useState('all')
    const [showConfetti, setShowConfetti] = useState(false);

    const user = useSelector((state) => state.user.details)

    useEffect(() => {
      (
        async function () {
          const { data } = await axiosInstance.get("/user/booking?filter=" + filter);
          if (!data.err) {
            setBookingList(data.bookings)
            console.table(data.bookings)
          }
        }
      )()
    }, [filter, refresh])
    
    useEffect(() => {
      const bookingSuccess = localStorage.getItem('bookingSuccess');
      if (bookingSuccess === 'true') {
        setShowConfetti(true);
        localStorage.removeItem('bookingSuccess');
      }
    }, []);

    return (
      <div className="user-main">
        <UserHeader />
        {showConfetti && <Confetti duration={3000} width={1600} height={600} numberOfPieces={200} />}
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
            {
              filter==='upcoming' ?
              bookingList.map((item, index) => {
                if(new Date(item.date) >= new Date()){
                  return(
                <div className="user-booking-item" key={index}>
                  <div className="ub-dr-profile">
                    <img src={item.doctorId.image.url} alt="" />
                  </div>
                  <div className="ub-dr-desc">
                    <div className="ub-dr-desc-item">
                    
                      <b>{item.doctorId.name}</b>
                      <div>
                        <p>Tokeni : </p>
                        <p> {item.token}</p>
                      </div>
                      <div className="mt-2">
                        <p>Date : </p>
                        <p>{formatDate(item.date)}</p>
                      </div>
                      
                      <div>
                        <p>Time : </p>
                        <p> {new Date(item.time).toLocaleTimeString('en-US')}</p>
                      </div>
                     

                    </div>
                        <div className="booking-status d-flex align-items-center justify-content-center" style={{ gap: "10px", flexWrap: "wrap" }}>
                            <>
                            <Chip label={"Upcoming"} color={item.status == 'consulted' ? "primary" : "secondary"} variant="outlined" />
                              <button className='btn btn-dark' >Cancel</button>
                            </>
                        </div>
                  </div>
                </div>)
                }
              })
              :
              bookingList.map((item, index) => {
                return <div className="user-booking-item" key={index}>
                  <div className="ub-dr-profile">
                    <img src={item.doctorId.image.url} alt="" />
                  </div>
                  <div className="ub-dr-desc">
                    <div className="ub-dr-desc-item">
                    
                      <b>{item.doctorId.name}</b>
                      <div className="mt-2">
                        <p>Date : </p>
                        <p>  {formatDate(item.date)}</p>
                      </div>
                      <div>
                        <p>Time : </p>
                        <p> {new Date(item.time).toLocaleTimeString('en-US')}</p>
                      </div>
                      <div  >
                        <p>Token : </p>
                        <p > {item.token}</p>
                      </div>

                    </div>
                    {
                      (item.status==="upcoming") ?
                        <div className="booking-status d-flex align-items-center justify-content-center" style={{ gap: "10px", flexWrap: "wrap" }}>
                          {
                            new Date(item.date) < new Date() ?
                            <>
                            <Chip label={"Not attended"} color={"secondary"} variant="outlined" />
                            </>
                            :
                            <>
                            <Chip label={"Upcoming"} color={item.status == 'consulted' ? "primary" : "secondary"} variant="outlined" />
                            {
                              item.status == 'upcoming' &&
                              <button className='btn btn-dark' >Cancel</button>
                            }
                            </>
                            
                          }
                        </div>
                        :
                        <div className="booking-status d-flex align-items-center justify-content-center" style={{ gap: "10px", flexWrap: "wrap" }}>
                          <Chip label={item.status} color={item.status == 'consulted' ? "primary" : "secondary"} variant="outlined" />
                          {
                              item.status == 'completed' &&
                              <button className='btn btn-dark'>View EMR</button>
                            }
                        </div>
                    }
                  </div>
                </div>
              })

            }
            {
              !bookingList[0] &&
              <Row className='d-flex justify-content-center flex-column align-items-center'>
                <img src={notFoundImg} style={{ maxHeight: "300px", width: "400px", maxWidth: "90%" }} alt="" />
                <h6 className='text-center'>No data found</h6>
              </Row>
            }

          </div>

        </Container>
      


      </div>
    )
  }
