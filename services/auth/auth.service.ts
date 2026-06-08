import { axiosInstance } from "@/lib/axiosInstance";
import { resetPasswordType, verifyEmailType } from "@/types";
import { signUpType, signInType } from "@/types/api";

export const signUp = async (data: signUpType) => {
  const res = await axiosInstance.post(
    `/registered?FirstName=${data.FirstName}&LastName=${data.LastName}&Email=${data.Email}&Password=${data.Password}&Role=${data.Role}`,
  );
  return res.data.data
};

export const signIn = async (data: signInType) => {
  const res = await axiosInstance.post(
    `/login?Email=${data.Email}&PasswordHash=${data.PasswordHash}`,
  );
  return res.data.data
};


export const resentOTP = async (email:string) => {
  const  res = await axiosInstance.post(`/ResendOtp?email=${email}`
  );
  return res.data;
}


export const verifyEmail =  async(data:verifyEmailType) => {
  const res = await axiosInstance.post(`/VerifyOtpForVerifyEmail?email=${data.email}&code=${data.code}`);
  return res.data.data;
} 


export const  verifyResetPassword = async (data:verifyEmailType) => {
  const res = await axiosInstance.post(`/VerifyOtpForPasswordReset?email=${data.email}&code=${data.code}`)
  return res.data.resetToken; // enter this `resetToken` is here => data  
}


export const resetPassword = async (data:resetPasswordType) => {
  const res = await axiosInstance.post(`/ResetPassword?resetToken=${data.resetToken}&newPassword=${data.newPassword}`);
  return res.data;
}
