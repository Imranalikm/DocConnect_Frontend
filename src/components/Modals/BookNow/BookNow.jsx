import React, { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../../axios/axiosInstance'
import './BookNow.css'
import Swal from 'sweetalert2'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function BookNow({ daysAvailable, doctor, setShowBookNow, refresh, setRefresh}) {
    const [bookDate, setBookDate] = useState('')
    const [bookTimeSlot, setBookTimeSlot] = useState('')
    const [bookingTime, setBookingTime] = useState("")
    const [times, setTimes] = useState([])
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [online,setOnline] =useState(false)
    
    const navigate = useNavigate()

    
    
    
   
    const handleDateChange = (e, index) => {
        setBookDate(e.target.value)
        setTimes([...daysAvailable[index].schedule])
        setBookTimeSlot("")
        setBookingTime("")
    }
    const handleTimeSlot = (e, data) => {
        setBookTimeSlot(e.target.value)
        setBookingTime(data.time)
    }
    
    const handleBooking = async () => {
        const { data } = await axiosInstance.post("/user/payment", {fees:doctor.fees});
        if (!data.err) {
            handleRazorPay(data.order);
        }
    }
    const handleRazorPay = (order) => {
        const options = {
            key: 'rzp_test_W1XkQORCxwlz4s',
            amount: order.amount,
            currency: order.currency,
            name: "DocConnect",
            description: "Test Transaction",
            order_id: order.id,
            theme: {
                color: '#000000', // Set your desired color
            
            },
            handler: async (response) => {
                try {
                    const { data } = await axiosInstance.post("/user/payment/verify", {
                      response,
                      bookDate,
                      bookTimeSlot,
                      bookingTime,
                      name,
                      age,
                      doctorId: doctor._id,
                      hospitalId: doctor.hospitalId,
                      fees: doctor.fees,
                      online
                    });
          
                    if (data.err) {
                      toast.error(data.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                      });
                    } else {
                        localStorage.setItem('bookingSuccess', true);
                      // Add this line for debugging
                      toast.success('Successfully Booked', {
                        position: toast.POSITION.BOTTOM_CENTER,
                      });
                      navigate("/profile");
                    }
                  } catch (error) {
                    console.error("Error:", error);
                    toast.error('An error occurred. Please try again later.', {
                      position: toast.POSITION.BOTTOM_CENTER,
                    });
                  } finally {
                   
                    setShowBookNow(false);
                    setRefresh(!refresh);
                  }
                },
              };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', (response) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.error.description,
            })
            setRefresh(!refresh)

        })

    }
    const validForm = () => {

        const isValidAge = age >= 1 && age <= 130;
        if (bookDate === "" || bookTimeSlot === "" ||
            name.trim()==="" || !age || !isValidAge) {
            return false;
        }
        return true;
    }

   

    return (
        <>


        
        <div className="book-now-main">
            <div className="booking-container">
           
            
                <div className="booking-row headr">
                    <h4>Book Now</h4>

                </div>
                <div className="booking-row">
                    <div className="booking-row-head">
                        Appointment available
                    </div>
                    <div className="booking-row-days">
                        {
                            daysAvailable.map((item, index) => {
                                return <div className="booking-row-day" key={index}>
                                    <input type="radio" id={"d" + index} name='day' value={item.date} onChange={(e) => handleDateChange(e, index)} required />
                                    <label htmlFor={"d" + index}>{new Date(item.date).toLocaleDateString()}</label>
                                </div>
                            })
                        }
                    </div>

                </div>

                <div className="booking-row">
                    <div className="booking-row-head">
                        Time
                    </div>
                    <div className="booking-row-days">
                        {
                            times.map((item, index) => {
                                return <div className="booking-row-day">
                                    <input type="radio" onChange={(e) => handleTimeSlot(e, item)} value={new Date(item.startDate).toLocaleTimeString('en-US') + " - " + new Date(item.endDate).toLocaleTimeString('en-US')} id={"t" + index}
                                     checked={new Date(item.startDate).toLocaleTimeString('en-US') + " - " + new Date(item.endDate).toLocaleTimeString('en-US')==bookTimeSlot}
                                     name='time' required />
                                    <label htmlFor={"t" + index}>
                                        {
                                            new Date(item.startDate).toLocaleTimeString('en-US')
                                            + " - " +
                                            new Date(item.endDate).toLocaleTimeString('en-US')
                                        }
                                    </label>
                                </div>
                            })
                        }

                    </div>

                </div>
                <div className="booking-row">
                    <div className="booking-row-head">
                        Fee
                    </div>
                    <div className="booking-row-days">
                        ₹{doctor.fees}
                    </div>
                    <div className="booking-row">
        <div className="booking-row-head">Consultation Mode</div>
        <div className="booking-row-days">
          <div className="booking-row-day">
            <input
              type="radio"
              id="offlineOption"
              name="mode"
              value="offline"
              checked={!online}
              onChange={() => setOnline(false)}
            />
            <label htmlFor="offlineOption">Offline</label>
          </div>
          <div className="booking-row-day">
            <input
              type="radio"
              id="onlineOption"
              name="mode"
              value="online"
              checked={online}
              onChange={() => setOnline(true)}
            />
            <label htmlFor="onlineOption">Online</label>
          </div>
        </div>
      </div>
        
             

                </div>
                {
                    bookingTime &&
                    <div className="booking-row">
                        <div className="booking-row-head">
                            Booking Time
                        </div>
                        <div className="booking-row-days">
                            {new Date(bookingTime).toLocaleTimeString('en-US')}
                        </div>

                    </div>
                }
                <div className="booking-row">
                <TextField id="outlined-basic" value={name} onChange={(e) => setName(e.target.value)} label="Name" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="booking-row">
                <TextField id="outlined-basic" value={age} onChange={(e) => setAge(e.target.value)} label="Age" type="number" variant="outlined" fullWidth className='input' />
                </div>

                <div className="bttn">
                    <button onClick={() => setShowBookNow(false)}>Cancel</button>
                    <button onClick={handleBooking} disabled={!validForm()} >Book Now</button>

                </div>
            </div>
        </div>
        </>
    )
}

export default BookNow