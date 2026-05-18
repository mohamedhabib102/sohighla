"use client"
import { LINKSARRAY } from "@/types";
import CustomContainer from "../ui/CustomContainer";
import Logo from "../ui/Lgo";
import Navbar from "./Navbar";
import HeaderMobile from "./HeaderMobile";
import { IoMdHome } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import ButtonHeader from "../ui/ButtonHeader";

const LINKS:LINKSARRAY[] = [
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
];

const Header = () => {
  return (
    <header className="relative z-50">
      <CustomContainer>
        <Navbar links={LINKS} />
        <HeaderMobile links={LINKS} />
      </CustomContainer>
    </header>
  );
};


export default Header;