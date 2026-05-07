import { getToken } from "@/utils/getToken";
import axios, { InternalAxiosRequestConfig } from "axios";

// Extend Axios config type to support custom `skipAuth` flag
// declare module "axios" {
//   interface InternalAxiosRequestConfig {
//     skipAuth?: boolean;
//   }
// }



export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000, // 10 seconds
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
})
