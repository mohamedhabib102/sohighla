


import CryptoJS from "crypto-js";

const SECRET_KEY = "sohighla123";

export const getToken = () => {
  if (typeof window === "undefined") return null;

  const encryptedData = localStorage.getItem("auth-storage");
  if (!encryptedData) return null;

  try {
    // 1. Decrypt the string from localStorage
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) return null;

    // 2. Parse the JSON (Zustand persist format)
    const parsed = JSON.parse(decryptedData);

    // 3. Extract the token from the user object in the state
    return parsed?.state?.user?.accessToken || null;
  } catch (error) {
    console.error("Error decrypting or parsing token:", error);
    return null;
  }
};