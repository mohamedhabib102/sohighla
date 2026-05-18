"use client"
import { useState } from "react";
import { LINKSARRAY } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const HeaderMobile = ({ links }: { links: LINKSARRAY[] }) => {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();

    return (
        <div className={`fixed bottom-0 left-0 right-0 lg:hidden z-100 transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-30px)]"}`}>
            {/* Toggle Arrow */}
            <div className="flex justify-center -mb-3 relative z-101">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-white/80 backdrop-blur-xl border border-white/30 p-1 rounded-full shadow-lg text-primary transition-all duration-300 hover:scale-110 active:scale-95"
                >
                    <MdKeyboardDoubleArrowUp 
                        className={`text-2xl transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`} 
                    />
                </button>
            </div>

            <nav className="bg-white/50 backdrop-blur-2xl border-t border-white/20 py-4 px-6 flex justify-around items-center shadow-[0_-15px_50px_rgba(0,0,0,0.1)] pb-[calc(1.5rem+env(safe-area-inset-bottom))] rounded-t-[2.5rem]">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    
                    return (
                        <Link 
                            key={link.id} 
                            href={link.href}
                            title={link.label}
                            className={`relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 ${
                                isActive 
                                ? "bg-linear-main text-white shadow-[0_10px_25px_rgba(234,88,12,0.4)] -translate-y-5 scale-105" 
                                : "bg-secondary/5 text-secondary/40 hover:bg-secondary/10"
                            }`}
                        >
                            {Icon && <Icon className="text-3xl" />}
                            
                            {isActive && (
                                <span className="absolute -bottom-3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default HeaderMobile;

