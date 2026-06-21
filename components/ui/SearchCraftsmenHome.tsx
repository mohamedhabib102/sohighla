"use client";

import { useGetAllCraftsmen } from "@/hooks/craftsman/useCraftsman";
import { CraftsmanType } from "@/types";
import { useState, useRef, useEffect } from "react";
import { 
  HiOutlineMapPin, 
  HiOutlineMagnifyingGlass, 
  HiOutlineBriefcase,
  HiStar,
  HiXMark
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SearchCraftsmenHome() {
    const { data, isLoading, error } = useGetAllCraftsmen();
    const [serachCategory, setSearchCategory] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Live search filter — matches categoryName, shortDescription, and skillName keywords
    const filteredCraftsmen = data?.filter((craftsman: CraftsmanType) => {
        const category = (craftsman.categoryName ?? "").toLowerCase();
        const location = (craftsman.locationText ?? "").toLowerCase();
        const desc = (craftsman.shortDescription ?? "").toLowerCase();
        // skillName is a comma-separated string on CraftsmanType — handled via shortDescription/category
        const term = serachCategory.toLowerCase().trim();

        const matchesCategory = term
            ? category.includes(term) || desc.includes(term)
            : true;

        const matchesLocation = searchLocation.trim()
            ? location.includes(searchLocation.toLowerCase().trim())
            : true;

        return matchesCategory && matchesLocation;
    }) || [];

    // Click outside listener to dismiss search results panel
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchClick = () => {
        setIsOpen(true);
    };

    return (
        <div className="w-full">
            <div 
                ref={searchContainerRef}
                className="relative bg-white rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-1.5 md:p-2 flex flex-col md:flex-row items-center gap-1 md:gap-2 border border-white/20 backdrop-blur-sm"
            >
                
                {/* Service/Craft Input */}
                <div className="flex-[1.5] w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-0 border-b md:border-b-0 md:border-l border-gray-50">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <HiOutlineBriefcase className="text-lg md:text-xl" />
                    </div>
                    <div className="flex flex-col flex-1 text-right">
                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">ماذا تبحث؟</label>
                        <input 
                            type="text" 
                            value={serachCategory}
                            onChange={(e) => {
                                setSearchCategory(e.target.value);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                            placeholder="مثلاً: سباك، نجار، كهربائي..."
                            className="w-full bg-transparent outline-none text-secondary placeholder:text-gray-300 font-bold text-xs md:text-sm"
                        />
                    </div>
                </div>

                {/* Location Input */}
                <div className="flex-1 w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <HiOutlineMapPin className="text-lg md:text-xl" />
                    </div>
                    <div className="flex flex-col flex-1 text-right">
                        <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">أين الدولة؟</label>
                        <input 
                            type="text" 
                            value={searchLocation}
                            onChange={(e) => {
                                setSearchLocation(e.target.value);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                            placeholder="مصر، السعودية، الإمارات..."
                            className="w-full bg-transparent outline-none text-secondary placeholder:text-gray-300 font-bold text-xs md:text-sm"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button 
                    onClick={handleSearchClick}
                    className="w-full md:w-auto bg-linear-main text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 md:gap-3 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 shrink-0 group"
                >
                    <HiOutlineMagnifyingGlass className="text-lg md:text-xl group-hover:rotate-12 transition-transform" />
                    <span className="text-base md:text-lg">بحث</span>
                </button>

                {/* Search Results Dropdown Panel */}
                <AnimatePresence>
                    {isOpen && (serachCategory || searchLocation) && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-3 z-50 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col w-full max-h-[400px]"
                            dir="rtl"
                        >
                            {/* Panel Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-50/50 border-b border-gray-100 shrink-0">
                                <span className="text-xs font-bold text-gray-400">
                                    نتائج البحث ({filteredCraftsmen.length})
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    <HiXMark className="text-lg" />
                                </button>
                            </div>

                            {/* Panel Body */}
                            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-10 gap-2">
                                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                        <p className="text-xs text-gray-400 font-bold">جاري البحث عن الحرفيين...</p>
                                    </div>
                                ) : error ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <p className="text-sm font-bold text-red-500">حدث خطأ أثناء تحميل البيانات</p>
                                        <p className="text-xs text-gray-400 mt-1">يرجى المحاولة مرة أخرى لاحقاً</p>
                                    </div>
                                ) : filteredCraftsmen.length > 0 ? (
                                    filteredCraftsmen.map((craftsman) => (
                                        <div
                                            key={craftsman.craftsmanID}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all duration-200 gap-3"
                                        >
                                            {/* Details Section */}
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shrink-0 bg-gray-50 relative">
                                                    <img
                                                        src={craftsman.profileImageURL || "/imgs/profile.jpg"}
                                                        alt={`${craftsman.firstName}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = "/imgs/profile.jpg";
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex flex-col min-w-0 text-right">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="font-bold text-sm text-secondary truncate">
                                                            {craftsman.firstName} {craftsman.lastName || ""}
                                                        </h4>
                                                        {craftsman.categoryName && (
                                                            <span className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 rounded-full font-bold">
                                                                {craftsman.categoryName}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Location */}
                                                    <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                                                        <HiOutlineMapPin className="text-primary shrink-0" />
                                                        <span className="truncate">
                                                            {craftsman.locationText ? craftsman.locationText : "لا يوجد"}
                                                        </span>
                                                    </div>

                                                    {/* Short Description */}
                                                    {craftsman.shortDescription && (
                                                        <p className="text-[10px] md:text-[11px] text-gray-500 mt-1 line-clamp-1">
                                                            {craftsman.shortDescription}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Section */}
                                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-gray-100 sm:border-none pt-2 sm:pt-0">
                                                {/* Rating */}
                                                <div className="flex items-center gap-1 text-yellow-400">
                                                    <HiStar size={14} className="fill-current" />
                                                    <span className="text-xs font-bold text-secondary">
                                                        {craftsman.averageRating?.toFixed(1) || "0.0"}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400">
                                                        ({craftsman.totalRatings || 0})
                                                    </span>
                                                </div>

                                                {/* Link Button */}
                                                <Link
                                                    href={`/craftsmen/${craftsman.personID}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="bg-primary hover:bg-primary/95 text-secondary text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                                                >
                                                    عرض التفاصيل
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
                                            <HiXMark size={20} />
                                        </div>
                                        <p className="text-xs font-bold text-secondary">لا يوجد نتائج</p>
                                        <p className="text-[10px] text-gray-400 mt-1">لم نجد أي حرفي يطابق الكلمات المفتاحية المدخلة</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}

