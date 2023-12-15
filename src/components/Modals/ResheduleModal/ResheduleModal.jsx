import React, { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../../axios/axiosInstance'
import '../BookNow/BookNow'
import Swal from 'sweetalert2'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function ResheduleModal({ doctorId, bookingId,setShowResheduleModal, refresh, setRefresh}) {
    const [daysAvailable, setDaysAvailable] = useState([])
    const [bookDate, setBookDate] = useState('')
    const [bookTimeSlot, setBookTimeSlot] = useState('')
    const [bookingTime, setBookingTime] = useState("")
    const [times, setTimes] = useState([])
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

    const validForm = () => {
        if (bookDate === "" || bookTimeSlot === "" ) {
            
            return false;
        }
        return true;
    }
    const handleResheduleBooking = async () => {
        try {
            const { data } = await axiosInstance.patch("user/reshedule", {
                bookingId,
                bookDate,
                bookTimeSlot,
                online,
            });
            if (data.err) {
                toast.error(data.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else {
                toast.success('Successfully Rescheduled', {
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
            setShowResheduleModal(false);
            setRefresh(!refresh);
        }
    };
    
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    useEffect(() => {
        (
            async function () {
                
                const { data: scheduleData } = await axiosInstance.get("/user/doctor/schedule/" + doctorId);

console.log(scheduleData);

if (!scheduleData.err) {
    const numDaysToCheck = 9;  
    let tempDaysAvailable = [];

    for (let n = 1; n <= numDaysToCheck; n++) {
        const currentDate = new Date();
        const dateToCheck = new Date(currentDate.setDate(currentDate.getDate() + n));

        console.log(dateToCheck);

        const day = dateToCheck.getDay();
        console.log(day);
        console.log(scheduleData.schedule[days[day]]);

        if (scheduleData.schedule[days[day]][0]) {
            console.log(dateToCheck, scheduleData.schedule[days[day]]);
            const { data } = await axiosInstance.post("/user/check-time", {
                date: dateToCheck,
                schedule: scheduleData.schedule[days[day]],
            });

            console.log(data);

            if (!data.err) {
                tempDaysAvailable.push({ ...data.result });
            }
        }
    }

    console.log(tempDaysAvailable);
    setDaysAvailable([...tempDaysAvailable]);
}

            }
        )()
    }, [doctorId,refresh])

   
   

    return (
        <div className="book-now-main">
            <div className="booking-container">
                <div className="booking-row headr">
                    <h4>Reschedule Your Booking</h4>
                </div>
                <div className="booking-row">
                    <div className="booking-row-head">Appointment available</div>
                    <div className="booking-row-days"> {
                            daysAvailable.map((item, index) => {
                                return <div className="booking-row-day" key={index}>
                                    <input type="radio" id={"d" + index} name='day' value={item.date} onChange={(e) => handleDateChange(e, index)} required />
                                    <label htmlFor={"d" + index}>{new Date(item.date).toLocaleDateString()}</label>
                                </div>
                            })
                        }</div>
                </div>
                <div className="booking-row">
                    <div className="booking-row-head">Time</div>
                    <div className="booking-row-days">{
                            times.map((item, index) => {
                                return <div className="booking-row-day" >
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
                        }</div>
                </div>
                <div className="booking-row">
                    
                    <div className="booking-row-days"></div>
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
                <div className="bttn">
                    <button onClick={() => setShowResheduleModal(false)} >Cancel</button>
                    <button onClick={handleResheduleBooking} disabled={!validForm()}>
                        Reschedule Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResheduleModal