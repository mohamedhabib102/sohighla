import Link from "next/link"




const ButtonHeader = (
    {
        text,
        href,
        variant = "primary",
        animation,
        onClick
    }:{
        text: string,
        href: string,
        variant?: "primary" | "outline",
        animation?: boolean,
        onClick?: () => void
    }
) => {
    const variants = {
        primary: "bg-linear-main text-white shadow-md hover:shadow-lg hover:opacity-90 active:scale-95",
        outline: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white active:scale-95"
    };

    return (
        <Link 
            onClick={onClick}
            href={href}
            className={`inline-block px-6 py-2.5 rounded-full font-bold transition-all duration-300 text-center min-w-[120px] ${variants[variant]} ${animation && `animate-bounce transition-all ease-in-out duration-500`}`}
        >
            {text}
        </Link>
    )
}; export default ButtonHeader;