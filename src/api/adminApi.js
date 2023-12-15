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

export async function getAdminDashboardDetails(){
    try{
        const {data} =await axiosInstance.get("/admin/dashboard");
        return data
    }catch(error){
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw error;
    }
   
}

export async function getAdminRefundList(){
    try{
        const {data} =await axiosInstance.get("/admin/booking/refunds");
        return data
    }catch(error){
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw error;
    }
}


export async function refundComplete(id){
    try{
        const {data} =await axiosInstance.post("/admin/booking/refund/complete", {id});
        return data
    }catch(error){
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw error;
    }
   
}


export async function getAdminWitdrawals(){
    try{
        const {data} =await axiosInstance.get("/admin/withdrawals");
        return data
    }catch(error){
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw error;
    }

}
export async function withdrawComplete(hospitalId){
    try{
        const {data} =await axiosInstance.post("/admin/withdrawal", {id:hospitalId});
        return data
    }catch(error){
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw error;
    }
}