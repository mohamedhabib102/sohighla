"use client"
import { LINKSARRAY } from "@/types";
import CustomContainer from "../ui/CustomContainer";
import Logo from "../ui/Lgo";
import Navbar from "./Navbar";
import HeaderMobile from "./HeaderMobile";
import { IoMdHome } from "react-icons/io";
import { FaBorderAll, FaUserGroup } from "react-icons/fa6";
import { FaRegLightbulb, FaRegUserCircle } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { MdSpaceDashboard } from "react-icons/md";

const LINKS_CLIENT:LINKSARRAY[] = [
  {
    id: 1,
    label: "الرئيسية",
    href: "/",
    icon: IoMdHome,
  },
   {
    id: 2,
    label: " تصفح الصنايعية ",
    href: "/craftsmen",
    icon: FaUserGroup
  },
  {
    id: 3,
    label: "كيف تعمل المنصة؟",
    href: "/how-it-works",
    icon: FaRegLightbulb
  },
  {
    id: 4,
    label: "من نحن؟",
    href: "/about-us",
    icon: BsInfoCircleFill
  },
  {
    id: 5,
    label: "لوحة التحكم",
    href: "/dashboard-client",
    icon: MdSpaceDashboard,
    type: "customer"
  }
];


const LINKS_DASHBOARD_CLIENT:LINKSARRAY[] = [
  {
    id: 1,
    label: "الرئيسية",
    href: "/",
    icon: IoMdHome,
  },
   {
    id: 2,
    label: "لوحة التحكم",
    href: "/dashboard-client",
    icon: FaBorderAll,
  },
  {
    id: 3,
    label: "حسابي",
    href: "/dashboard-client/my-profile",
    icon: FaRegUserCircle,
  }
]



const Header = () => {
 const pathname =  usePathname();
 const {user} = useAuthStore()

 const filteredLinks = LINKS_CLIENT.filter(link => {
   if (link.type === "customer") {
     return user?.role === "customer";
   }
   return true;
 });

 const filteredDashboardLinks = LINKS_DASHBOARD_CLIENT;
 
 console.log(user)
  return (
    <header className="relative z-50">
      <CustomContainer>
        {pathname.includes("/dashboard-client") ? (<>
          <Navbar links={filteredDashboardLinks} />
          <HeaderMobile links={filteredDashboardLinks} />
        </>) : (
          <>
          <Navbar links={filteredLinks} />
          <HeaderMobile links={filteredLinks} />
          </>
        )}
      </CustomContainer>
    </header>
  );
};


export default Header;