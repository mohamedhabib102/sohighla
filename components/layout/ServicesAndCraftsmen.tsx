"use client";

import Link from "next/link";
import Image from "next/image";
import {
    HiOutlineArrowLeft,
    HiOutlineStar,
    HiOutlineMapPin,
    HiOutlineBriefcase,
    HiOutlineUsers,
    HiOutlineSquares2X2,
    HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { FiLoader } from "react-icons/fi";
import { motion, Variants } from "framer-motion";
import CustomContainer from "../ui/CustomContainer";
import { useGetAllCraftsmen } from "@/hooks/craftsman/useCraftsman";
import { useGetAllCategory, useGetAllPersons } from "@/hooks/control/useConrtol";
import { CategoryType } from "@/types";
import { useMemo } from "react";

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Category Card ─────────────────────────────────────────────────────────────
// One unified icon, brand colors only
function CategoryCard({ cat }: { cat: CategoryType }) {
    return (
        <motion.div variants={itemVariants}>
            <Link href={`/craftsmen?category=${cat.categoryID}`}>
                <motion.div
                    whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(245,158,11,0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-amber-100 cursor-pointer text-center hover:border-amber-300 transition-colors duration-200"
                >
                    {/* Icon — unified, brand colored */}
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-200">
                        <HiOutlineWrenchScrewdriver className="text-2xl text-amber-500 group-hover:text-white transition-colors duration-200" />
                    </div>

                    {/* Category name */}
                    <h3 className="text-sm font-bold text-secondary leading-snug group-hover:text-amber-600 transition-colors duration-200">
                        {cat.categoryName}
                    </h3>
                </motion.div>
            </Link>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const ServicesAndCraftsmen = () => {
    const { data: craftsmenList, isLoading: isLoadingCraftsmen } = useGetAllCraftsmen();
    const { data: categories, isLoading: isLoadingCats } = useGetAllCategory();
    const { data: allPersons } = useGetAllPersons();

    const craftsmanCount = useMemo(
        () => allPersons?.filter((p) => p.role === "craftsman").length ?? 0,
        [allPersons]
    );
    const categoryCount = useMemo(() => categories?.length ?? 0, [categories]);
    const avgRating = useMemo(() => {
        if (!craftsmenList || craftsmenList.length === 0) return 0;
        const sum = craftsmenList.reduce((acc, c) => acc + (c.averageRating ?? 0), 0);
        return (sum / craftsmenList.length).toFixed(1);
    }, [craftsmenList]);

    const displayedCategories: CategoryType[] = useMemo(
        () => (categories ?? []).slice(0, 8),
        [categories]
    );

    return (
        <section className="py-16 pb-0! md:py-24 bg-white" dir="rtl">
            <CustomContainer>

                {/* ── Section 1: Services / Categories ─────────────────── */}
                <div className="mb-20">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div className="text-right space-y-2">
                            <h2 className="text-2xl md:text-4xl font-black text-secondary">
                                تصفح الخدمات حسب الفئة
                            </h2>
                            <p className="text-gray-500 font-medium">
                                اختر من بين مئات الخدمات المتوفرة في منطقتك
                            </p>
                        </div>
                        <Link
                            href="/services"
                            className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300 shrink-0"
                        >
                            <HiOutlineArrowLeft className="text-xl" />
                            <span>عرض الكل</span>
                        </Link>
                    </div>

                    {/* Grid */}
                    {isLoadingCats ? (
                        <div className="flex items-center justify-center py-16 gap-3 text-gray-400 text-sm font-bold bg-amber-50/40 rounded-3xl border border-amber-100 border-dashed">
                            <FiLoader className="animate-spin text-primary" size={26} />
                            <span>جاري تحميل الخدمات...</span>
                        </div>
                    ) : displayedCategories.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                        >
                            {displayedCategories.map((cat) => (
                                <CategoryCard key={cat.categoryID} cat={cat} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-16 bg-amber-50/40 rounded-3xl border border-amber-100 border-dashed">
                            <p className="text-gray-400 font-bold text-sm">لا توجد خدمات مسجلة حالياً.</p>
                        </div>
                    )}
                </div>

                {/* ── Section 2: Featured Craftsmen ────────────────────── */}
                <div className="mt-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div className="text-right space-y-2">
                            <h2 className="text-2xl md:text-4xl font-black text-secondary">نخبة الصنايعية</h2>
                            <p className="text-gray-500 font-medium">أكثر الحرفيين تقييماً ووثوقية في منصتنا</p>
                        </div>
                        <Link
                            href="/craftsmen"
                            className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300 shrink-0"
                        >
                            <HiOutlineArrowLeft className="text-xl" />
                            <span>عرض كل الحرفيين</span>
                        </Link>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {isLoadingCraftsmen ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-3 text-gray-400 text-sm font-bold bg-amber-50/40 rounded-3xl border border-amber-100 border-dashed">
                                <FiLoader className="animate-spin text-primary" size={26} />
                                <span>جاري تحميل نخبة الحرفيين...</span>
                            </div>
                        ) : craftsmenList && craftsmenList.length > 0 ? (
                            craftsmenList.slice(0, 4).map((craftsman) => (
                                <motion.div
                                    key={craftsman.craftsmanID}
                                    whileHover="hover"
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group text-right flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="relative h-44 w-full overflow-hidden bg-gray-50">
                                            <motion.div
                                                variants={{ hover: { scale: 1.08 } }}
                                                transition={{ duration: 0.6 }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={craftsman.profileImageURL || "/imgs/default_2.jpeg"}
                                                    title={craftsman.firstName}
                                                    alt="craftsman"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </motion.div>
                                            {craftsman.averageRating > 0 && (
                                                <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                                                    <HiOutlineStar className="fill-current text-amber-400 text-xs" />
                                                    <span className="text-xs font-bold text-secondary">
                                                        {craftsman.averageRating.toFixed(1)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5 space-y-3">
                                            <h3 className="text-base font-bold text-secondary truncate">
                                                {craftsman.firstName} {craftsman.lastName ?? ""}
                                            </h3>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                    <HiOutlineBriefcase className="text-primary text-sm shrink-0" />
                                                    <span className="font-semibold truncate">
                                                        {craftsman.shortDescription || "حرفي متميز"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                    <HiOutlineMapPin className="text-primary text-sm shrink-0" />
                                                    <span className="truncate">{craftsman.locationText || "غير محدد"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-5 pb-5">
                                        <Link href={`/craftsmen/${craftsman.personID}`} className="block w-full">
                                            <button className="w-full py-2.5 rounded-xl border border-secondary hover:bg-secondary text-secondary hover:text-white font-bold transition-all text-xs cursor-pointer">
                                                عرض الملف الشخصي
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 bg-amber-50/40 rounded-3xl border border-amber-100 border-dashed">
                                <p className="text-gray-400 font-bold text-sm">لا يوجد صنايعية مسجلين حالياً.</p>
                            </div>
                        )}
                    </div>

                    {/* "View All" CTA button */}
                    {craftsmenList && craftsmenList.length > 4 && (
                        <div className="flex justify-center mt-10">
                            <Link href="/craftsmen">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-secondary text-white font-bold text-sm shadow-md hover:shadow-xl hover:shadow-secondary/20 transition-all duration-200"
                                >
                                    <HiOutlineUsers className="text-lg" />
                                    <span>عرض كل الحرفيين</span>
                                    <HiOutlineArrowLeft className="text-base" />
                                </motion.button>
                            </Link>
                        </div>
                    )}
                </div>

            </CustomContainer>

            {/* ── Stats Section ─────────────────────────────────────────── */}
            <div className="mt-24 bg-secondary py-14 md:py-20 px-6">
                <CustomContainer>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center"
                    >
                        {[
                            {
                                icon: <HiOutlineWrenchScrewdriver className="text-primary text-2xl" />,
                                value: craftsmanCount > 0 ? `${craftsmanCount}+` : "—",
                                label: "حرفي نشط",
                            },
                            {
                                icon: <HiOutlineUsers className="text-primary text-2xl" />,
                                value: allPersons && allPersons.length > 0 ? `${allPersons.length}+` : "—",
                                label: "مستخدم مسجل",
                            },
                            {
                                icon: <HiOutlineStar className="text-primary text-2xl" />,
                                value: Number(avgRating) > 0 ? `${avgRating}/5` : "—",
                                label: "متوسط تقييم الحرفيين",
                            },
                            {
                                icon: <HiOutlineSquares2X2 className="text-primary text-2xl" />,
                                value: categoryCount > 0 ? `${categoryCount}+` : "—",
                                label: "تخصص وخدمة",
                            },
                        ].map((stat, i) => (
                            <motion.div key={i} variants={itemVariants} className="space-y-3">
                                <div className="flex justify-center">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        {stat.icon}
                                    </div>
                                </div>
                                <h4 className="text-3xl md:text-4xl font-black text-white">{stat.value}</h4>
                                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </CustomContainer>
            </div>
        </section>
    );
};

export default ServicesAndCraftsmen;
