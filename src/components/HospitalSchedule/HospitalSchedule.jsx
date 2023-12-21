import React, { useEffect, useReducer, useState } from 'react';
import { Container } from 'react-bootstrap';
import HospitalHeader from '../HospitalHeader/HospitalHeader';
import HospitalSidebar from '../HospitalSidebar/HospitalSidebar';
import './hospitalschedule.css';
import dayjs from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { scheduleReducer } from '../../reducers/scheduleReducer';
import { TextField } from '@mui/material';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAddComment } from 'react-icons/md';

export default function HospitalSchedule() {
  const [clicked, setCLicked] = useState(false);
  const navigate = useNavigate();
  const scheduleInitialState = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  };
  const { id: doctorId } = useParams();

  const handleClick = () => {
    setCLicked(!clicked);
  };

  const validateRow = (day) => {
    const { startDate, endDate, slot } = dayState[day];
  
    const isStartTimeEqualEndTime = startDate && endDate && dayjs(startDate).isSame(endDate);
    const isStartTimeGreaterThanEndTime = startDate && endDate && dayjs(startDate).isAfter(endDate);
    const isTimeDifferenceLessThan20Minutes = startDate && endDate && dayjs(endDate).diff(startDate, 'minutes') < 20;
    const isNightSchedule = startDate && endDate && dayjs(startDate).hour() >= 0 && dayjs(endDate).hour() <= 6;
  
    const isInvalidOriginal = !startDate || !endDate || slot < 0 || slot > 5;
  
    if (isInvalidOriginal) {
      return 'Please fill in all fields and ensure slot is between 0 and 5.';
    } else if (isStartTimeEqualEndTime) {
      return 'Start time cannot be equal to end time.';
    } else if (isStartTimeGreaterThanEndTime) {
      return 'Start time cannot be greater than end time.';
    } else if (isTimeDifferenceLessThan20Minutes) {
      return 'Time difference must be at least 20 minutes.';
    } else if (isNightSchedule) {
      return 'Night schedule (12:00 AM to 6:00 AM) is not allowed.';
    }
  
    return '';
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axiosInstance.get('/hospital/doctor/schedule/' + doctorId);
        if (!data.err) {
          scheduleDispatch({ type: 'all', payload: data.schedule });
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    })();
  }, []);

  const [scheduleState, scheduleDispatch] = useReducer(scheduleReducer, scheduleInitialState);

  const initialDayState = {
    startDate: null,
    endDate: null,
    slot: 0,
  };

  const [dayState, setDayState] = useState({
    mon: { ...initialDayState },
    tue: { ...initialDayState },
    wed: { ...initialDayState },
    thu: { ...initialDayState },
    fri: { ...initialDayState },
    sat: { ...initialDayState },
    sun: { ...initialDayState },
  });

  const addTime = (day) => {
    const validationMessage = validateRow(day);
  
    if (validationMessage) {
      toast.error(validationMessage);
    } else {
      // Check if the time slot already exists in the schedule for the selected day
      const isDuplicate = scheduleState[day].some(
        (item) =>
          dayjs(item.startDate).isSame(dayState[day].startDate) &&
          dayjs(item.endDate).isSame(dayState[day].endDate) &&
          item.slot === dayState[day].slot
      );
  
      if (isDuplicate) {
        toast.error('This time slot already exists in the schedule for the selected day.');
      } else {
        scheduleDispatch({ type: day, payload: dayState[day] });
        setDayState((prevState) => ({
          ...prevState,
          [day]: { ...initialDayState },
        }));
      }
    }
  };
  

  const removeTime = (day, index) => {
    scheduleDispatch({ type: `rm${day.charAt(0).toUpperCase()}${day.slice(1)}`, payload: index });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axiosInstance.patch('/hospital/doctor/schedule', {
        doctorId,
        ...scheduleState,
      });

      if (data.err) {
        toast.error('Failed! Something went wrong. Please try again.');
      } else {
        toast.success('Success! Schedule successfully saved.');
        navigate('/account/hospital/doctor');
      }
    } catch (error) {
      console.error('Error submitting schedule:', error);
      toast.error('Error! Please try again.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="admin-home">
        <HospitalHeader handleClick={handleClick} />
        <div className="admin-main">
          <HospitalSidebar page={'doctor'} clicked={clicked} />
          <div className="admin-container">
            <Container fluid>
              <h4>Schedule Doctor</h4>
              <div className="doctor-schedule-main">
                <div className="doctor-schedule-container">
                  {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                    <div key={day} className="time-inputs-item">
                      <h5>{day.toUpperCase()}</h5>
                      {scheduleState[day].map((item, index) => (
                        <div className="time-inputs mt-2" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className="time-picker" disabled value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className="time-picker" disabled value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField
                              id="outlined-basic"
                              size="large"
                              disabled
                              type="number"
                              value={item.slot}
                              variant="outlined"
                            />
                          </div>
                          <button onClick={() => removeTime(day, index)}>
                            <RiDeleteBin5Line />
                          </button>
                        </div>
                      ))}
                      <hr />
                      <div className="time-inputs">
                        <div className="time-input">
                          <MobileTimePicker
                            className="time-picker"
                            onChange={(item) =>
                              setDayState((prevState) => ({
                                ...prevState,
                                [day]: { ...prevState[day], startDate: item },
                              }))
                            }
                          />
                        </div>
                        <div className="time-input">
                          <MobileTimePicker
                            className="time-picker"
                            onChange={(item) =>
                              setDayState((prevState) => ({
                                ...prevState,
                                [day]: { ...prevState[day], endDate: item },
                              }))
                            }
                          />
                        </div>
                        <div className="time-input">
                          <TextField
                            id="outlined-basic"
                            size="small"
                            type="number"
                            value={dayState[day].slot}
                            onChange={(e) =>
                              setDayState((prevState) => ({
                                ...prevState,
                                [day]: { ...prevState[day], slot: e.target.value },
                              }))
                            }
                            variant="outlined"
                          />
                        </div>
                        <button className={'button'} onClick={() => addTime(day)}>
                          <MdAddComment /> Add Time
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleSubmit}>Save Changes</button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
