import React, { useEffect, useReducer } from 'react';
import { Container } from 'react-bootstrap';
import '../HospitalSchedule/hospitalschedule.css';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { scheduleReducer } from '../../reducers/scheduleReducer';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import DoctorHeader from '../DoctorHeader/DoctorHeader';
import DoctorSidebar from '../DoctorSidebar/DoctorSidebar';
import { useSelector } from 'react-redux';

export default function DoctorSchedule() {
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

  const doctorId = useSelector((state) => state.doctor.details._id);
  
 
  const [scheduleState, scheduleDispatch] = useReducer(scheduleReducer, scheduleInitialState);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        if (doctorId) {
          const { data } = await axiosInstance.get(`/doctor/schedule`);
          if (!data.err) {
            scheduleDispatch({ type: 'all', payload: data.schedule });
          }
        }
      } catch (error) {
        console.error('Error fetching doctor schedule:', error);
      }
    };

    fetchSchedule();
  }, [doctorId]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="admin-home">
        <DoctorHeader />
        <div className="admin-main">
          <DoctorSidebar page={'schedule'} />
          <div className="admin-container">
            <Container fluid>
              <h4>Schedule</h4>
              <div className="doctor-schedule-main">
                <div className="doctor-schedule-container">
                  {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                    <div key={day} className="time-inputs-item">
                      <h5>{day.toUpperCase()}</h5>
                      <div className="time-inputs">
                        <div className="time-input">
                          <DemoItem label="Start Time"></DemoItem>
                        </div>
                        <div className="time-input">
                          <DemoItem label="End Time"></DemoItem>
                        </div>
                        <div className="time-input">
                          <DemoItem label="Slot"></DemoItem>
                        </div>
                      </div>
                      {scheduleState[day].map((item, index) => (
                        <div className="time-inputs mt-2" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className="time-picker" readOnly value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className="time-picker" readOnly value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField
                              id="outlined-basic"
                              size="small"
                              readOnly
                              type="number"
                              value={item.slot}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                      {/* Add a box for free text when there is no allotted slot */}
                      {scheduleState[day].length === 0 && (
                        <div className="time-inputs mt-2">
                          <div className="time-input">
                          
                              <TextField
                              id="outlined-basic"
                              size="small"
                              readOnly
                              type="number"
                              value=""
                              variant="outlined"
                            />
                            
                          </div>
                          <div className="time-input">
                          
                              <TextField
                              id="outlined-basic"
                              size="small"
                              readOnly
                              type="number"
                              value=""
                              variant="outlined"
                            />
                            
                          </div>
                          <div className="time-input">
                          
                              <TextField
                              id="outlined-basic"
                              size="small"
                              readOnly
                              type="number"
                              value=""
                              variant="outlined"
                            />
                            
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
