"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../ui/Lgo";
import ButtonHeader from "../ui/ButtonHeader";
import { LINKSARRAY } from "@/types/index";
import { useAuthStore } from "@/store/auth-store";
import { log } from "console";
import { signOut } from "next-auth/react";



const Navbar = ({links}: {links: LINKSARRAY[]}) => {
  const pathname = usePathname();
  const {user, logout} = useAuthStore()
  const router = useRouter()


  const handlerLogout = () => {
    logout()
    signOut({callbackUrl: "/"})
    router.push("/")
  }

  return (
    <nav className="flex items-center justify-between py-2">
      <Logo width={135} height={135} />
      
      <ul className="hidden lg:flex gap-8 items-center">
        {links.map((link) => {
          const isActive = pathname === link.href;
          
          if (link.type === "customer") {
            return (
              <li key={link.id}>
                <ButtonHeader 
                  text={link.label} 
                  href={link.href} 
                  variant="primary" 
                />
              </li>
            );
          }
          
          return (
            <li key={link.id}>
              <Link
                className={`relative font-semibold text-lg transition-all duration-300 py-1 px-1 group
                  ${isActive ? "text-primary" : "text-secondary hover:text-primary"}
                `}
                href={link.href}
              >
                {link.label}
                {/* Animated Underline */}
                <span 
                  className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </Link>
            </li>
          );
        })}
      </ul>


      {user?.personID ? (<>
      <div className="flex gap-4 items-center">
        <ButtonHeader onClick={handlerLogout} text="تسجيل خروج" href="/" variant="outline" />
      </div>
      </>) : (
      <div className="flex gap-4 items-center">
        <ButtonHeader text="تسجيل" href="/auth/sign-in" variant="outline" />
        <div className="hidden lg:block">
          <ButtonHeader text="إنشاء حساب" href="/auth/sign-up" variant="primary" />
        </div>
      </div>
      )}
    </nav>
  );
};
export default Navbar;
