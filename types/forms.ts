import { IconType } from "react-icons";

export interface InputProps {
    placeholder: string;
    name: string;
    label: string;
    id: string;
    error?: string;
    iconBase: IconType;
    iconPassword?: boolean;
    type: "radio" | "checkbox" | "text" | "password" | "email" | "number" | "tel" | "url";
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
    title: string;
    onClick?: () => void;
    isLoading?: boolean;
    type: "button" | "submit" | "reset";
}

export interface ButtonPlatformProps {
    textButton: string;
    Icon: IconType;
    provider: "google" | "facebook";
}
