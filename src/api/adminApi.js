import axiosInstance from "../axios/axiosInstance"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export async function getAdminComplaints(){

    try{
        const {data} =await axiosInstance.get("/admin/complaints");
        return data
    }catch(error){
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw error;
    }
   
}