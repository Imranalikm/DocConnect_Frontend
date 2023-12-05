import axiosInstance from "../axios/axiosInstance";

export const createChat = (data) => axiosInstance.post('/chat/', data);

export const getUserChats = (id) => axiosInstance.get(`/chat/${id}`);


export const findChat = (userId, doctorId) => axiosInstance.get(`/chat/find/${userId}/${doctorId}`);