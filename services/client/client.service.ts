import { axiosInstance } from "@/lib/axiosInstance"
import { updateReqStatusType } from "@/types";



export const getAllRequests = async() => {
    const res = await axiosInstance.get(`/GetRequests`);
    return res.data.data
}


export const updateRequestStatus = async (data: updateReqStatusType) => {
    const res = await axiosInstance.put(`/UpdateStatus?requestId=${data.requestId}&status=${data.status}`);
    return res.data.data
}