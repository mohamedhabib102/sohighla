


import { getDecryptedToken } from "@/utils/auth-cookies";

export const getToken = () => {
  return getDecryptedToken();
};
