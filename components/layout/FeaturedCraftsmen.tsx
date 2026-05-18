"use client";

import Image from "next/image";
import { HiOutlineStar, HiOutlineMapPin, HiOutlineBriefcase } from "react-icons/hi2";
import { motion } from "framer-motion";

const craftsmen = [
    {
        id: 1,
        name: "فهد العتيبي",
        specialty: "فني كهرباء ذكية",
        location: "السعودية، الرياض، حي الملقا",
        rating: 4.7,
        avatar: "/imgs/profile.jpg",
        banner: "/imgs/default_2.jpeg"
    },
    {
        id: 2,
        name: "سارة خالد",
        specialty: "دهانات داخلية وديكور",
        location: "السعودية، الدمام، حي الشاطئ",
        rating: 5.0,
        avatar: "/imgs/profile.jpg",
        banner: "/imgs/default_2.jpeg"
    },
    {
        id: 3,
        name: "سعد إبراهيم",
        specialty: "أعمال سباكة متكاملة",
        location: "السعودية، جدة، حي الروضة",
        rating: 4.8,
        avatar: "/imgs/profile.jpg",
        banner: "/imgs/default_2.jpeg"
    },
    {
        id: 4,
        name: "أحمد محمد",
        specialty: "نجار أثاث منزلي",
        location: "السعودية، الرياض، حي الياسمين",
        rating: 4.9,
        avatar: "/imgs/profile.jpg",
        banner: "/imgs/default_2.jpeg"
    }
];

const FeaturedCraftsmen = () => {
    return (
        <section className="py-16 md:py-24 bg-white" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Craftsmen Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {craftsmen.map((craftsman) => (
                        <motion.div 
                            key={craftsman.id}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group text-right"
                        >
                            {/* Banner Image Area */}
                            <div className="relative h-52 w-full">
                                <Image 
                                    src={craftsman.banner}
                                    alt="Platform"
                                    fill
                                    className="object-cover"
                                />
                                {/* Avatar - Standalone floating circle without any verification marks */}
                                <div className="absolute top-4 right-4">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xl z-10">
                                        <Image src={craftsman.avatar} alt={craftsman.name} width={56} height={56} className="object-cover" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-5 space-y-4">
                                <div className="flex items-center justify-between flex-row-reverse">
                                    <h3 className="text-lg font-bold text-secondary">{craftsman.name}</h3>
                                    <div className="flex items-center gap-1 text-orange-500 font-bold">
                                        <HiOutlineStar className="fill-current" />
                                        <span>{craftsman.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm justify-start">
                                        <HiOutlineBriefcase className="text-primary text-base" />
                                        <span className="font-medium">{craftsman.specialty}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 text-xs justify-start">
                                        <HiOutlineMapPin className="text-primary text-base" />
                                        <span>{craftsman.location}</span>
                                    </div>
                                </div>

                                <button className="w-full py-2.5 rounded-xl border border-secondary text-secondary font-bold hover:bg-secondary hover:text-white transition-colors">
                                    احجز الآن
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats Section - Matching the dark theme in the screenshot */}
            <div className="mt-16 md:mt-24 bg-[#0B1221] py-12 md:py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
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
            </div>
        </section>
    );
};

export default FeaturedCraftsmen;
