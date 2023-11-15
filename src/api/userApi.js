import axios from "axios";
import Swal from "sweetalert2";

export async function getHospital(id){
    const {data} = await axios.get("/user/hospital/" + id);
    if(data.err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          })
    }
    return data
}

export async function getDoctor(id){
    const {data} = await axios.get("/user/doctor/" + id);
    if(data.err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          })
    }
    return data
}