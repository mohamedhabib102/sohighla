import { axiosInstance } from "@/lib/axiosInstance"
import { PortfolioType } from "@/types"




const createCraftsman = async (data: any) => {
    const res =  await axiosInstance.post(
        "/CreatePortfolio",
        data
    )
    return res.data
}



const getCraftsmanById = async (id: number): Promise<PortfolioType | null> => {
    const res =  await axiosInstance.get(
        `/GetPortfolio/${id}`
    )
    return res.data.data
}


const updateCraftsman = async (formData: FormData) => {
    const res =  await axiosInstance.put(
        `/UpdatePortfolio`, formData
    )
    return res.data
}


const deletImageById = async(id:number) => {
    const res=  await axiosInstance.delete(`/DeleteImage/${id}`);
    return res.data;
}


const addWorkImages = async (formData: FormData) => {
    const res = await axiosInstance.post("/AddWorkImages", formData);
    return res.data;
};


const getShowPhone = async (craftsmanId: number) => {
    const res = await axiosInstance.get(`/ShowPhone`, {
        params: { craftsmanId }
    });
    return res.data.data;
};


const updatePhoneNumber = async (phoneNumber: string) => {
    const res = await axiosInstance.put(
        "/UpdatePhoneNumber",
        JSON.stringify(phoneNumber),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};


const getAllCraftsmen = async () => {
    const res = await axiosInstance.get(`/GetCraftsmen`)
    return res.data.data
} 


const getCraftsmenByCategory = async (CategoryID: number) => {
    const res =  await axiosInstance.get(`/GetCraftsmenByCategory?CategoryID=${CategoryID}`)
    return res.data.data
}

export 
{
createCraftsman,
getCraftsmanById,
updateCraftsman,
deletImageById,
addWorkImages,
getShowPhone,
updatePhoneNumber,
getAllCraftsmen,
getCraftsmenByCategory
}