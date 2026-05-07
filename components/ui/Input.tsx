"use client";
import { InputProps } from "@/types/forms";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";




const Input: React.FC<InputProps> = ({
    placeholder,
    name,
    label,
    id,
    error,
    iconBase: Icon,
    iconPassword,
    type,
    value,
    onChange
}) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="mb-4 last:mb-0 w-full">
            <label htmlFor={id} className="text-sm text-[#0F172A]"> {label} </label>
            <div className="relative w-full group">
                <input
                name={name}
                id={id}
                type={iconPassword ? showPassword ? "text" : "password" : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="p-4 pr-10 text-[#0F172A] placeholder:text-[#0F172A]/50 text-[15px] w-full bg-[#F0F3FF] rounded-[7px] border border-[#C4C6CD] outline-none focus:border-[#EA580C] transition-all duration-200"
                />
                {Icon && <Icon color="#0F172A" size={22}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-[#EA580C]! transition-all duration-200"
                />}

                {iconPassword && (
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-xl opacity-70 group-focus-within:text-[#EA580C]! transition-all duration-200"
                    >
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-sm"> {error} </p>}
        </div>
    )
}; export default Input;