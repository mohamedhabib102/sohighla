import { getToken } from "@/lib/getToken";
import axios from "axios";

// Extend Axios config type to support custom `skipAuth` flag
// declare module "axios" {
//   interface InternalAxiosRequestConfig {
//     skipAuth?: boolean;
//   }
// }



export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 30000, // Increased timeout for file uploads
    withCredentials: false,
    // Removed default Content-Type to allow automatic detection
})



axiosInstance.interceptors.request.use((config) => {
   const  token =  getToken()

   if (token) {
       config.headers.Authorization = `Bearer ${token}`;
   }

   // Ensure Content-Type is NOT forced for FormData to let the browser set it with boundary
   if (config.data instanceof FormData) {
       delete config.headers["Content-Type"];
   } else if (!config.headers["Content-Type"]) {
       // Default to JSON for plain objects if not already set
       config.headers["Content-Type"] = "application/json";
   }
   
   return config;
})
