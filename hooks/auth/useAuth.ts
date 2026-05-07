import { 
  signIn, 
  signUp 
} from "@/services/auth/auth.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import toast from "react-hot-toast"




interface ApiErrorData {
  message: string;
}

export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: signUp,
    onError: (error: unknown) => {
      const err = error as AxiosError<ApiErrorData>;
      // const errorMessage = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast.error(" هذا البريد الاكتروني مستخدم بالفعل ");
      } else {
        toast.error("حدث خطأ بالخادم يرجى المحاولة مرة اخرى");
      }
    },
  });


    return {
        mutate: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    }
}


export const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: signIn,
    onError: (error: unknown) => {
      const err = error as AxiosError<ApiErrorData>;
      if (err.response?.status === 400) {
        toast.error(" البريد الاكتروني او كلمة المرور غير صحيحة ");
      } else {
        toast.error("حدث خطأ بالخادم يرجى المحاولة مرة اخرى");
      }
    },

    onSuccess: () => {
      toast.success(" تم تسجيل الدخول بنجاح ");
    }
  });


    return {
        mutate: mutation.mutateAsync,
        isLoading: mutation.isPending,
    }
}
