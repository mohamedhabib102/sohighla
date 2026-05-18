import { QueryKeys } from "@/lib/query-keys"
import { createSkill, getAllSkills, createCategory, getAllCategory } from "@/services/control/control.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"





const useGetAllSkills = () => {
    const query = useQuery({
        queryKey: QueryKeys.getAllSkills,
        queryFn: getAllSkills,
    })
    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
} 


const useCreateSkill = () => {
    const mutation = useMutation({
        mutationFn: createSkill,
        onSuccess: () => {
            toast.success(" تم إضافة المهارة بنجاح ")
        }, 
        onError: (error: unknown) => {
            const err = error as AxiosError
            if (err.response?.status === 400){
                toast.error(" يرجى إكمال البيانات المطلوبة ")
            } else {
                toast.error(" حدث خطأ بالخادم يرجى المحاولة مرة اخرى ")
            }
        }
    })

    return {
        mutate: mutation.mutateAsync,
        isLoading: mutation.isPending
    }
}   


const useGetAllCategory = () => {
    const query = useQuery({
        queryKey: QueryKeys.getAllCategory,
        queryFn: getAllCategory,
    })
    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
} 


const useCreateCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            toast.success(" تم إضافة القسم بنجاح ")
            queryClient.invalidateQueries({
                queryKey: QueryKeys.getAllCategory
            })
        }, 
        onError: (error: unknown) => {
            const err = error as AxiosError
            if (err.response?.status === 400){
                toast.error(" يرجى إكمال البيانات المطلوبة ")
            } else {
                toast.error(" حدث خطأ بالخادم يرجى المحاولة مرة اخرى ")
            }
        }
    })

    return {
        mutate: mutation.mutateAsync,
        isLoading: mutation.isPending
    }
}


export {
    useGetAllSkills,
    useCreateSkill,
    useGetAllCategory,
    useCreateCategory
}

