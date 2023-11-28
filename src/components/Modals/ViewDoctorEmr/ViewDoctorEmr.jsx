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
  import { getDoctorEMR } from "../../../api/doctorApi";
  import "../AddEMR/AddEMR.css";
  import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import formatDate from "../../../helpers/dateFormat";

  export default function ViewDoctorEmr({booking, setShowAddEmr}) {
    console.log(booking)
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [prescription, setPrescription] = useState("");
    const [noData, setNoData]=useState(true)
    const [data, setData]=useState({})
    const [doctorName,setDoctorName]=useState("")
    const downloadReport=async ()=>{
      if(data){
        const doc = new jsPDF();
        doc.setFontSize(13);
       
        autoTable(doc, {
            theme: 'grid',
            head: [["Details", ""]],
            body: [
              ["Name", data?.patientName],
              ["Doctor Name", data?.doctorId?.name],
              ["Age", data?.age],
              ["Gender", data?.gender],
              ["Weight", data?.weight],
              ["Date", formatDate(data?.date)],
            ],
            startY: 20

        })
        doc.autoTable({
            theme: 'grid',
            head: [['Prescription']],
            body: [[data?.prescription]],
            startY: doc.lastAutoTable.finalY + 10
        })

        doc.save("a4.pdf");  
      }
    }
    useEffect(()=>{
      (
        async function(){
          const data=await getDoctorEMR(booking._id);
          console.log(data)
          if(!data.err && data.emr){
            setData(data.emr)
            setNoData(false)
            setGender(data.emr.gender);
            setWeight(data.emr.weight);
            setDoctorName(data.emr.doctorId.name)
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
            <b></b>
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
                value={doctorName}
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
                readOnly
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
                  readOnly
                >
                  <MenuItem value="">
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
                readOnly
                onChange={(e)=>setPrescription(e.target.value)}
              />
            </div>
          </div>
          <div className="add-emr-row btn">
            <button className="btn btn-outline-dark" onClick={()=>setShowAddEmr(false)}>Back</button>
            <button className="btn btn-dark" disabled={noData} onClick={downloadReport}>Print</button>
          </div>
        </div>
      </div>
    );
  }
  