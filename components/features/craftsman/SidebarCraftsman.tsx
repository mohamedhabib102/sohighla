"use client";
import { LINKSARRAY } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci"
import { FaRegUserCircle } from "react-icons/fa"
import { LuLayoutDashboard } from "react-icons/lu"
import { MdOutlineNoAccounts } from "react-icons/md"
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useState } from "react";



const Links:LINKSARRAY[] = [
    {
        id: 1, 
        label: "لوحة التحكم الرئيسية",
        href: "/dashboard-craftsman",
        icon: LuLayoutDashboard
    },
    {
        id: 2,
        label:  "طلبات العملاء",
        href: "/dashboard-craftsman/orders",
        icon: CiShoppingCart
    },
    {
        id: 3,
        label: "الملف الشخصي",
        href: "/dashboard-craftsman/profile",
        icon: FaRegUserCircle
    },
    {
        id: 4,
        label: "توثيق الحساب",
        href: "/dashboard-craftsman/verify-account",
        icon: MdOutlineNoAccounts
    }
]



const SidebarCraftsman = () => {
    const pathname = usePathname();
    const [isToggled, setIsToggled] = useState<boolean>(false);

    return (
        <aside className={`select-none relative flex flex-col h-full transition-all duration-300 text-white
            ${isToggled ? "w-20 p-4" : "w-20 lg:w-64 p-4 lg:p-6"} justify-between`}>
            
            <button 
                onClick={() => setIsToggled((prev) => !prev)}
                className="absolute top-6 -left-4 cursor-pointer text-primary hover:text-white transition-transform duration-300 bg-secondary p-1 rounded-full border border-gray-700 hidden lg:flex z-50"
                style={{ transform: isToggled ? "rotate(180deg)" : "rotate(0deg)" }}
            >
                <FaCircleArrowLeft size={24} />
            </button>

            <div>
                <div className="mb-8 flex flex-col items-center select-none overflow-hidden">
                    <div className="flex items-center gap-2">
                        <Image 
                            src="/imgs/default_2.jpeg" 
                            alt="logo" 
                            width={40} 
                            height={40} 
                            className="shrink-0"
                        />
                        {!isToggled && <h4 className="font-lemonada text-primary text-[18px] whitespace-nowrap hidden lg:block"> شُغلَة </h4>}
                    </div>
                    {!isToggled && <p className="text-gray-400 text-[10px] mt-1 hidden lg:block"> نحن نثق بمهاراتك </p>}
                </div>

                <div className="space-y-2">
                    {Links.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            title={link.label}
                            className={`flex items-center p-3 rounded-xl transition-all duration-300
                                ${isToggled ? "justify-center" : "justify-center lg:justify-start lg:gap-3"}
                                ${pathname === link.href 
                                    ? "bg-primary text-secondary font-bold" 
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            {link.icon && <link.icon size={22} className="shrink-0" />}
                            {!isToggled && <span className="text-sm whitespace-nowrap hidden lg:block"> {link.label} </span>}
                        </Link>
                    ))}
                </div>
            </div>

            <div className={`pt-6 border-t border-gray-800 flex items-center ${isToggled ? "justify-center" : "justify-center lg:justify-start lg:gap-3"}`}>
                <Image 
                    src="/imgs/default_2.jpeg" 
                    alt="profile image" 
                    width={35} 
                    height={35} 
                    className="rounded-full border border-primary/50 shrink-0" 
                />
                {!isToggled && (
                    <div className="overflow-hidden hidden lg:block">
                        <h5 className="text-primary text-xs font-bold truncate"> Mohamed Mowafy </h5>
                        <p className="text-gray-400 text-[9px]"> نجار </p>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default SidebarCraftsman