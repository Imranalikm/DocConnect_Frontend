import axiosInstance from '../axios/axiosInstance'
import Swal from "sweetalert2";



export async function getHospitalProfile(){
    const {data} = await axiosInstance.get("/hospital/profile/");
    if(data.err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          })
    }
    return data
}

export async function getDashboardDetails(){
    const {data} = await axiosInstance.get("/hospital/dashboard") 
    if(data.err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          })
    }
    return data
}

export async function getHospitalBookings(name){
    const {data} = await axiosInstance.get("/hospital/booking?name="+name);
    if(data.err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          })
    }
    return data
}

export async function getHospitalComplaints(name){
    const {data} = await axiosInstance.get("/hospital/complaints");
    if(data.err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          })
    }
    return data
}


export async function withdrawHospitalWallet(accountHolder, accountNo, branch, ifsc){
    const {data} = await axiosInstance.post("/hospital/withdraw", {
        accountHolder, accountNo, branch, ifsc
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