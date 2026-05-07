import { ButtonProps } from "@/types/forms";
import LoaderButton from "./LoaderButton";





const Button: React.FC<ButtonProps> = ({
    title,
    onClick,
    isLoading,
    type
}) => {
    return (
        <div>
            <button 
            disabled={isLoading}
            name="btn-sign-up"
            type={type} 
            onClick={onClick}
            className="text-white text-[15px] w-full mt-4 cursor-pointer bg-linear-to-r from-[#EA580C] to-[#F97316] rounded-lg p-4"
            >
            {isLoading ? <LoaderButton /> : title}
            </button>
        </div>
    )
}; export default Button;