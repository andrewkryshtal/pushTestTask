import { checkToken } from "@/helpers/checkToken";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// We can check calidity of tokens on every request, according what do we want to achieve

// axiosInstance.interceptors.request.use(
//   (config) => {
//     checkToken();
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // api returns 401 or 400 on incorrect user :(
    return Promise.reject(error);
  }
);

export { axiosInstance };
