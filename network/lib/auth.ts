import api from "../api";
import axios, { AxiosResponse } from "axios"; 
interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    status: string;
  };
  token: string;
}

interface LecturerLoginResponse {
  data: {
    id: number;
    name: string;
    email: string;
    qualification: string;
    password: string;
    departmentId: number;
    isDepartmentHead: number;
  };
  token: string;
}

const login = async (data: LoginData): Promise<AxiosResponse<LoginResponse> | Error> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post("/students/login", data);
    return response;  
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    } else {
      console.error("Unknown error:", error);
      return new Error("An unknown error occurred");
    }
  }
};

const lecturerLogin = async (data: LoginData): Promise<AxiosResponse<LecturerLoginResponse> | Error> => {
  try {
    // Send the data as JSON in the request body
    const response: AxiosResponse<LecturerLoginResponse> = await api.post("/lecturers/login", data, {
      headers: {
        'Content-Type': 'application/json', // Explicitly set the content type to JSON
      },
    });
    return response;  
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    } else {
      console.error("Unknown error:", error);
      return new Error("An unknown error occurred");
    }
  }
}

export { login, lecturerLogin };
