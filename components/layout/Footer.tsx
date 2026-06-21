"use client";

import Link from "next/link";
import Logo from "@/components/ui/Lgo";
import CustomContainer from "@/components/ui/CustomContainer";
import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineLightBulb,
    HiOutlineInformationCircle,
    HiOutlineWrenchScrewdriver,
    HiOutlineSquares2X2,
    HiOutlineShieldCheck,
    HiOutlineDocumentText,
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineMapPin,
} from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

const SITE_LINKS = [
    { label: "الرئيسية", href: "/", icon: HiOutlineHome },
    { label: "تصفح الصنايعية", href: "/craftsmen", icon: HiOutlineUsers },
    { label: "كيف تعمل المنصة؟", href: "/how-it-works", icon: HiOutlineLightBulb },
    { label: "من نحن؟", href: "/about-us", icon: HiOutlineInformationCircle },
    { label: "الخدمات", href: "/services", icon: HiOutlineSquares2X2 },
];

const LEGAL_LINKS = [
    { label: "سياسة الخصوصية", href: "/privacy-policy", icon: HiOutlineShieldCheck },
    { label: "الشروط والأحكام", href: "/terms", icon: HiOutlineDocumentText },
    { label: "حذف الحساب", href: "/delete-account", icon: HiOutlineDocumentText },
];

const SOCIAL = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaXTwitter, href: "#", label: "X (Twitter)" },
    { icon: FaWhatsapp, href: "#", label: "WhatsApp" },
];

export default function Footer() {
    return (
        <footer className="bg-secondary text-white" dir="rtl">
            {/* ── Top Section ────────────────────────────────────────── */}
            <CustomContainer>
                <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Column */}
                    <div className="space-y-5 lg:col-span-1">
                        <Logo width={140} height={140} />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            أول منصة عربية تربطك بأفضل الصنايعية والحرفيين لتنفيذ أعمالك بكل ثقة وسهولة وفي أسرع وقت.
                        </p>
                        {/* Social icons */}
                        <div className="flex items-center gap-3 pt-1">
                            {SOCIAL.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-200"
                                >
                                    <s.icon className="text-sm text-white" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Site Links */}
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-white border-r-2 border-primary pr-3">
                            روابط سريعة
                        </h3>
                        <ul className="space-y-3">
                            {SITE_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2.5 text-gray-400 hover:text-primary transition-colors duration-200 text-sm group"
                                    >
                                        <link.icon className="text-base text-primary/60 group-hover:text-primary transition-colors shrink-0" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-white border-r-2 border-primary pr-3">
                            قانوني
                        </h3>
                        <ul className="space-y-3">
                            {LEGAL_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2.5 text-gray-400 hover:text-primary transition-colors duration-200 text-sm group"
                                    >
                                        <link.icon className="text-base text-primary/60 group-hover:text-primary transition-colors shrink-0" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-white border-r-2 border-primary pr-3">
                            تواصل معنا
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                                <HiOutlineEnvelope className="text-primary text-base shrink-0 mt-0.5" />
                                <span>sohighla.online@gmail.com</span>
                            </li>
                        </ul>

                        {/* CTA */}
                        <Link href="/craftsmen">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="mt-4 flex items-center gap-2 bg-primary hover:bg-primary/90 text-secondary font-bold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer"
                            >
                                <HiOutlineWrenchScrewdriver className="text-base" />
                                ابحث عن حرفي الآن
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </CustomContainer>

            {/* ── Bottom Bar ─────────────────────────────────────────── */}
            <div className="border-t border-white/10">
                <CustomContainer>
                    <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                        <p>
                            © {new Date().getFullYear()} منصة <span className="text-primary font-bold">شُغلَة</span>. جميع الحقوق محفوظة.
                        </p>
                        <p>
                            صُنع بـ <span className="text-primary">♥</span> لخدمة الحرفيين العرب
                        </p>
                    </div>
                </CustomContainer>
            </div>
        </footer>
    );
}
