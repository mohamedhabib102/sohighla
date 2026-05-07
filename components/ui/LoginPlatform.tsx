"use client"
import { signIn } from "next-auth/react";
import { ButtonPlatformProps } from "@/types/forms";


const ButtonPlatform = ({
    textButton,
    Icon,
    provider
}: ButtonPlatformProps) => {
    return (
        <button
         onClick={() => signIn(provider, {
            callbackUrl: `/choose-role`
         })}
        type="button" 
        name={`${provider}_auth`}
        className="w-full border border-[#D9D9D9] p-4 rounded-[11px]
        flex items-center justify-center gap-3 cursor-pointer">
            <span className="text-[15px] font-medium text-[#2D2D2D]">{textButton}</span>
            <Icon size={24} color={provider === "google" ? "#34A853" : "#4267B2"}/>
        </button>
    )
};export default ButtonPlatform