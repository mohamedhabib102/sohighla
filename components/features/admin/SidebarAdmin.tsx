"use client";
import { LINKSARRAY } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUserCircle, FaTools } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";

const Links: LINKSARRAY[] = [
    {
        id: 1, 
        label: "لوحة التحكم الرئيسية",
        href: "/control",
        icon: LuLayoutDashboard
    },
    {
        id: 2,
        label: "إدارة المستخدمين",
        href: "/control/users",
        icon: FaRegUserCircle
    },
    {
        id: 3,
        label: "الأقسام والمهارات",
        href: "/control/categories-skills",
        icon: FaTools
    }
];

const SidebarAdmin = () => {
    const pathname = usePathname();
    const [isToggled, setIsToggled] = useState<boolean>(false);
    const { user } = useAuthStore();

    const adminName = user ? `${user.firstName} ${user.lastName || ""}` : "مدير النظام";

    return (
        <aside className={`select-none relative flex flex-col h-full transition-all duration-300 text-white bg-secondary
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
                    {!isToggled && <p className="text-gray-400 text-[10px] mt-1 hidden lg:block"> لوحة التحكم للمشرفين </p>}
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
                        <h5 className="text-primary text-xs font-bold truncate"> {adminName} </h5>
                        <p className="text-gray-400 text-[9px]"> مدير النظام </p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default SidebarAdmin;
