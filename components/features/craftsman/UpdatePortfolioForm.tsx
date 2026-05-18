"use client";
import { useState } from "react";
import { useUpdateCraftsman } from "@/hooks/craftsman/useCraftsman";
import { FiInfo, FiCamera, FiVideo, FiImage, FiCheck } from "react-icons/fi";
import { PortfolioType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/query-keys";

interface UpdatePortfolioFormProps {
  initialData: PortfolioType;
  onSuccess: () => void;
}

const UpdatePortfolioForm = ({ initialData, onSuccess }: UpdatePortfolioFormProps) => {
  const { mutate, isLoading: isSubmitting } = useUpdateCraftsman();
  const queryClient = useQueryClient();

  // Use simple useState instead of useForm
  const [formState, setFormState] = useState({
    ShortDescription: initialData.shortDescription || "",
    AboutDescription: initialData.aboutDescription || "",
    YearsOfExperience: initialData.yearsOfExperience || 0,
    LocationText: initialData.locationText || "",
    IsAvailable: initialData.isAvailable || false,
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    ProfileImageURL: null,
    BannerImageURL: null,
    IntroVideoURL: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormState(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.files?.[0]) {
      setFiles(prev => ({ ...prev, [name]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("ShortDescription", formState.ShortDescription);
    formData.append("AboutDescription", formState.AboutDescription);
    formData.append("YearsOfExperience", formState.YearsOfExperience.toString());
    formData.append("LocationText", formState.LocationText);
    formData.append("IsAvailable", formState.IsAvailable.toString());

    if (files.ProfileImageURL) formData.append("ProfileImageURL", files.ProfileImageURL);
    if (files.BannerImageURL) formData.append("BannerImageURL", files.BannerImageURL);
    if (files.IntroVideoURL) formData.append("IntroVideoURL", files.IntroVideoURL);

    try {
      await mutate(formData);
      queryClient.invalidateQueries({
        queryKey: QueryKeys.getCraftsmanById(initialData?.personID)
      })
      onSuccess();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-right" dir="rtl">
      <div className="space-y-2">
        <label className="text-sm font-bold text-secondary flex items-center gap-2">
            <FiInfo className="text-primary" /> وصف قصير (يظهر تحت اسمك)
        </label>
        <input
          name="ShortDescription"
          value={formState.ShortDescription}
          onChange={handleChange}
          required
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-secondary">عن الحرفي (نبذة مفصلة)</label>
        <textarea
          name="AboutDescription"
          value={formState.AboutDescription}
          onChange={handleChange}
          required
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all h-24"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary">سنوات الخبرة</label>
          <input 
            type="number" 
            name="YearsOfExperience"
            value={formState.YearsOfExperience}
            onChange={handleChange}
            required 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-primary" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary">الموقع</label>
          <input 
            name="LocationText"
            value={formState.LocationText}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-primary" 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="relative group">
          <input type="file" onChange={(e) => handleFileChange(e, "ProfileImageURL")} className="hidden" id="up-p-img" accept="image/*" />
          <label htmlFor="up-p-img" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-[10px] font-bold text-gray-400">
            <FiCamera size={22} className="mb-1" /> شخصية
            {files.ProfileImageURL && <FiCheck className="text-green-500 mt-1" />}
          </label>
        </div>
        <div className="relative group">
          <input type="file" onChange={(e) => handleFileChange(e, "BannerImageURL")} className="hidden" id="up-b-img" accept="image/*" />
          <label htmlFor="up-b-img" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-[10px] font-bold text-gray-400">
            <FiImage size={22} className="mb-1" /> غلاف
            {files.BannerImageURL && <FiCheck className="text-green-500 mt-1" />}
          </label>
        </div>
        <div className="relative group">
          <input type="file" onChange={(e) => handleFileChange(e, "IntroVideoURL")} className="hidden" id="up-v-vid" accept="video/*" />
          <label htmlFor="up-v-vid" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-[10px] font-bold text-gray-400">
            <FiVideo size={22} className="mb-1" /> فيديو
            {files.IntroVideoURL && <FiCheck className="text-green-500 mt-1" />}
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <span className="text-sm font-bold text-secondary">هل أنت متاح للعمل حالياً؟</span>
        <input 
          type="checkbox" 
          name="IsAvailable"
          checked={formState.IsAvailable}
          onChange={handleChange}
          className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-5 bg-primary text-secondary font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 text-lg"
      >
        {isSubmitting ? "جاري تحديث بياناتك..." : "حفظ التعديلات"}
      </button>
    </form>
  );
};

export default UpdatePortfolioForm;
