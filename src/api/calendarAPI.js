import axios from "axios";
import { GetEnvVariables } from "../helpers/GetEnvVariables";

const { VITE_API_URL } = GetEnvVariables();

export const calendarAPI = axios.create({
  baseURL: VITE_API_URL,
});

calendarAPI.interceptors.request.use((config) => {
    
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default calendarAPI;
