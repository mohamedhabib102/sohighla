import  {create} from "zustand";
import { User, AuthStore } from "../types/stores";
import { createJSONStorage, persist } from "zustand/middleware";
import CryptoJS from "crypto-js";

const SECRET_KEY = "sohighla123";

const encryptedStorage = {
    getItem: (name: string) => {
        const value = localStorage.getItem(name);

        if (!value) return null;


        const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);

        return bytes.toString(CryptoJS.enc.Utf8);
    },

    setItem: (name:string, value:string) => {
        const encrypted = CryptoJS.AES.encrypt(
        value, 
        SECRET_KEY
       ).toString();

       localStorage.setItem(name, encrypted);
    },

    removeItem: (name:string) => {
        localStorage.removeItem(name);
    }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      login: (user) =>
        set({
          user,
        }),

      logout: () =>
        set({
          user: null,
        }),
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(() => encryptedStorage),
    }
  )
);