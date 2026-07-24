import { QueryKeys } from "@/lib/query-keys"
import { queryClient } from "@/lib/queryClient"
import { createCraftsman, deletImageById, getCraftsmanById, updateCraftsman, addWorkImages, getShowPhone, updatePhoneNumber, getAllCraftsmen, getCraftsmenByCategory } from "@/services/craftsman/craftsmane.service"
import { CraftsmanByCategoryType, CraftsmanType, PortfolioType } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"




const useCreateCraftsman = () => {
    const mutation =  useMutation({
        mutationFn: createCraftsman,
        onSuccess: () => {
            toast.success(" تم إضافة البيانات بنجاح ")
        }, 
        onError: (error: unknown) => {
            const err = error as AxiosError
            if (err.response?.status === 401){
                toast.error(" يرجى التحقق من تسجيلك بالمنصة ")
            } else if (err.response?.status === 400){
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



const useCraftsmanById = (id: number) => {
    const query = useQuery({
        queryKey: QueryKeys.getCraftsmanById(id),
        queryFn: () => getCraftsmanById(id),
        enabled: !!id,
    })

    return {
        data: query.data as PortfolioType,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
}


const useUpdateCraftsman = () => {
    const mutation =  useMutation({
        mutationFn: updateCraftsman,
        onSuccess: () => {
            toast.success(" تم تحديث البيانات بنجاح ")
        }, 
        onError: (error: unknown) => {
            const err = error as AxiosError
            if (err.response?.status === 401){
                toast.error(" يرجى التحقق من تسجيلك بالمنصة ")
            } else if (err.response?.status === 400){
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



const useDeleteWorkImage = () => {
    const mutation =  useMutation({
        mutationFn: (id: number) => deletImageById(id),
        onSuccess: (data) => {
            toast.success(" تم حذف الصورة بنجاح ")
        }, 
        
        onError: (error: unknown) => {
            const err = error as AxiosError
            if (err.response?.status === 401){
                toast.error(" يرجى التحقق من تسجيلك بالمنصة ")
            } else if (err.response?.status === 400){
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



const useAddWorkImages = () => {
    const mutation =  useMutation({
        mutationFn: addWorkImages,
        onSuccess: () => {
            toast.success(" تم إضافة الصور بنجاح ")
        }, 
        onError: (error: unknown) => {
            const err = error as AxiosError
            if (err.response?.status === 401){
                toast.error(" يرجى التحقق من تسجيلك بالمنصة ")
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


const useShowPhone = (craftsmanId: number) => {
    const query = useQuery({
        queryKey: ["show-phone", craftsmanId],
        queryFn: () => getShowPhone(craftsmanId),
        enabled: false,
    })

    return {
        data: query.data,
        refetch: query.refetch,
        isLoading: query.isFetching
    }
}


const useUpdatePhoneNumber = () => {
    const mutation =  useMutation({
        mutationFn: updatePhoneNumber,
        onSuccess: () => {
            toast.success(" تم تحديث رقم الهاتف بنجاح ")
        }, 
        onError: (error: unknown) => {
            const err = error as AxiosError
            if (err.response?.status === 401){
                toast.error(" يرجى التحقق من تسجيلك بالمنصة ")
            } else if (err.response?.status === 400){
                toast.error(" رقم الهاتف المدخل غير صالح أو مكرر ")
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


const useGetAllCraftsmen = () => {
    const query = useQuery<CraftsmanType[]>({
        queryKey: QueryKeys.craftsman,
        queryFn: getAllCraftsmen
    })

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
}

const useGetCraftsmenByCategory = (CategoryID: number) => {
    const query = useQuery<CraftsmanByCategoryType[]>({
        queryKey: QueryKeys.getCraftsmenByCategory(CategoryID),
        queryFn: () => getCraftsmenByCategory(CategoryID),
        enabled: !!CategoryID,
        staleTime: 0,
        gcTime: 0
    })

    return {
        data: query.data,
        loading: query.isLoading || query.isFetching,
        isError: query.isError,
        error: query.error
    }
}


export {
    useCreateCraftsman,
    useCraftsmanById,
    useUpdateCraftsman,
    useDeleteWorkImage,
    useAddWorkImages,
    useShowPhone,
    useUpdatePhoneNumber,
    useGetAllCraftsmen,
    useGetCraftsmenByCategory
}