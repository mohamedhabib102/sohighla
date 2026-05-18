"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCraftsmanById } from "@/hooks/craftsman/useCraftsman";
import { PortfolioType } from "@/types";
import { 
  FiMapPin, FiStar, FiPhone, 
  FiBriefcase, FiLoader, FiMessageCircle,
  FiUser, FiCalendar, FiCheckCircle, FiGlobe
} from "react-icons/fi";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ErrorComponent from "@/components/ui/ErrorComponent";

interface CraftsmanDetailClientProps {
  craftsmanId: number;
}

const CraftsmanDetailClient = ({ craftsmanId }: CraftsmanDetailClientProps) => {
  const { data, isLoading, isError } = useCraftsmanById(craftsmanId);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isGettingPhone, setIsGettingPhone] = useState(false);

  const handleShowPhone = async () => {
    if (!data) return;
    const craftsman = data as PortfolioType;
    setIsGettingPhone(true);
    try {
      const { getShowPhone } = await import("@/services/craftsman/craftsmane.service");
      const fetchedPhone = await getShowPhone(craftsman.craftsmanID);
      setPhoneNumber(fetchedPhone);
    } catch (err) {
      console.error("Failed to load phone number:", err);
    } finally {
      setIsGettingPhone(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center py-20"><LoadingComponent /></div>;
  if (isError || !data) return <div className="flex items-center justify-center py-20"><ErrorComponent sectionName="تفاصيل الحرفي" message="عذراً، لم يتم العثور على الحرفي المطلوب أو حدث خطأ في الخادم." /></div>;

  const craftsman = data as PortfolioType;

  // Format phone number for WhatsApp link
  const formattedPhoneForWA = phoneNumber ? phoneNumber.trim().replace(/\+/g, "").replace(/^00/, "") : "";

  console.log(formattedPhoneForWA); 

  return (
    <section className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-700">
      
      {/* 1. Header Section (Exact Profile Style) */}
      <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden pb-6">
        <div className="relative w-full aspect-3/1 max-h-[400px]">
            <Image src={craftsman.bannerImageURL || "/imgs/banner.png"} 
            alt="banner" 
            fill 
            className="object-cover rounded-t-lg" 
            />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="lg:w-28 lg:h-28 w-18 h-18 lg:-mt-18 -mt-10 relative z-10 border-4 border-secondary rounded-lg overflow-hidden bg-white shrink-0">
                    <Image 
                    src={craftsman.profileImageURL || "/imgs/profile.jpg"}
                    alt="profile"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="mt-10 md:mt-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-secondary"> {craftsman.firstName} {craftsman.lastName} </h1>
                    </div>
                    <p className="text-gray-500 text-sm mt-1"> {craftsman.shortDescription} </p>
                    <div className="flex lg:flex-row flex-col lg:items-center items-start gap-1 lg:gap-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><FiStar size={14} className="text-yellow-400 fill-yellow-400" /> {craftsman.totalRatings} تقييم</span>
                    </div>
                </div>
            </div>
            
            {/* Dynamic Contact Action for Public Page */}
            <div className="mt-6 md:mt-4 flex gap-2">
              {phoneNumber ? (
                <>
                  <Link
                    href={`tel:${phoneNumber}`}
                    target="_blank"
                    className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
                  >
                    <FiPhone size={16} /> اتصال
                  </Link>
                  <Link
                    href={`https://wa.me/${formattedPhoneForWA}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
                  >
                    <FiMessageCircle size={16} /> واتساب
                  </Link>
                </>
              ) : (
                <button 
                  onClick={handleShowPhone}
                  disabled={isGettingPhone}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-secondary px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {isGettingPhone ? (
                    <><FiLoader className="animate-spin" size={16} /> جاري جلب الرقم...</>
                  ) : (
                    <><FiPhone size={16} /> إظهار رقمي للتواصل</>
                  )}
                </button>
              )}
            </div>

        </div>
      </article>

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sidebar Left: Additional Info */}
        <div className="lg:col-span-1 space-y-6">
          <article className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-secondary border-r-2 border-primary pr-3">معلومات إضافية</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-primary"><FiBriefcase size={18} /></div>
                <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">الصنعة / المهنة</p>
                    <p className="text-xs font-bold text-secondary">{craftsman?.categoryName || "غير محدد"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-primary"><FiMapPin size={18} /></div>
                <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">الموقع</p>
                    <p className="text-xs font-bold text-secondary">{craftsman.locationText || "غير محدد"}</p>
                </div>
              </div>



              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-primary"><FiCalendar size={18} /></div>
                <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">تاريخ الانضمام</p>
                    <p className="text-xs font-bold text-secondary">
                        {craftsman.createdAt ? new Date(craftsman.createdAt).toLocaleDateString("ar-EG") : "غير متوفر"}
                    </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50">
              <p className="text-xs font-bold text-secondary mb-3">المهارات المتخصصة</p>
              <div className="flex flex-wrap gap-2">
                {craftsman.skills && craftsman.skills.length > 0 ? craftsman.skills.map((s) => (
                  <span key={s.skillID} className="bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-gray-100">{s.skillName}</span>
                )) : <p className="text-xs text-gray-300 italic">لا توجد مهارات مضافة</p>}
              </div>
            </div>
          </article>
        </div>

        {/* Main Content Right */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About Section */}
          <article className="bg-white p-7 rounded-xl border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" /> عن الحرفي
            </h3>
            {craftsman.aboutDescription ? (
              <p className="text-gray-500 text-sm leading-relaxed italic">"{craftsman.aboutDescription}"</p>
            ) : <p className="text-gray-400 text-sm italic">لا توجد نبذة تعريفية مضافة حالياً.</p>}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { l: "سنوات خبرة", v: craftsman.yearsOfExperience ? `+${craftsman.yearsOfExperience}` : "+0" },
                { l: "مشروع مكتمل", v: "+0" },
                { l: "متاح الآن", v: craftsman.isAvailable ? "نعم" : "لا" }
              ].map(st => (
                <div key={st.l} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                  <p className="text-xl font-bold text-secondary">{st.v}</p>
                  <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold">{st.l}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Video Section */}
          <article className="bg-white p-7 rounded-xl border border-gray-100 shadow-sm space-y-4">
             <h3 className="text-lg font-bold text-secondary">فيديو تعريفي</h3>
             {craftsman.introVideoURL ? (
               <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer bg-gray-100 border border-gray-50">
                  <video src={craftsman.introVideoURL} className="w-full h-full object-cover" controls />
               </div>
             ) : (
                <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                    <FiUser className="text-gray-300 mb-2" size={40} />
                    <p className="text-gray-400 text-sm font-bold">لا يوجد فيديو تعريفي</p>
                </div>
             )}
          </article>

          {/* Portfolio Section */}
          <article className="bg-white p-7 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-secondary">معرض الأعمال</h3>
            </div>
            {craftsman.workImages && craftsman.workImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {craftsman.workImages.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-50 shadow-sm group">
                    <Image src={img.imageURL} alt="work" fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 space-y-4">
                    <div className="text-center">
                        <p className="text-gray-400 text-sm font-bold">معرض الأعمال فارغ حالياً</p>
                    </div>
                </div>
            )}
          </article>

          {/* Reviews Section */}
          <article className="bg-white p-7 rounded-xl border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-lg font-bold text-secondary">تقييمات العملاء</h3>
            <div className="space-y-6">
              {craftsman.comments && craftsman.comments.length > 0 ? (
                  craftsman.comments.map((rev, index) => (
                    <div key={index} className="space-y-3 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center font-bold text-sm">
                            {rev.personName.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-secondary text-xs">{rev.personName}</p>
                            <div className="flex items-center gap-1 mt-0.5 text-yellow-400">
                            {[...Array(5)].map((_, i) => <FiStar key={i} size={10} className="fill-current" />)}
                            </div>
                        </div>
                        </div>
                        <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full font-bold">{new Date(rev.createdAt).toLocaleDateString("ar-EG")}</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed pr-2 border-r-2 border-gray-50">{rev.commentText}</p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-400 text-sm italic text-center py-4">لا توجد تقييمات بعد.</p>
              )}
            </div>
            {craftsman.comments && craftsman.comments.length > 0 && (
              <button className="w-full py-3 rounded-xl border border-gray-100 text-gray-400 text-xs font-bold hover:bg-gray-50">قراءة كافة التقييمات</button>
            )}
          </article>

        </div>

      </div>
    </section>
  );
};

export default CraftsmanDetailClient;
