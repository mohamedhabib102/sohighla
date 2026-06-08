"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineStar, HiOutlineMapPin, HiOutlineBriefcase } from "react-icons/hi2";
import { FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import CustomContainer from "../ui/CustomContainer";
import { useGetAllCraftsmen } from "@/hooks/craftsman/useCraftsman";

const categories = [
    {
        id: 1,
        title: "أعمال الكهرباء",
        desc: "تأسيس وصيانة وإصلاح كافة الأعطال الكهربائية",
        image: "/imgs/hero.png",
        count: "150+ متخصص",
        large: true
    },
    {
        id: 2,
        title: "السباكة",
        desc: "صيانة وتركيبات السباكة والصرف الصحي",
        image: "/imgs/piqsels.jpg",
        count: "120+ متخصص",
        large: false
    },
    {
        id: 3,
        title: "الدهانات والديكور",
        desc: "أحدث صيحات الدهانات والديكورات الداخلية",
        image: "/imgs/piqsels.com-id-jjtxl.jpg",
        count: "200+ متخصص",
        large: false
    }
];

const ServicesAndCraftsmen = () => {
    const { data: craftsmenList, isLoading: isLoadingCraftsmen } = useGetAllCraftsmen();

    return (
        <section className="py-16 md:py-24 bg-white" dir="rtl">
            <CustomContainer>
                
                {/* --- Section 1: Categories --- */}
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div className="text-right space-y-2">
                            <h2 className="text-2xl md:text-4xl font-black text-secondary">تصفح الخدمات حسب الفئة</h2>
                            <p className="text-gray-500 font-medium">اختر من بين مئات الخدمات المتوفرة في منطقتك</p>
                        </div>
                        <Link 
                            href="/services" 
                            className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300"
                        >
                            <HiOutlineArrowLeft className="text-xl" />
                            <span>عرض الكل</span>
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[500px]">
                        <div className="md:col-span-4 flex flex-col gap-6">
                            {categories.filter(c => !c.large).map((cat) => (
                                <motion.div 
                                    key={cat.id} 
                                    whileHover="hover"
                                    whileTap={{ scale: 0.98 }}
                                    className="relative h-64 md:flex-1 rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
                                >
                                    <motion.div 
                                        variants={{ hover: { scale: 1.1 } }} 
                                        transition={{ duration: 0.7 }}
                                        className="absolute inset-0"
                                    >
                                        <Image src={cat.image} alt={cat.title} fill className="object-cover" />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 right-0 p-6 text-right w-full">
                                        <h3 className="text-white text-xl font-bold mb-1">{cat.title}</h3>
                                        <p className="text-white/80 text-sm font-medium">{cat.count}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="md:col-span-8">
                            {categories.filter(c => c.large).map((cat) => (
                                <motion.div 
                                    key={cat.id} 
                                    whileHover="hover"
                                    whileTap={{ scale: 0.98 }}
                                    className="relative h-80 md:h-full rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
                                >
                                    <motion.div 
                                        variants={{ hover: { scale: 1.1 } }} 
                                        transition={{ duration: 0.7 }}
                                        className="absolute inset-0"
                                    >
                                        <Image src={cat.image} alt={cat.title} fill className="object-cover" />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 right-0 p-10 text-right w-full max-w-2xl">
                                        <h3 className="text-white text-3xl md:text-4xl font-black mb-3">{cat.title}</h3>
                                        <p className="text-white/90 text-lg mb-4 line-clamp-2">{cat.desc}</p>
                                        <div className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold">{cat.count}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Section 2: Featured Craftsmen --- */}
                <div className="mt-24">
                    <div className="text-right mb-10 space-y-2">
                        <h2 className="text-2xl md:text-4xl font-black text-secondary">نخبة الصنايعية</h2>
                        <p className="text-gray-500 font-medium">أكثر الحرفيين تقييماً ووثوقية في منصتنا</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {isLoadingCraftsmen ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-3 text-gray-400 text-sm font-bold bg-gray-50/50 rounded-3xl border border-gray-100 border-dashed">
                                <FiLoader className="animate-spin text-primary" size={28} />
                                <span>جاري تحميل نخبة الحرفيين...</span>
                            </div>
                        ) : craftsmenList && craftsmenList.length > 0 ? (
                            craftsmenList.map((craftsman) => (
                                <motion.div 
                                    key={craftsman.craftsmanID} 
                                    whileHover="hover"
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group text-right flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="relative h-44 w-full overflow-hidden bg-gray-50">
                                            <motion.div 
                                                variants={{ hover: { scale: 1.1 } }} 
                                                transition={{ duration: 0.7 }}
                                                className="absolute inset-0"
                                            >
                                                <Image 
                                                src={craftsman.profileImageURL || "/imgs/default_2.jpeg"} 
                                                title={craftsman.firstName}
                                                alt={"craftsman"} 
                                                fill className="object-cover" />
                                            </motion.div>
                                            <div className="absolute top-4 right-4">
                                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xl z-10 bg-white">
                                                    <Image 
                                                        src={"/imgs/default_2.jpeg"} 
                                                        alt={"logo platform"} 
                                                        fill 
                                                        className="object-cover" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 space-y-4">
                                            <div className="flex items-center justify-between flex-row-reverse gap-2">
                                                <h3 className="text-base font-bold text-secondary truncate">{craftsman.firstName}</h3>
                                                <div className="flex items-center gap-1 text-orange-500 font-bold text-xs shrink-0">
                                                    <HiOutlineStar className="fill-current text-orange-400" />
                                                    <span>{craftsman.averageRating && craftsman.averageRating?.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-gray-500 text-xs justify-start">
                                                    <HiOutlineBriefcase className="text-primary text-base shrink-0" />
                                                    <span className="font-semibold">{craftsman.shortDescription || "حرفي متميز"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-400 text-xs justify-start">
                                                    <HiOutlineMapPin className="text-primary text-base shrink-0" />
                                                    <span>{craftsman.locationText || "مصر المنصوره"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 pt-0">
                                        <Link href={`/craftsmen/${craftsman.personID}`} className="block w-full">
                                            <button className="w-full py-2.5 rounded-xl border border-secondary hover:border-primary text-secondary hover:text-white hover:bg-secondary font-bold transition-all text-xs cursor-pointer">
                                                عرض الملف الشخصي
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 bg-gray-50/50 rounded-3xl border border-gray-100 border-dashed">
                                <p className="text-gray-400 font-bold text-sm">لا يوجد صنايعية مسجلين حالياً في المنصة.</p>
                            </div>
                        )}
                    </div>
                </div>

            </CustomContainer>

            {/* Stats Section */}
            <div className="mt-24 bg-[#0B1221] py-12 md:py-20 px-6">
                <CustomContainer>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        <div className="space-y-3">
                            <h4 className="text-3xl md:text-4xl font-black text-white">50,000+</h4>
                            <p className="text-gray-400 text-sm font-medium">خدمة مكتملة</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-3xl md:text-4xl font-black text-white">12,000+</h4>
                            <p className="text-gray-400 text-sm font-medium">حرفي نشط</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-3xl md:text-4xl font-black text-white">4.8/5</h4>
                            <p className="text-gray-400 text-sm font-medium">تقييم العملاء</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-3xl md:text-4xl font-black text-white">+15</h4>
                            <p className="text-gray-400 text-sm font-medium">مدينة حول المملكة</p>
                        </div>
                    </div>
                </CustomContainer>
            </div>
        </section>
    );
};

export default ServicesAndCraftsmen;
