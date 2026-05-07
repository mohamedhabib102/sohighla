import { AiOutlineLoading } from "react-icons/ai";



const LoaderButton = ({
    size,
}: {
    size?: number,
}) => {
    return (
        <div>
            <AiOutlineLoading className="block mx-auto animate-spin" size={size || 25} />
        </div>
    );
};

export default LoaderButton;