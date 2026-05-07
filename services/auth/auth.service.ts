import { axiosInstance } from "@/lib/axiosInstance";
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
