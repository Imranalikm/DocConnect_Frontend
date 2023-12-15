import React, { useEffect, useState } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import formatDate from "../../../helpers/dateFormat";
import { getUserEMR } from "../../../api/userApi";
import logo from "../../../assets/images/emrlogo.png";
import { FaCloudDownloadAlt } from "react-icons/fa";
import "./ViewEMR.css"; // Create a new CSS file for styling

export default function ViewEmr({ booking, setShowAddEmr }) {
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [prescription, setPrescription] = useState("");
  const [noData, setNoData] = useState(true);
  const [data, setData] = useState({});

  const downloadReport = async () => {
    if (data) {
      const doc = new jsPDF();
      doc.setFontSize(18);

      doc.text("Medical Report", 70, 20);

      autoTable(doc, {
        theme: "striped",
        head: [["Details", ""]],
        body: [
          ["Name", data?.patientName],
          ["Doctor Name", data?.doctorId?.name],
          ["Age", data?.age],
          ["Gender", data?.gender],
          ["Weight", data?.weight],
          ["Date", formatDate(data?.date)],
        ],
        startY: 30,
      });

      doc.autoTable({
        theme: "striped",
        head: [["Prescription"]],
        body: [[data?.prescription]],
        startY: doc.lastAutoTable.finalY + 10,
      });

      doc.save("Prescription.pdf");
    }
  };

  useEffect(() => {
    (async function () {
      const data = await getUserEMR(booking._id);
      if (!data.err && data.emr) {
        setData(data.emr);
        setNoData(false);
        setGender(data.emr.gender);
        setWeight(data.emr.weight);
        setPrescription(data.emr.prescription);
      }
    })();
  }, [booking]);

  return (
    <div className="view-emr-main">
      <div className="view-emr-container">
        <div className="view-emr-header">
          <img src={logo} alt="logo" className="emr-logo" />
          <h4>Medical Report</h4>
        </div>
        <div className="view-emr-details">
          <div className="emr-detail-item">
            <TextField
              label="Patient Name"
              variant="outlined"
              color="secondary"
              fullWidth
              readOnly
              value={booking.patientName}
            />
          </div>
          <div className="emr-detail-item">
            <TextField
              label="Age"
              variant="outlined"
              color="secondary"
              fullWidth
              readOnly
              value={booking.age}
            />
          </div>
          <div className="emr-detail-item">
            <TextField
              label="Date"
              variant="outlined"
              color="secondary"
              fullWidth
              readOnly
              value={new Date(booking.date).toLocaleDateString()}
            />
          </div>
          <div className="emr-detail-item">
            <TextField
              label="Time"
              variant="outlined"
              color="secondary"
              fullWidth
              readOnly
              value={new Date(booking.time).toLocaleTimeString("en-US")}
            />
          </div>
          <div className="emr-detail-item">
            <TextField
              label="Doctor Name"
              variant="outlined"
              color="secondary"
              fullWidth
              readOnly
              value={booking.doctorId?.name}
            />
          </div>
          <div className="emr-detail-item">
            <TextField
              label="Weight"
              variant="outlined"
              color="secondary"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
              readOnly
            />
          </div>
          <div className="emr-detail-item">
            <FormControl variant="outlined" fullWidth>
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
        <div className="view-emr-prescription">
          <TextField
            label="Prescriptions"
            placeholder="Prescriptions"
            multiline
            maxRows={20}
            minRows={15}
            fullWidth
            variant="outlined"
            color="secondary"
            value={prescription}
            readOnly
            onChange={(e) => setPrescription(e.target.value)}
          />
        </div>
        <div className="view-emr-buttons">
          <button
            className="btn btn-outline-dark"
            onClick={() => setShowAddEmr(false)}
          >
            Close
          </button>
          <button
            className="btn btn-dark"
            disabled={noData}
            onClick={downloadReport}
          >
            Download 
            
            
          </button>
        </div>
      </div>
    </div>
  );
}
