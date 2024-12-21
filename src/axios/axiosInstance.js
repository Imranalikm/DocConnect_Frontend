import axios from 'axios';

const instance = axios.create({
  baseURL: "https://docconnect.imranalikm.live",
  withCredentials: true,
});


instance.interceptors.request.use(
    (config) => {    
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

instance.interceptors.response.use( response => response ,
    error => Promise.reject(error.response.data)
    )


export default instance;