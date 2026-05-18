"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { motion } from "framer-motion";

const services = [
    {
        id: 1,
        title: "أعمال الكهرباء",
        desc: "تأسيس وصيانة وإصلاح كافة الأعطال الكهربائية",
        image: "/imgs/hero.png", // Using hero workshop as a placeholder for electrical if no specific one
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

const Services = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 ">
                    <div className="text-right space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-secondary">تصفح الخدمات حسب الفئة</h2>
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

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                    
                    {/* Left Column (Small Cards) */}
                    <div className="md:col-span-4 flex flex-col gap-6 h-full">
                        {services.filter(s => !s.large).map((service) => (
                            <motion.div 
                                key={service.id}
                                whileHover={{ y: -5 }}
                                className="relative flex-1 rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
                            >
                                <Image 
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 right-0 p-6 text-right w-full">
                                    <h3 className="text-white text-xl font-bold mb-1">{service.title}</h3>
                                    <p className="text-white/80 text-sm font-medium">{service.count}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column (Large Card) */}
                    <div className="md:col-span-8 h-full">
                        {services.filter(s => s.large).map((service) => (
                            <motion.div 
                                key={service.id}
                                whileHover={{ y: -5 }}
                                className="relative h-full rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
                            >
                                <Image 
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 right-0 p-10 text-right w-full max-w-2xl">
                                    <h3 className="text-white text-3xl md:text-4xl font-black mb-3">{service.title}</h3>
                                    <p className="text-white/90 text-lg mb-4 line-clamp-2">{service.desc}</p>
                                    <div className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold">
                                        {service.count}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;
