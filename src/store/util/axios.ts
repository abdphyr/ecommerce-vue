import axios from "axios";

export const ax = axios.create();
  ax.interceptors.request.use(
    (config) => {
      config.baseURL = "http://127.0.0.1:8000/api";
      const auth = localStorage.getItem("auth")
      const headers = config.headers;
      if (auth && headers) {
        const parsedAuth = JSON.parse(auth) //as IAuth;
        headers['Authorization'] = 'Bearer ' + parsedAuth.token;
        // headers['Content-Type'] = 'application/json';
      }
      config.headers = headers;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    })