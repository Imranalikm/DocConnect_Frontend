import React, { useEffect, useReducer, useState } from 'react'
import { Container } from 'react-bootstrap';
import HospitalHeader from '../HospitalHeader/HospitalHeader';
import HospitalSidebar from '../HospitalSidebar/HospitalSidebar';
import './hospitalschedule.css'
import dayjs from 'dayjs'; 
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { scheduleReducer } from '../../reducers/scheduleReducer';
import { TextField } from '@mui/material';
import { RiDeleteBin4Line, RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance'
import Swal from 'sweetalert2';

export default function HospitalSchedule() {
  const [clicked, setCLicked] = useState(false)
  const navigate = useNavigate()
  const scheduleInititalState={
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    }
  const { id: doctorId } = useParams()
  const handleClick = () => {
    setCLicked(!clicked)
  }
  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get("/hospital/doctor/schedule/" + doctorId);
      if(!data.err){
        scheduleDispatch({type:'all', payload:data.schedule})
      }
    })()
  }, [])
  
  const [scheduleState, scheduleDispatch] = useReducer(scheduleReducer, scheduleInititalState)
  const [mon, setMon] = useState({ startDate: null, endDate: null, slot: 0 })
  const [tue, setTue] = useState({ startDate: null, endDate: null, slot: 0 })
  const [wed, setWed] = useState({ startDate: null, endDate: null, slot: 0 })
  const [thu, setThu] = useState({ startDate: null, endDate: null, slot: 0 })
  const [fri, setFri] = useState({ startDate: null, endDate: null, slot: 0 })
  const [sat, setSat] = useState({ startDate: null, endDate: null, slot: 0 })
  const [sun, setSun] = useState({ startDate: null, endDate: null, slot: 0 })
  const [time, setTime] = useState(null)

  const validateRow = (item) => {
    let obj = eval(item)
    if (!obj.startDate || !obj.endDate || obj.slot <= 0) {
      return true;
    }
    return false
  }

  const addTime = (type) => {
    let obj = eval(type)
    scheduleDispatch({ type, payload: obj })
    let setState= eval('set'+type.charAt(0).toUpperCase()+ type.slice(1))
    setState({ startDate: null, endDate: null, slot: 0 })
  }
  let count = 0
  const removeTime = (type, index) => {
    count++;
    scheduleDispatch({ type, payload: index })
  }
  const handleSubmit = async() => {
    const {data} = await axiosInstance.patch("/hospital/doctor/schedule",{
      doctorId,
      ...scheduleState
    })
    if(data.err){
      Swal.fire(
        'Failed!',
        'Something Went Wrong',
        'plaese try again'
        )
      }
      Swal.fire(
        'Success!',
        'Successfully Saved ',
        'success'
      )
      navigate("/account/hospital/doctor")
  }

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
                  {/* <div className="time-inputs-item">
                  </div> */}
                  <div className="time-inputs-item">
                    <h5>MONDAY</h5>
                    <div className="time-inputs">
                      <div className="time-input">
                        <DemoItem label="Start Time" >
                        </DemoItem>
                      </div>
                      <div className="time-input">
                        <DemoItem label="End Time" >
                        </DemoItem>
                      </div>
                      <div className="time-input">
                        <DemoItem label="Slot" >
                        </DemoItem>
                      </div>
                      <div></div>
                    </div>
                    {
                      scheduleState.mon.map((item, index) => {
                        return (<div className="time-inputs mt-2" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled
                              value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField id="outlined-basic" size='small' disabled
                              type='number'
                              value={item.slot}
                              variant="outlined" />
                          </div>
                          <button onClick={() => removeTime('rmMon', index)} >Delete</button>
                        </div>)

                      })
                    }
                    <hr />
                    <div className="time-inputs">
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setMon({ ...mon, startDate: item })} />
                      </div>
                      <div className="time-input">
                        <MobileTimePicker className='time-picker'
                          onChange={(item) => setMon({ ...mon, endDate: item })} />
                      </div>
                      <div className="time-input">
                        <TextField id="outlined-basic" size='small'
                          type='number'
                          value={mon.slot}
                          onChange={(e) => setMon({ ...mon, slot: e.target.value })}
                          variant="outlined" />
                      </div>
                      <button disabled={validateRow('mon')} className={'button'} onClick={() => addTime('mon')}>Add Time</button>
                    </div>
                  </div>
                  <div className="time-inputs-item">
                    <h5>TUESDAY</h5>
                    {
                      scheduleState.tue.map((item, index) => {
                        return (<div className="time-inputs" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled
                              value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField id="outlined-basic" size='small' disabled
                              type='number'
                              value={item.slot}
                              variant="outlined" />
                          </div>
                          <button onClick={() => removeTime('rmTue', index)} ><RiDeleteBin5Line /></button>
                        </div>)

                      })
                    }
                    <hr />

                    <div className="time-inputs">
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setTue({ ...tue, startDate: item })} />
                      </div>
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setTue({ ...tue, endDate: item })} />
                      </div>
                      <div className="time-input">
                        <TextField id="outlined-basic" size='small'
                          type='number'
                          value={tue.slot}
                          onChange={(e) => setTue({ ...tue, slot: e.target.value })}
                          variant="outlined" />
                      </div>
                      <button disabled={validateRow('tue')} className={'button'} onClick={() => addTime('tue')}>Add Time</button>
                    </div>
                  </div>
                  <div className="time-inputs-item">
                    <h5>WEDNESDAY</h5>
                    {
                      scheduleState.wed.map((item, index) => {
                        return (<div className="time-inputs mt-2" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled
                              value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField id="outlined-basic" size='small' disabled
                              type='number'
                              value={item.slot}
                              variant="outlined" />
                          </div>
                          <button onClick={() => removeTime('rmWed', index)} ><RiDeleteBin5Line /></button>
                        </div>)

                      })
                    }
                    <hr />

                    <div className="time-inputs">
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setWed({ ...wed, startDate: item })} />
                      </div>
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setWed({ ...wed, endDate: item })} />
                      </div>
                      <div className="time-input">
                        <TextField id="outlined-basic" size='small'
                          type='number'
                          value={wed.slot}
                          onChange={(e) => setWed({ ...wed, slot: e.target.value })}
                          variant="outlined" />
                      </div>
                      <button disabled={validateRow('wed')} className={'button'} onClick={() => addTime('wed')}>Add Time</button>
                    </div>
                  </div>
                  <div className="time-inputs-item">
                    <h5>THURSDAY</h5>
                    {
                      scheduleState.thu.map((item, index) => {
                        return (<div className="time-inputs mt-2" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled
                              value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField id="outlined-basic" size='small' disabled
                              type='number'
                              value={item.slot}
                              variant="outlined" />
                          </div>
                          <button onClick={() => removeTime('rmThu', index)} ><RiDeleteBin5Line /></button>
                        </div>)

                      })
                    }
                    <hr />

                    <div className="time-inputs">
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setThu({ ...thu, startDate: item })} />
                      </div>
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setThu({ ...thu, endDate: item })} />
                      </div>
                      <div className="time-input">
                        <TextField id="outlined-basic" size='small'
                          type='number'
                          value={thu.slot}
                          onChange={(e) => setThu({ ...thu, slot: e.target.value })}
                          variant="outlined" />
                      </div>
                      <button disabled={validateRow('thu')} className={'button'} onClick={() => addTime('thu')}>Add Time</button>
                    </div>
                  </div>
                  <div className="time-inputs-item">
                    <h5>FRIDAY</h5>
                    {
                      scheduleState.fri.map((item, index) => {
                        return (<div className="time-inputs mt-2" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled
                              value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField id="outlined-basic" size='small' disabled
                              type='number'
                              value={item.slot}
                              variant="outlined" />
                          </div>
                          <button onClick={() => removeTime('rmFri', index)} ><RiDeleteBin5Line /></button>
                        </div>)

                      })
                    }
                    <hr />

                    <div className="time-inputs">
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setFri({ ...fri, startDate: item })} />
                      </div>
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setFri({ ...fri, endDate: item })} />
                      </div>
                      <div className="time-input">
                        <TextField id="outlined-basic" size='small'
                          type='number'
                          value={fri.slot}
                          onChange={(e) => setFri({ ...fri, slot: e.target.value })}
                          variant="outlined" />
                      </div>
                      <button disabled={validateRow('fri')} className={'button'} onClick={() => addTime('fri')}>Add Time</button>
                    </div>
                  </div>
                  <div className="time-inputs-item">
                    <h5>SATURDAY</h5>
                    {
                      scheduleState.sat.map((item, index) => {
                        return (<div className="time-inputs mt-2" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled
                              value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField id="outlined-basic" size='small' disabled
                              type='number'
                              value={item.slot}
                              variant="outlined" />
                          </div>
                          <button onClick={() => removeTime('rmSat', index)} ><RiDeleteBin5Line /></button>
                        </div>)

                      })
                    }
                    <hr />

                    <div className="time-inputs">
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setSat({ ...sat, startDate: item })} />
                      </div>
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setSat({ ...tue, endDate: item })} />
                      </div>
                      <div className="time-input">
                        <TextField id="outlined-basic" size='small'
                          type='number'
                          value={sat.slot}
                          onChange={(e) => setSat({ ...sat, slot: e.target.value })}
                          variant="outlined" />
                      </div>
                      <button disabled={validateRow('sat')} className={'button'} onClick={() => addTime('sat')}>Add Time</button>
                    </div>
                  </div>
                  <div className="time-inputs-item">
                    <h5>SUNDAY</h5>
                    {
                      scheduleState.sun.map((item, index) => {
                        return (<div className="time-inputs mt-2" key={index}>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled value={new Date(item.startDate)} />
                          </div>
                          <div className="time-input">
                            <MobileTimePicker className='time-picker' disabled
                              value={new Date(item.endDate)} />
                          </div>
                          <div className="time-input">
                            <TextField id="outlined-basic" size='small' disabled
                              type='number'
                              value={item.slot}
                              variant="outlined" />
                          </div>
                          <button onClick={() => removeTime('rmSun', index)} ><RiDeleteBin5Line /></button>
                        </div>)

                      })
                    }
                    <hr />

                    <div className="time-inputs">
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setSun({ ...sun, startDate: item })} />
                      </div>
                      <div className="time-input">
                        <MobileTimePicker className='time-picker' onChange={(item) => setSun({ ...sun, endDate: item })} />
                      </div>
                      <div className="time-input">
                        <TextField id="outlined-basic" size='small'
                          type='number'
                          value={sun.slot}
                          onChange={(e) => setSun({ ...sun, slot: e.target.value })}
                          variant="outlined" />
                      </div>
                      <button disabled={validateRow('sun')} className={'button'} onClick={() => addTime('sun')}>Add Time</button>
                    </div>
                  </div>
                  <button onClick={handleSubmit}>Save Changes</button>
                </div>

              </div>

            </Container>

          </div>
        </div>
      </div>
    </LocalizationProvider>
  )
}
