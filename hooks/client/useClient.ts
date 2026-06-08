import { QueryKeys } from "@/lib/query-keys"
import { getAllRequests, updateRequestStatus } from "@/services/client/client.service"
import { allRequetsType } from "@/types";
import { useQuery , useMutation, useQueryClient} from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast";

export const useClient = () => {
    const request = useQuery<allRequetsType[]>({
        queryFn: getAllRequests,
        queryKey: QueryKeys.getAllRequests
    });


    return {
        all: request.data,
        loading: request.isLoading,
        error: request.error,
        isError: request.isError
    }
}


export const useUpdateReqStatus = () => {
    const queryClient = useQueryClient();
    const Req = useMutation({
        mutationFn: updateRequestStatus,
        onSuccess: () => {
            toast.success(" تم تحديث حالة الطلب بنجاح ");
            queryClient.invalidateQueries({
                queryKey: QueryKeys.getAllRequests
            })
        },
        onError: (error: unknown) => {
           const err =  error as AxiosError;
           if (err.response?.status === 400) {
            toast.error(" لا يمكنك تحديث حالة الطلب تم رفضه او تم قبوله بالفعل ");
           } else {
            toast.error("حدث خطأ بالخادم يرجى المحاولة مرة اخرى");
           }
        }
    });
    return {
        update: Req.mutateAsync,
        loading: Req.isPending,
        error: Req.error,
    }
}