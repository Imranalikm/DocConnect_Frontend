import axiosInstance from "../axios/axiosInstance";

export const createDoctorChat = (data) => axiosInstance.post('/doctor/chat', data);

export const getDoctorChats = (id) => axiosInstance.get(`/doctor/chat/${id}`);

export const findDoctorChat = (userId, doctorId) => axiosInstance.get(`/doctor/chat/find/${userId}/${doctorId}`);