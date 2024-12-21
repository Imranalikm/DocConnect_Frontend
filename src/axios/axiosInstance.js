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

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject(error.response.data); // Use response data if available
    }
    return Promise.reject({ message: "Network Error", ...error }); // Provide fallback error object
  }
);

export default instance;
