import axiosInstance from '../axios/axiosInstance'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export async function getHospital(id) {
  try {
    const { data } = await axiosInstance.get("/user/hospital/" + id);
    return data;
  } catch (error) {
    toast.error(error.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    throw error;
  }
}

export async function getDoctor(id) {
  try {
    const { data } = await axiosInstance.get("/user/doctor/" + id);
    return data;
  } catch (error) {
    toast.error(error.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    throw error;
  }
}


export async function addDoctorReview(rating, review, doctorId){
  const {data} = await axiosInstance.post('/user/feedback/doctor',{
      review, rating, doctorId
  })
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data
}

export async function addHospitalReview(rating, review, hospitalId){
  const {data} = await axiosInstance.post('/user/feedback/hospital',{
      review, rating, hospitalId
  })
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data
}

export async function getUserEMR(bookingId) {
  const {data} = await axiosInstance.get("/user/emr/"+bookingId)
  console.log(data)
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data;
}

export async function addComplaint(complaintAgainst, type, description){
  const {data} = await axiosInstance.post("/user/complaint", {complaintAgainst, type, description});
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data
}

export async function getAllDoctors(id){
  const {data} = await axiosInstance.get("/user/doctors");
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data
}

export async function getAllHospitals(id){
  const {data} = await axiosInstance.get("/user/hospitals");
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data
}

export async function cancelBooking(bookingId){
  const {data} = await axiosInstance.patch("/user/booking/cancel", {bookingId});
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data
}

export async function getTop3Doctors(bookingId){
  const {data} = await axiosInstance.get("/user/doctors/top");
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data
}

export async function getTop3Hospitals(bookingId){
  const {data} = await axiosInstance.get("/user/hospitals/top");
  if(data.err){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
  }
  return data
}