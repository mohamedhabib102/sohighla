"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
    HiOutlineArrowRight,
    HiOutlineSquares2X2,
    HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { FiLoader } from "react-icons/fi";
import CustomContainer from "@/components/ui/CustomContainer";
import { useGetAllCategory } from "@/hooks/control/useConrtol";
import { CategoryType } from "@/types";

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Category Card ─────────────────────────────────────────────────────────────
// Single unified icon, brand colors only (amber / secondary)
function CategoryCard({ cat }: { cat: CategoryType }) {
    return (
        <motion.div variants={cardVariants}>
            <Link href={`/craftsmen?category=${cat.categoryID}`}>
                <motion.div
                    whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(245,158,11,0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-amber-100 cursor-pointer text-center hover:border-amber-300 transition-colors duration-200"
                >
                    {/* Unified icon */}
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-200">
                        <HiOutlineWrenchScrewdriver className="text-2xl text-amber-500 group-hover:text-white transition-colors duration-200" />
                    </div>

                    {/* Name */}
                    <h2 className="text-sm font-bold text-secondary leading-snug group-hover:text-amber-600 transition-colors duration-200">
                        {cat.categoryName}
                    </h2>
                </motion.div>
            </Link>
        </motion.div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
    const { data: categories, isLoading } = useGetAllCategory();

    return (
        <>
            <main className="min-h-screen bg-gray-50" dir="rtl">

                {/* ── Hero Banner ───────────────────────────────────────────── */}
                <div className="bg-secondary py-16 px-6">
                    <CustomContainer>
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold mb-2">
                                <HiOutlineSquares2X2 />
                                <span>جميع الخدمات</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white">
                                تصفح كل الخدمات المتاحة
                            </h1>
                            <p className="text-gray-400 text-base max-w-xl mx-auto">
                                اختر الخدمة التي تحتاجها وتواصل مع أمهر الحرفيين المتاحين في منطقتك
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 mt-4 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                <HiOutlineArrowRight />
                                <span>العودة للرئيسية</span>
                            </Link>
                        </div>
                    </CustomContainer>
                </div>

                {/* ── Categories Grid ───────────────────────────────────────── */}
                <CustomContainer>
                    <div className="py-16">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                                <FiLoader className="animate-spin text-primary" size={36} />
                                <span className="text-sm font-bold">جاري تحميل الخدمات...</span>
                            </div>
                        ) : categories && categories.length > 0 ? (
                            <>
                                <p className="text-gray-400 text-sm font-medium mb-8 text-right">
                                    {(categories as CategoryType[]).length} خدمة متاحة
                                </p>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                                >
                                    {(categories as CategoryType[]).map((cat) => (
                                        <CategoryCard key={cat.categoryID} cat={cat} />
                                    ))}
                                </motion.div>
                            </>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-3xl border border-amber-100 border-dashed shadow-sm">
                                <HiOutlineSquares2X2 className="text-amber-200 text-6xl mx-auto mb-4" />
                                <p className="text-gray-400 font-bold text-sm">لا توجد خدمات مسجلة حالياً.</p>
                            </div>
                        )}
                    </div>
                </CustomContainer>
            </main>
        </>
    );
}

