import axiosInstance from "../axios/axiosInstance";



export const getDoctorMessages = (id) => axiosInstance.get(`/doctor/message/${id}`);

export const addDoctorMessage = (data) => axiosInstance.post('/doctor/message/', data);