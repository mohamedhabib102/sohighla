"use client";

import { useGetAllCraftsmen } from "@/hooks/craftsman/useCraftsman";
import { CraftsmanType } from "@/types";
import { useState } from "react";
import { HiOutlineMapPin, HiOutlineMagnifyingGlass, HiOutlineBriefcase } from "react-icons/hi2";

export default function SearchCraftsmenHome() {
    const {data, isLoading, error} = useGetAllCraftsmen()
    const [serachCategory, setSearchCategory] = useState("")
    const [searchLocation, setSearchLocation] = useState("")




    // console.log(data)

const handlelSearchByCategoryAndLocation = () => {
  const filteredCraftsmen = data?.filter((craftsmen: CraftsmanType) => {
    const firstName = craftsmen.firstName ?? "";
    const location = craftsmen.locationText ?? "";

    const matchesCategory = serachCategory
      ? firstName.toLowerCase().includes(serachCategory.toLowerCase())
      : true;

    const matchesLocation = searchLocation
      ? location.toLowerCase().includes(searchLocation.toLowerCase())
      : true;

    return matchesCategory && matchesLocation;
  });

  console.log(filteredCraftsmen);
};

 
    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-1.5 md:p-2 flex flex-col md:flex-row items-center gap-1 md:gap-2 border border-white/20 backdrop-blur-sm">
                
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
                            onChange={(e) => setSearchCategory(e.target.value)}
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
                            onChange={(e) => setSearchLocation(e.target.value)}
                            placeholder="مصر، السعودية، الإمارات..."
                            className="w-full bg-transparent outline-none text-secondary placeholder:text-gray-300 font-bold text-xs md:text-sm"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button 
                 onClick={handlelSearchByCategoryAndLocation}
                className="w-full md:w-auto bg-linear-main text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 md:gap-3 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 shrink-0 group">
                    <HiOutlineMagnifyingGlass className="text-lg md:text-xl group-hover:rotate-12 transition-transform" />
                    <span className="text-base md:text-lg">بحث</span>
                </button>

            </div>
        </div>
    );
}
