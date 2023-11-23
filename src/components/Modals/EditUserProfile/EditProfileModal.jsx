import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axiosInstance from '../../../axios/axiosInstance'
import { ClipLoader } from 'react-spinners';
import '../../../assets/css/modalForm.css';

export default function EditUserProfile({ setShowModal, setRefresh, refresh, user }) {
  const [loading, setLoading] = useState({
    submit: false,
  });
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [finalImage, setFinalImage] = useState(null);
  const [errMessage, setErrMessage] = useState('');


  const isValidFileUploaded = (file) => {
    const validExtensions = ['png', 'jpeg', 'jpg'];
    const fileExtension = file.type.split('/')[1];
    return validExtensions.includes(fileExtension);
  };

  const handleImage = (e) => {
    if (isValidFileUploaded(e.target.files[0])) {
      setImage(e.target.files[0]);
      setErrMessage('');
      imageToBase(e.target.files[0]);
    } else {
      setErrMessage('Invalid File type');
    }
  };

  const imageToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFinalImage(reader.result);
    };
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    const { data } = await axiosInstance.patch("/user/profile", { image: finalImage, name, email });
    if (data.err) {
      setErrMessage(data.message);
    }
    setLoading({ ...loading, submit: false });
    setRefresh(!refresh);
    setShowModal(false);
  }

  function validForm() {
    if (name.trim() === '' || email.trim() === '') {
      return false;
    }
    return true;
  }

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, []);


  return (
    <div className="modal-form">
      <form className="modal-container" onSubmit={handleSubmit}>
        <div className="modal-form-row head">
          <h5>Edit Profile</h5>
        </div>

        <div className="modal-form-row">
          <TextField
            id="outlined-basic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            type="text"
            variant="outlined"
            fullWidth
            className="input"
          />
        </div>
        <div className="modal-form-row">
          <TextField
            id="outlined-basic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            className="input"
          />
        </div>
        <div className="modal-form-row">
          <label htmlFor="formFile" className="mb-3 w-100">
            Input profile photo
          </label>
          <input type="file" id="formFile" accept="image/*" className="w-100" onChange={handleImage} />
        </div>
        {finalImage && (
          <div className="modal-form-row image full">
            <img src={finalImage} alt="" />
          </div>
        )}

        {errMessage && (
          <div className="modal-form-row">
            <b>{errMessage}</b>
          </div>
        )}
        <div className="modal-form-row">
          <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-dark w-50">
            Close
          </button>
          <button type="submit" disabled={!validForm()} className="btn btn-dark w-50">
            Update
            <ClipLoader size={20} color="white" loading={loading.submit} />
          </button>
        </div>
      </form>
    </div>
  );
}
