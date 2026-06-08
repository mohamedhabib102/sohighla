"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetAllCraftsmen, useGetCraftsmenByCategory } from "@/hooks/craftsman/useCraftsman";
import { useGetAllCategory } from "@/hooks/control/useConrtol";
import { HiOutlineStar, HiOutlineBriefcase, HiOutlineMapPin } from "react-icons/hi2";
import { FiLoader, FiFilter, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { CraftsmanType, CraftsmanByCategoryType } from "@/types";

const CraftsmenListClient = () => {
  const { data: craftsmenList, isLoading: isLoadingAll } = useGetAllCraftsmen();
  const { data: categories, isLoading: isLoadingCategories } = useGetAllCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number>(0);
  const { data: craftsmenByCategory, loading: loadingByCategory } = useGetCraftsmenByCategory(selectedCategories);

  const handleCategoryToggle = (id: number) => {
    if (id !== 0) {
      setSelectedCategories(id);
    }
  };

  const resetFilter = () => {
    setSelectedCategories(0);
  };

  const displayCraftsmen: (CraftsmanType | CraftsmanByCategoryType)[] = useMemo(() => {
    let list =
      selectedCategories !== 0 && craftsmenByCategory
        ? craftsmenByCategory
        : craftsmenList || [];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter(
        (craftsman: any) =>
          craftsman.category?.categoryName?.toLowerCase().includes(term)
      );
    }

    return list;
  }, [craftsmenList, craftsmenByCategory, selectedCategories, searchTerm]);

  const isLoading = isLoadingAll || loadingByCategory;

  const getCategoryName = (craftsman: any) => {
    if (craftsman.category?.categoryName) return craftsman.category.categoryName;
    if (selectedCategories !== 0) {
      const cat = categories?.find((c: any) => c.categoryID === selectedCategories);
      return cat?.categoryName || "غير محدد";
    }
    return "غير محدد";
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-6">

      <header className="text-right space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-secondary leading-tight">
          نخبة الصنايعية والحرفيين
        </h1>
        <p className="text-gray-400 font-bold text-xs sm:text-sm max-w-2xl leading-relaxed font-sans">
          تصفح قائمة المهنيين والصنايعية المميزين لإتمام أعمال الجبس والديكور والصيانة بكفاءة عالية وضمان تام.
        </p>
      </header>

      <section className="mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

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
                  <button
                    onClick={resetFilter}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all text-sm font-bold
                      ${selectedCategories === 0
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-primary hover:text-white hover:border-primary"
                      }`}
                  >
                    <FiFilter className="text-base" />
                    الكل
                  </button>
                  {categories.map((cat: any) => (
                    <label
                      key={cat.categoryID}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories === Number(cat.categoryID)}
                        onChange={() => handleCategoryToggle(Number(cat.categoryID))}
                        className="w-4 h-4 text-primary bg-gray-50 border-gray-300 rounded cursor-pointer"
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

        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3 text-gray-400 text-xs font-bold bg-white rounded-lg border border-gray-100 font-sans">
                <FiLoader className="animate-spin text-primary" size={24} />
                <span>جاري تحميل الحرفيين...</span>
              </div>
            ) : displayCraftsmen.length > 0 ? (
              displayCraftsmen.map((craftsman: any) => (
                <motion.div
                  key={craftsman.craftsmanID}
                  whileHover="hover"
                  whileTap={{ scale: 0.99 }}
                  className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
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

                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-black text-secondary truncate">
                          {craftsman.firstName} {craftsman.lastName || ""}
                        </h3>
                        <div className="flex items-center gap-1 text-primary font-bold text-xs shrink-0 font-sans">
                          <HiOutlineStar className="fill-current text-primary text-sm" />
                          <span>{craftsman.averageRating?.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="flex">
                        <span className="bg-primary/5 text-primary text-[10px] font-black px-2.5 py-1 rounded-md border border-orange-100/40">
                          {getCategoryName(craftsman)}
                        </span>
                      </div>

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

                  <div className="p-4 pt-0">
                    <Link href={`/craftsmen/${craftsman.personID}`} className="block w-full">
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
