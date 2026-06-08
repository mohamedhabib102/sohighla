"use client";
import Image from "next/image";
import { PiSealCheckDuotone } from "react-icons/pi";
import { FiEdit3, FiMapPin, FiStar, FiClock, FiGlobe, FiCheckCircle, FiPlay, FiPlus, FiVideo, FiImage, FiBriefcase } from "react-icons/fi";
import { MdMarkEmailRead, MdOutlineVerifiedUser } from "react-icons/md";
import { useCraftsmanById, useDeleteWorkImage, useAddWorkImages, useShowPhone } from "@/hooks/craftsman/useCraftsman";
import { useAuthStore } from "@/store/auth-store";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Popup from "@/components/ui/Popup";
import CreatePortfolioForm from "./CreatePortfolioForm";
import UpdatePortfolioForm from "./UpdatePortfolioForm";
import UpdatePhoneForm from "./UpdatePhoneForm";
import { useState } from "react";
import { PortfolioType } from "@/types";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/query-keys";


const ProfileCraftsman = () => {
  const { user } = useAuthStore();
  const { data, isLoading, isError } = useCraftsmanById(user?.personID || 0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPhonePopupOpen, setIsPhonePopupOpen] = useState(false);
  const { mutate, isLoading: isLoadingDeleteWorkImage } = useDeleteWorkImage();
  const { mutate: addImages, isLoading: isAddingImages } = useAddWorkImages();
  const queryClient = useQueryClient();
  const { data: phoneNumber, refetch: getPhone, isLoading: isGettingPhone } = useShowPhone(data?.craftsmanID || 0);

  if (isLoading) return <LoadingComponent />;

  const craftsman = data as PortfolioType;

  // console.log(user);

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("craftsmanId", craftsman.craftsmanID.toString());
      Array.from(e.target.files).forEach(file => formData.append("images", file));
      
      await addImages(formData);
      queryClient.invalidateQueries({ queryKey: QueryKeys.getCraftsmanById(user?.personID || 0) });
    }
  };



  const deleteWorkImage = async (id: number) => {
    await mutate(id)
    queryClient.invalidateQueries({ queryKey: QueryKeys.getCraftsmanById(user?.personID || 0) });
  }
  


  // If no data, show ErrorComponent with a button to add data
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
        <ErrorComponent 
          sectionName="الملف الشخصي" 
          message="يبدو أنك لم تقم بإضافة بيانات ملفك الشخصي حتى الآن. إضافة بياناتك تساعدك في الوصول لعملاء أكثر." 
        />
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="mt-8 flex items-center gap-2 bg-primary text-secondary px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all"
        >
          <FiPlus /> إضافة بيانات الملف الشخصي
        </button>

        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title="إضافة بيانات الملف الشخصي">
            <CreatePortfolioForm onSuccess={() => setIsPopupOpen(false)} />
        </Popup>
      </div>
    );
  }


  return (
    <section className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-700">
      
      {/* 1. Header Section (Original Style) */}
      <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden pb-6">
        <div className="relative w-full aspect-3/1 max-h-100">
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
                        {user?.isVerifyEmail ? (
                        <span className="flex items-center flex-row-reverse gap-1">
                          <span className="text-secondary text-sm">تم التحقق من البريد الالكتروني</span>
                          <MdMarkEmailRead size={24} className="text-secondary"/>                        
                        </span>)
                        : (<></>)  
                      }
                    </div>
                </div>
            </div>
            {data && (
              <>
                <button 
              onClick={() => setIsPopupOpen(true)}
              className="mt-6 md:mt-4 flex items-center gap-2 bg-primary hover:bg-primary/90 text-secondary px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
            >
                <FiEdit3 size={16} /> تعديل الحساب
            </button>
              </>
            )}


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
                    <p className="text-xs font-bold text-secondary">{craftsman.categoryName || "غير محدد"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-primary"><FiMapPin size={18} /></div>
                <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">الموقع</p>
                    <p className="text-xs font-bold text-secondary">{craftsman.locationText || "غير محدد"}</p>
                </div>
              </div>


              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-primary"><FiGlobe size={18} /></div>
                  <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase"> رقم الهاتف </p>
                      <div className="flex items-center gap-2">
                          {phoneNumber ? (
                              <p className="text-xs font-bold text-secondary">{phoneNumber}</p>
                          ) : (
                              <button 
                                  onClick={() => getPhone()}
                                  disabled={isGettingPhone}
                                  className="text-[10px] font-bold text-primary hover:underline cursor-pointer disabled:opacity-50"
                              >
                                  {isGettingPhone ? "جاري الجلب..." : "إظهار الرقم"}
                              </button>
                          )}
                      </div>
                  </div>
                </div>
                
                {/* Update Phone Number Trigger */}
                <button
                  onClick={() => setIsPhonePopupOpen(true)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-slate-400 hover:text-primary transition-all cursor-pointer flex items-center justify-center shrink-0 border border-transparent hover:border-slate-100"
                  title="تعديل رقم الهاتف"
                >
                  <FiEdit3 size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-primary">
                    <MdMarkEmailRead size={18} />
                  </div>
                  <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">البريد الإلكتروني</p>
                      <p className="text-xs font-bold text-secondary">{user?.email || "غير متوفر"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg text-[9px] font-extrabold text-gray-400 select-none border border-gray-100/80 shrink-0" title="البريد الإلكتروني للحساب الأساسي لا يمكن تعديله">
                  <span>أساسي</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-primary"><BsCalendar2DateFill size={18} /></div>
                <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">  تاريخ الانضمام </p>
                    <p className="text-xs font-bold text-secondary">{new Date(craftsman.createdAt).toLocaleDateString("ar-EG") }</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50">
              <p className="text-xs font-bold text-secondary mb-3">المهارات المتخصصة</p>
              <div className="flex flex-wrap gap-2">
                {craftsman.skills?.length > 0 ? craftsman.skills.map((s) => (
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
                { l: "سنوات خبرة", v: `+${craftsman.yearsOfExperience || 0}` },
                { l: "مشروع مكتمل", v: "+0" }, // Mocked since not in PortfolioType
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
                    <FiVideo className="text-gray-300 mb-2" size={40} />
                    <p className="text-gray-400 text-sm font-bold">لم يتم رفع فيديو تعريفي بعد</p>
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
                    <button disabled={isLoadingDeleteWorkImage} 
                    onClick={() => deleteWorkImage(Number(img?.imageID))} className="absolute top-4 right-2 bg-red-500/90 hover:bg-red-600 transition-colors cursor-pointer text-white px-4 py-2 rounded-xl font-bold text-sm z-10"> حذف </button>
                    <Image src={img.imageURL} alt="work" fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 space-y-4">
                    <FiImage className="text-gray-300" size={40} />
                    <div className="text-center">
                        <p className="text-gray-400 text-sm font-bold">معرض الأعمال فارغ حالياً</p>
                        <p className="text-[10px] text-gray-300 mt-1">أضف بعض الصور لعرض مهاراتك للعملاء</p>
                    </div>
                    
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        id="add-images-input" 
                        className="hidden" 
                        onChange={handleAddImages}
                        disabled={isAddingImages}
                    />
                    <label 
                        htmlFor="add-images-input"
                        className={`flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-xl font-bold text-sm cursor-pointer hover:scale-105 transition-all ${isAddingImages ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        {isAddingImages ? "جاري الرفع..." : (
                            <>
                                <FiPlus /> إضافة صور أعمال
                            </>
                        )}
                    </label>
                </div>
            )}
          </article>

          {/* Reviews Section */}
          <article className="bg-white p-7 rounded-xl border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-lg font-bold text-secondary">تقييمات العملاء</h3>
            <div className="space-y-6">
              {craftsman.comments?.length > 0 ? (
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
            <button className="w-full py-3 rounded-xl border border-gray-100 text-gray-400 text-xs font-bold hover:bg-gray-50">قراءة كافة التقييمات</button>
          </article>

        </div>

      </div>

      {/* Popup Modal for Create/Edit */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title={data ? "تعديل بيانات الملف الشخصي" : "إضافة بيانات الملف الشخصي"}>
            {data ? (
              <UpdatePortfolioForm initialData={craftsman} onSuccess={() => setIsPopupOpen(false)} />
            ) : (
              <CreatePortfolioForm onSuccess={() => setIsPopupOpen(false)} />
            )}
      </Popup>

      {/* Popup Modal for Updating Phone Number */}
      <Popup isOpen={isPhonePopupOpen} onClose={() => setIsPhonePopupOpen(false)} title="تعديل رقم الهاتف">
        <UpdatePhoneForm 
          initialPhone={phoneNumber || ""} 
          onSuccess={() => {
            setIsPhonePopupOpen(false);
            // Refetch phone number after successful update
            getPhone();
          }} 
        />
      </Popup>
    </section>
  );
};

export default ProfileCraftsman;
