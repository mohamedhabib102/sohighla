"use client";
import { useForm } from "react-hook-form";
import { useCreateCraftsman } from "@/hooks/craftsman/useCraftsman";
import { useGetAllCategory, useGetAllSkills, useCreateCategory } from "@/hooks/control/useConrtol";
import { FiUpload, FiCheck, FiInfo, FiCamera, FiVideo, FiImage, FiCheckCircle, FiLoader, FiChevronDown, FiSearch } from "react-icons/fi";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/query-keys";
import { useAuthStore } from "@/store/auth-store";
import toast from "react-hot-toast";


const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_VIDEO_DURATION_SECS = 15 * 60; // 15 minutes


interface CreatePortfolioFormProps {
  onSuccess: () => void;
}

function validateImageDimensions(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const w = img.width;
      const h = img.height;
      URL.revokeObjectURL(img.src);
      resolve({ w, h });
    };
    img.onerror = () => {
      reject();
    };
  });
}

function validateVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    video.onerror = () => {
      reject();
    };
  });
}




const CreatePortfolioForm = ({ onSuccess }: CreatePortfolioFormProps) => {
  const { mutate, isLoading: isSubmitting } = useCreateCraftsman();
  const { data: skills, isLoading: isLoadingSkills } = useGetAllSkills();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const queryClient = useQueryClient()
  const {user} = useAuthStore()
  const { data: categories, isLoading: isLoadingCategories } = useGetAllCategory()
  const [category, setCategory] = useState<number | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const widthRef = useRef<HTMLInputElement>(null);

  const { mutate: createCategoryMutate, isLoading: isCreatingCategory } = useCreateCategory();
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
 
  console.log(`vide default ${MAX_VIDEO_SIZE}`)
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("يرجى كتابة اسم التخصص أولاً");
      return;
    }
    
    try {
      await createCategoryMutate(newCategoryName.trim());
      setIsAddingNewCategory(false);
      setSearchQuery(newCategoryName.trim());
      setIsCategoryOpen(true);
      setNewCategoryName("");
      toast.success("يرجى الضغط على تخصصك الجديد لتحديده من القائمة أدناه.");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const filteredCategories = categories?.filter((cat: { categoryID: number, categoryName: string }) =>
    cat.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Array to store selected skill IDs
  const [selectedSkillIDs, setSelectedSkillIDs] = useState<number[]>([]);

  const toggleSkill = (id: number) => {
    if (selectedSkillIDs.includes(id)) {
      setSelectedSkillIDs(selectedSkillIDs.filter(skillId => skillId !== id));
    } else {
      setSelectedSkillIDs([...selectedSkillIDs, id]);
    }
  };




  const onSubmit = async (data: any) => {
    if (!category) {
      toast.error("يرجى اختيار التخصص الرئيسي");
      return;
    }

    // Validate file sizes and durations using global constants
    if (data.ProfileImageURL?.[0]) {
      if (data.ProfileImageURL[0].size > MAX_IMAGE_SIZE) {
        toast.error("حجم الصورة الشخصية كبير جداً. الحد الأقصى المسموح به هو 5 ميجابايت.");
        return;
      }
    }

    const file = widthRef.current?.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error("حجم صورة الغلاف كبير جداً. الحد الأقصى المسموح به هو 5 ميجابايت.");
        return;
      }
    }

    if (data.IntroVideoURL?.[0]) {
      if (data.IntroVideoURL[0].size > MAX_VIDEO_SIZE) {
        toast.error("حجم الفيديو التعريفي كبير جداً. يرجى اختيار فيديو بحجم أقل من 100 ميجابايت لضمان الرفع بنجاح.");
        return;
      }
      try {
        const duration = await validateVideoDuration(data.IntroVideoURL[0]);
        if (duration > MAX_VIDEO_DURATION_SECS) {
          toast.error("الفيديو التعريفي طويل جداً. الحد الأقصى المسموح به هو 15 دقيقة.");
          return;
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء فحص مدة الفيديو، يرجى المحاولة مرة أخرى.");
        return;
      }
    }

    if (data.WorkImages && data.WorkImages.length > 0) {
      let totalWorkSize = 0;
      const filesArray = Array.from(data.WorkImages as FileList);
      for (const f of filesArray) {
        if (f.size > MAX_IMAGE_SIZE) {
          toast.error(`حجم الصورة "${f.name}" يتجاوز 5 ميجابايت.`);
          return;
        }
        totalWorkSize += f.size;
      }
      if (totalWorkSize > 25 * 1024 * 1024) {
        toast.error("إجمالي حجم صور معرض الأعمال كبير جداً. يرجى تقليل عدد الصور أو اختيار أحجام أصغر (أقل من 25 ميجابايت إجمالاً).");
        return;
      }
    }

    if (file) {
      try {
        const { w, h } = await validateImageDimensions(file);
        
        // Horizontal image check
        if (w < h) {
          toast.error("يرجى اختيار صورة عرضية (أفقية) لتناسب تصميم الغلاف.");
          return;
        }
        
      } catch (error) {
        toast.error("حدث خطأ أثناء فحص أبعاد الصورة، يرجى المحاولة مرة أخرى.");
        return;
      }
    }

    const formData = new FormData();
    
    formData.append("ShortDescription", data.ShortDescription);
    formData.append("AboutDescription", data.AboutDescription);
    formData.append("YearsOfExperience", data.YearsOfExperience.toString());
    formData.append("LocationText", data.LocationText);
    formData.append("IsAvailable", data.IsAvailable.toString());
    formData.append("CategoryID", category.toString());
    
    // Append selected IDs
    selectedSkillIDs.forEach(id => formData.append("SkillIDs", id.toString()));
    

    if (file) {
      formData.append("BannerImageURL", file);
    }
    
    
 
    if (data.ProfileImageURL?.[0]) formData.append("ProfileImageURL", data.ProfileImageURL[0]);
    if (data.IntroVideoURL?.[0]) formData.append("IntroVideoURL", data.IntroVideoURL[0]);
    
    if (data.WorkImages) {
      Array.from(data.WorkImages as FileList).forEach(file => {
        formData.append("WorkImages", file);
      });
    }

    try {
      await mutate(formData);
      queryClient.invalidateQueries({
        queryKey: QueryKeys.getCraftsmanById(user?.personID || 0)
      })
      onSuccess();
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-right" dir="rtl">
      
      {/* Text Fields */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-secondary flex items-center gap-2">
            <FiInfo className="text-primary" /> وصف قصير (يظهر تحت اسمك)
        </label>
        <input
          {...register("ShortDescription", { required: "هذا الحقل مطلوب" })}
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="مثلاً: نجار خبير في الأثاث العصري"
        />
        {errors.ShortDescription && <p className="text-red-500 text-[10px]">{errors.ShortDescription.message as string}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-secondary">عن الحرفي (نبذة مفصلة)</label>
        <textarea
          {...register("AboutDescription", { required: "هذا الحقل مطلوب" })}
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-24"
        />
      </div>

      <div className="space-y-2 relative z-30">
        <label className="text-sm font-bold text-secondary flex items-center gap-2">
          <span>التخصص الرئيسي (مجال عملك)</span>
        </label>
        
        <div className="relative space-y-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all flex items-center justify-between text-right cursor-pointer shadow-sm hover:bg-gray-100/50"
            >
              <span className={category ? "text-secondary font-bold text-[13px]" : "text-gray-400 text-[13px]"}>
                {categories?.find((c: { categoryID: number }) => c.categoryID === category)?.categoryName || "اختر تخصصك الرئيسي من القائمة..."}
              </span>
              <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${isCategoryOpen ? "rotate-180 text-primary" : ""}`} size={18} />
            </button>

            {isCategoryOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-150 rounded-2xl shadow-2xl z-50 p-2 space-y-2 max-h-68 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* Category Search Input */}
                <div className="relative flex items-center px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                  <FiSearch className="text-gray-400 ml-2" size={16} />
                  <input
                    type="text"
                    placeholder="ابحث عن تخصصك..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-secondary outline-none text-right dir-rtl font-medium"
                  />
                </div>

                {/* Category List Options */}
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {isLoadingCategories ? (
                    <div className="flex items-center justify-center py-6 gap-2 text-gray-400 text-xs font-semibold">
                      <FiLoader className="animate-spin text-primary" size={16} />
                      <span>جاري تحميل الأقسام...</span>
                    </div>
                  ) : filteredCategories && filteredCategories.length > 0 ? (
                    filteredCategories.map((cat: { categoryID: number; categoryName: string }) => {
                      const isSelected = category === cat.categoryID;
                      return (
                        <button
                          type="button"
                          key={cat.categoryID}
                          onClick={() => {
                            setCategory(cat.categoryID);
                            setIsCategoryOpen(false);
                            setSearchQuery("");
                          }}
                          className={`w-full p-3 rounded-xl flex items-center justify-between transition-all text-right text-[13px] font-bold cursor-pointer
                            ${isSelected 
                              ? "bg-primary/10 text-primary shadow-sm" 
                              : "text-gray-600 hover:bg-gray-50 hover:text-secondary"}`}
                        >
                          <span>{cat.categoryName}</span>
                          {isSelected && <FiCheck className="text-primary" size={16} />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center space-y-3">
                      <p className="text-xs text-gray-400 font-semibold">لم نجد تخصصك في القائمة؟</p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCategoryOpen(false);
                          setIsAddingNewCategory(true);
                        }}
                        className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold rounded-xl transition-all"
                      >
                        ➕ أضف تخصصك الجديد الآن
                      </button>
                    </div>
                  )}
                </div>

                {/* Optional "Add Specialty" action at the bottom of the list when we have items */}
                {filteredCategories && filteredCategories.length > 0 && (
                  <div className="border-t border-gray-100 pt-2 mt-2 px-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCategoryOpen(false);
                        setIsAddingNewCategory(true);
                      }}
                      className="w-full p-2.5 bg-gray-50 hover:bg-primary/5 text-gray-500 hover:text-primary text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 border border-dashed border-gray-200 hover:border-primary/30 cursor-pointer"
                    >
                      <span>لم تجد تخصصك؟ أضف تخصصاً جديداً</span>
                      <span>➕</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add New Category Panel */}
          {isAddingNewCategory && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-secondary flex items-center gap-1.5">
                  <FiInfo className="text-primary animate-pulse" size={16} />
                  <span>إضافة تخصص جديد في المنصة</span>
                </h4>
                <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">
                  💡 يرجى التأكد أولاً من أن تخصصك غير متوفر في القائمة أعلاه لتجنب التكرار. 
                  إذا كنت متأكداً، اكتبه بدقة باللغة العربية (مثال: نجار موبيليا، فني تبريد وتكييف، كهربائي سيارات).
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="اكتب اسم التخصص الجديد هنا..."
                  className="flex-1 p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs font-bold text-secondary text-right dir-rtl"
                />
                <button
                  type="button"
                  disabled={isCreatingCategory}
                  onClick={handleCreateCategory}
                  className="px-5 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer"
                >
                  {isCreatingCategory ? (
                    <FiLoader className="animate-spin" size={14} />
                  ) : (
                    <span>إضافة</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNewCategory(false);
                    setNewCategoryName("");
                  }}
                  className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary">سنوات الخبرة</label>
          <input type="number" {...register("YearsOfExperience", { required: true })} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-primary" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary">الموقع</label>
          <input {...register("LocationText", { required: true })} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-primary" placeholder=" المملكة العربية السعودية - الرياض " />
        </div>
      </div>

      {/* Interactive Skills Section */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-secondary flex items-center gap-2">
          <FiCheckCircle className="text-primary" /> اختر مهاراتك المتخصصة
        </label>
        
        {isLoadingSkills ? (
          <div className="flex items-center gap-2 text-gray-400 text-xs italic">
            <FiLoader className="animate-spin" /> جاري تحميل المهارات المتاحة...
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill: { skillID: number, skillName: string }) => {
              const isSelected = selectedSkillIDs.includes(skill.skillID);
              return (
                <button
                  type="button"
                  key={skill.skillID}
                  onClick={() => toggleSkill(skill.skillID)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all border
                    ${isSelected 
                      ? "bg-primary text-secondary border-primary shadow-md scale-105" 
                      : "bg-white text-gray-400 border-gray-100 hover:border-primary/50"}`}
                >
                  {skill.skillName}
                  {isSelected && <FiCheck className="inline-block mr-1" />}
                </button>
              );
            })}
          </div>
        )}
        <p className="text-[10px] text-gray-400 italic font-medium">يمكنك اختيار أكثر من مهارة من القائمة أعلاه وسيتم حفظها في ملفك.</p>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="relative group">
          <input type="file" {...register("ProfileImageURL")} className="hidden" id="p-img" accept="image/*" />
          <label htmlFor="p-img" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-[10px] font-bold text-gray-400">
            <FiCamera size={22} className="mb-1 group-hover:text-primary" /> شخصية
            {watch("ProfileImageURL")?.[0] && <FiCheck className="text-green-500 mt-1" />}
          </label>
        </div>
        <div className="relative group">
          <input
            type="file"
            className="hidden"
            id="b-img"
            accept="image/*"
            {...register("BannerImageURL")}
            ref={(e) => {
              register("BannerImageURL").ref(e);
              widthRef.current = e;
            }}
          />
          <label htmlFor="b-img" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-[10px] font-bold text-gray-400">
            <FiImage size={22} className="mb-1 group-hover:text-primary" /> غلاف
            {watch("BannerImageURL")?.[0] && <FiCheck className="text-green-500 mt-1" />}
          </label>
        </div>
        <div className="relative group">
          <input type="file" {...register("IntroVideoURL")} className="hidden" id="v-vid" accept="video/*" />
          <label htmlFor="v-vid" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-[10px] font-bold text-gray-400">
            <FiVideo size={22} className="mb-1 group-hover:text-primary" /> فيديو
            {watch("IntroVideoURL")?.[0] && <FiCheck className="text-green-500 mt-1" />}
          </label>
        </div>
      </div>

      {/* Multiple Work Images */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-secondary">صور معرض الأعمال (نماذج من شغلك)</label>
        <input type="file" {...register("WorkImages")} className="hidden" id="w-imgs" multiple accept="image/*" />
        <label htmlFor="w-imgs" className="flex items-center justify-center p-6 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-xs font-bold text-gray-400">
          <FiUpload size={24} className="ml-2" /> اضغط لاختيار عدة صور
          {watch("WorkImages")?.length > 0 && <span className="text-green-600 mr-2 font-black">({watch("WorkImages").length} صور مختارة)</span>}
        </label>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <span className="text-sm font-bold text-secondary">هل أنت متاح للعمل واستقبال الطلبات الآن؟</span>
        <input type="checkbox" {...register("IsAvailable")} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" defaultChecked />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-5 bg-primary text-secondary font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 text-lg"
      >
        {isSubmitting ? "جاري حفظ بياناتك..." : "حفظ بيانات الملف الشخصي"}
      </button>
    </form>
  );
};

export default CreatePortfolioForm;
