import {
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    FormControl,
    TextField,
  } from "@mui/material";
  import axiosInstance from '../../../axios/axiosInstance'
  import React, { useEffect, useState } from "react";
  import Swal from "sweetalert2";
  import { addDoctorEMR, getDoctorEMR } from "../../../api/doctorApi";
  import "./AddEMR.css";
  
  export default function AddEMR({booking, setShowAddEmr, refresh, setRefresh}) {
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [hospitalId, sethospitalId] = useState("");
    const [prescription, setPrescription] = useState("");
  
    const handleSave=async ()=>{
      const data = await addDoctorEMR(booking, weight, prescription, gender)
      setRefresh(!refresh)
      Swal.fire(
        'Success!',
        'Successfully Added EMR',
        'success'
      )
      setShowAddEmr(false)
    }
    useEffect(()=>{
      (
        async function(){
          const data=await getDoctorEMR(booking._id);
          if(!data.err && data.emr){
            setGender(data.emr.gender);
            setWeight(data.emr.weight)
            setPrescription(data.emr.prescription)
          }
        }
      )()
    },[])
    return (
      <div className="add-emr-main">
        <div className="add-emr-container">
          <div className="add-emr-row head">
            <h4>Medical Report</h4>
            {/* <b>International Hospital, tirur, 9809786756</b> */}
          </div>
          <div className="add-emr-row header mt-3">
            <div className="emr-header-item">
              <TextField
                id="filled-basic"
                label="Patient Name"
                variant="filled"
                fullWidth
                readOnly
                value={booking.patientName}
              />
            </div>
            <div className="emr-header-item">
              <TextField
                id="filled-basic"
                label="Age"
                variant="filled"
                fullWidth
                readOnly
                value={booking.age}
              />
            </div>
            <div className="emr-header-item">
              <TextField
                id="filled-basic"
                label="Date"
                variant="filled"
                fullWidth
                readOnly
                value={new Date(booking.date).toLocaleDateString()}
              />
            </div>
            <div className="emr-header-item">
              <TextField
                id="filled-basic"
                label="Time"
                variant="filled"
                fullWidth
                readOnly
                value={new Date(booking.time).toLocaleTimeString("en-US")}
              />
            </div>
          </div>
          <div className="add-emr-row header">
            <div className="emr-header-item">
              <TextField
                id="filled-basic"
                label="Doctor Name"
                variant="filled"
                fullWidth
                readOnly
                value={"Dr. Fasil"}
              />
            </div>
            <div className="emr-header-item">
              <TextField
                id="filled-basic"
                label="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                variant="filled"
                fullWidth
              />
            </div>
            <div className="emr-header-item">
              <FormControl
                variant="filled"
                fullWidth
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Gender
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                <MenuItem value="" >
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            
          </div>
          <hr />
          <div className="add-emr-row header">
            <div className="emr-header-item">
              <TextField
                id="filled-multiline-static"
                placeholder="Prescrptions"
                multiline
                maxRows={20}
                minRows={15}
                fullWidth
                variant="filled"
                value={prescription}
                onChange={(e)=>setPrescription(e.target.value)}
              />
            </div>
          </div>
          <div className="add-emr-row btn">
            <button className="btn btn-outline-dark" onClick={()=>setShowAddEmr(false)}>Cancel</button>
            <button className="btn btn-dark" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }
  