
export interface User {
   personID: number;
   firstName: string;
   lastName: string;
   email: string;
   role: string;
   isVerifyEmail: boolean;
   accessToken?: string;
}

export interface AuthStore {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}