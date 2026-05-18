"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetAllCraftsmen } from "@/hooks/craftsman/useCraftsman";
import { useGetAllCategory } from "@/hooks/control/useConrtol";
import { HiOutlineStar, HiOutlineBriefcase, HiOutlineMapPin } from "react-icons/hi2";
import { FiLoader, FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";



const CraftsmenListClient = () => {
  const { data: craftsmenList, isLoading: isLoadingAll } = useGetAllCraftsmen();
  const { data: categories, isLoading: isLoadingCategories } = useGetAllCategory();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryToggle = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(catId => catId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-6">
      
      {/* Title & Premium Modern Header Section */}
      <header className="text-right space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-secondary leading-tight">
          نخبة الصنايعية والحرفيين
        </h1>
        <p className="text-gray-400 font-bold text-xs sm:text-sm max-w-2xl leading-relaxed font-sans">
          تصفح قائمة المهنيين والصنايعية المميزين لإتمام أعمال الجبس والديكور والصيانة بكفاءة عالية وضمان تام.
        </p>
      </header>

      {/* Clean & Simple Search input bar */}
      <section className="mb-6">
        <div className="relative w-full md:max-w-md">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث بالاسم، المهنة، أو الكلمات الدلالية..."
            className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-3 pr-10 outline-none transition-all shadow-sm font-sans"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Categories */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-secondary mb-4 pb-3 border-b border-gray-50 flex items-center gap-2">
              <FiFilter className="text-primary" />
              <span>تصفية الأصناف</span>
            </h3>

            <div className="space-y-3">
              {isLoadingCategories ? (
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold py-4">
                  <FiLoader className="animate-spin text-primary" />
                  <span>جاري التحميل...</span>
                </div>
              ) : categories && categories.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {categories.map((cat: any) => (
                    <label 
                      key={cat.categoryID} 
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input 
                        type="checkbox"
                        checked={selectedCategories.includes(Number(cat.categoryID))}
                        onChange={() => handleCategoryToggle(Number(cat.categoryID))}
                        className="w-4 h-4 text-primary bg-gray-50 border-gray-300 rounded  cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">
                        {cat.categoryName}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">لا توجد تصنيفات حالياً</p>
              )}
            </div>
          </div>
        </aside>

        {/* Craftsmen Grid cards (RTL Left side) */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoadingAll ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3 text-gray-400 text-xs font-bold bg-white rounded-lg border border-gray-100 font-sans">
                <FiLoader className="animate-spin text-primary" size={24} />
                <span>جاري تحميل الحرفيين...</span>
              </div>
            ) : craftsmenList && craftsmenList.length > 0 ? (
              craftsmenList.map((craftsman: any) => (
                <motion.div 
                  key={craftsman.craftsmanID} 
                  whileHover="hover"
                  whileTap={{ scale: 0.99 }}
                  className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Banner cover exactly like Home page card banner cover */}
                    <div className="relative h-40 w-full overflow-hidden bg-gray-50">
                      <motion.div 
                        variants={{ hover: { scale: 1.08 } }} 
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={craftsman.profileImageURL || "/imgs/default_2.jpeg"} 
                          alt="Platform cover" 
                          fill 
                          className="object-cover" 
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/15 to-transparent" />
                      
                      {/* Avatar precisely matching Home page with circular design and border */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                          <Image 
                            src={"/imgs/default_2.jpeg"} 
                            alt={craftsman.firstName} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Body details precisely like Home card design but optimized */}
                    <div className="p-4 space-y-4">
                      
                      {/* Name & Star rating */}
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-black text-secondary truncate">
                          {craftsman.firstName} {craftsman.lastName || ""}
                        </h3>
                        <div className="flex items-center gap-1 text-primary font-bold text-xs shrink-0 font-sans">
                          <HiOutlineStar className="fill-current text-primary text-sm" />
                          <span>{craftsman.averageRating && craftsman.averageRating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Display specialty category (الأصناف) dynamically */}
                      <div className="flex">
                        <span className="bg-primary/5 text-primary text-[10px] font-black px-2.5 py-1 rounded-md border border-orange-100/40">
                          {craftsman.category?.categoryName || "غير محدد"}
                        </span>
                      </div>

                      {/* Description & Location items */}
                      <div className="space-y-2 pt-1 border-t border-gray-50 font-sans">
                        <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                          <HiOutlineBriefcase className="text-primary text-base shrink-0" />
                          <span className="font-semibold line-clamp-1">
                            {craftsman.shortDescription || "حرفي متميز في منصة صهايلا"}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                          <HiOutlineMapPin className="text-primary text-base shrink-0" />
                          <span>المملكة العربية السعودية</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Redirect Button */}
                  <div className="p-4 pt-0">
                    <Link href={`/craftsmen/${craftsman.craftsmanID}`} className="block w-full">
                      <button className="w-full py-2.5 rounded-lg border border-secondary hover:border-primary text-secondary hover:text-white hover:bg-secondary font-black transition-all text-xs cursor-pointer">
                        عرض الملف الشخصي
                      </button>
                    </Link>
                  </div>

                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-lg border border-slate-100 font-sans">
                <p className="text-gray-400 font-bold text-xs sm:text-sm">لم يتم العثور على حرفيين يطابقون خيارات البحث.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CraftsmenListClient;
