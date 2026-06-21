import { QueryKeys } from "@/lib/query-keys"
import { createSkill, getAllSkills, createCategory, getAllCategory, getAllPersons, changeRole } from "@/services/control/control.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { PersonType } from "@/types"

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
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createSkill,
        onSuccess: () => {
            toast.success(" تم إضافة المهارة بنجاح ")
            queryClient.invalidateQueries({
                queryKey: QueryKeys.getAllSkills
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

const useGetAllPersons = () => {
    const query = useQuery<PersonType[]>({
        queryKey: QueryKeys.getAllPersons,
        queryFn: getAllPersons,
    })
    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    }
}

const useChangeRole = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({ personId, role }: { personId: number; role: string }) => changeRole(personId, role),
        onSuccess: () => {
            toast.success(" تم تغيير دور المستخدم بنجاح ")
            queryClient.invalidateQueries({
                queryKey: QueryKeys.getAllPersons
            })
        },
        onError: (error: unknown) => {
            const err = error as AxiosError
            if (err.response?.status === 400) {
                toast.error(" طلب غير صالح أو بيانات ناقصة ")
            } else {
                toast.error(" حدث خطأ بالخادم أثناء تغيير الدور ")
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
    useCreateCategory,
    useGetAllPersons,
    useChangeRole
}


