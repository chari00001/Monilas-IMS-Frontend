// utils/api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Define the Axios request configuration with appropriate types
const config: AxiosRequestConfig = {
  baseURL: "http://localhost:8080/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create an Axios instance with the defined configuration
const api: AxiosInstance = axios.create(config);

export default api;