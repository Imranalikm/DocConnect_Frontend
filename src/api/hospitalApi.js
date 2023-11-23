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

