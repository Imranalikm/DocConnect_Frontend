import axios from "axios";
import Swal from "sweetalert2";

export async function getHospitalProfile(){
    const {data} = await axios.get("/hospital/profile/");
    if(data.err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          })
    }
    return data
}

