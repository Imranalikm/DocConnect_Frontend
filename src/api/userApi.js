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