import { axiosInstance } from "@/lib/axiosInstance"




const getAllSkills = async () => {
    const res = await axiosInstance.get("/GetSkills")
    return res.data.data
}

const createSkill =  async (name: string) => {
    const res = await axiosInstance.post("/AddSkill", { skillName: name })
    return res.data
}

const createCategory = async (category:string) => {
    const res = await axiosInstance.post("/AddCategory", category)
    return res.data
}


const getAllCategory = async () => {
    const res = await axiosInstance.get("/GetAllCategory")
    return res.data.data
}

const getAllPersons = async () => {
    const res = await axiosInstance.get("/GetAllPersons")
    return res.data.data
}

const changeRole = async (personId: number, role: string) => {
    const res = await axiosInstance.put("/ChangeRole", null, {
        params: {
            personId,
            role
        }
    })
    return res.data
}

export {
    getAllSkills,
    createSkill,
    createCategory,
    getAllCategory,
    getAllPersons,
    changeRole
}


