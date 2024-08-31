import api from "../api";
import axios, { AxiosResponse } from "axios"; // Ensure axios is imported for type checking

// Define the type for the login data
interface LoginData {
  email: string;
  password: string;
}

// Updated interface to match the provided response structure
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

const login = async (data: LoginData): Promise<AxiosResponse<LoginResponse> | Error> => {
  try {
    console.log(data);
    
    // Sending data in the body of the request, not as params
    const response: AxiosResponse<LoginResponse> = await api.post("/students/login", data);
    return response;  // Return the entire response object
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data); // Log full error details
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    } else {
      console.error("Unknown error:", error);
      return new Error("An unknown error occurred");
    }
  }
};

export { login };
