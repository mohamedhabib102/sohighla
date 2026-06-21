import { axiosInstance } from "@/lib/axiosInstance"
import { updateReqStatusType, AddRatingPayload } from "@/types";



export const getAllRequests = async() => {
    const res = await axiosInstance.get(`/GetRequests`);
    return res.data.data
}


export const updateRequestStatus = async (data: updateReqStatusType) => {
    const res = await axiosInstance.put(`/UpdateStatus?requestId=${data.requestId}&status=${data.status}`);
    return res.data.data
}

export const getAllRequestsByClient = async (clientId: number) => {
    const res = await axiosInstance.get(`/GetAllRequests/${clientId}`);
    return res.data.data;
}

export const addRating = async (data: AddRatingPayload) => {
    const res = await axiosInstance.post(`/api/Rating/AddRating`, data);
    return res.data;
}