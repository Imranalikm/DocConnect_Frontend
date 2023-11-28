import React, { useEffect, useReducer, useState } from 'react';
import { Container } from 'react-bootstrap';
import HospitalHeader from '../HospitalHeader/HospitalHeader';
import HospitalSidebar from '../HospitalSidebar/HospitalSidebar';
import './hospitalschedule.css';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { scheduleReducer } from '../../reducers/scheduleReducer';
import { TextField } from '@mui/material';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HospitalSchedule() {
  const [clicked, setCLicked] = useState(false);
  const navigate = useNavigate();
  const scheduleInititalState = {
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

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get('/hospital/doctor/schedule/' + doctorId);
      if (!data.err) {
        scheduleDispatch({ type: 'all', payload: data.schedule });
      }
    })();
  }, []);

  const [scheduleState, scheduleDispatch] = useReducer(scheduleReducer, scheduleInititalState);
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

  const validateRow = (day) => {
    const { startDate, endDate, slot } = dayState[day];
    return !startDate || !endDate || slot <= 0;
  };

  const addTime = (day) => {
    scheduleDispatch({ type: day, payload: dayState[day] });
    setDayState((prevState) => ({
      ...prevState,
      [day]: { ...initialDayState },
    }));
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
                              size="small"
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
                        <button disabled={validateRow(day)} className={'button'} onClick={() => addTime(day)}>
                          Add Time
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
