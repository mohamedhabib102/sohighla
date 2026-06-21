"use client";

import React, { useState } from "react";
import { 
  useGetAllCategory, 
  useCreateCategory, 
  useGetAllSkills, 
  useCreateSkill 
} from "@/hooks/control/useConrtol";
import { CategoryType, SkillType } from "@/types";
import { HiOutlineFolderPlus, HiOutlineSparkles, HiOutlineBriefcase, HiOutlineCheck } from "react-icons/hi2";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ErrorComponent from "@/components/ui/ErrorComponent";

export default function AdminCategoriesSkillsPage() {
  const { data: categories, isLoading: loadingCategories, isError: errorCategories } = useGetAllCategory();
  const { data: skills, isLoading: loadingSkills, isError: errorSkills } = useGetAllSkills();

  const { mutate: addCategory, isLoading: isAddingCategory } = useCreateCategory();
  const { mutate: addSkill, isLoading: isAddingSkill } = useCreateSkill();

  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await addCategory(newCategory.trim());
      setNewCategory("");
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    try {
      await addSkill(newSkill.trim());
      setNewSkill("");
    } catch (err) {
      console.error("Failed to add skill:", err);
    }
  };

  const isLoading = loadingCategories || loadingSkills;
  const isError = errorCategories || errorSkills;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingComponent />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ErrorComponent sectionName="الأقسام والمهارات" message="عذراً، فشل تحميل البيانات." />
      </div>
    );
  }

  const categoriesList = (categories as CategoryType[]) || [];
  const skillsList = (skills as SkillType[]) || [];

  return (
    <div className="space-y-6 dir-rtl text-right" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-secondary font-lemonada">الأقسام والمهارات</h1>
        <p className="text-gray-400 text-xs md:text-sm mt-1">إدارة مجالات العمل والأقسام المهنية والمهارات الخاصة بالحرفيين بالمنصة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Categories Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <HiOutlineBriefcase className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-secondary">الأقسام المهنية</h3>
              <p className="text-[10px] md:text-xs text-gray-400">تخصصات ومجالات عمل الحرفيين بالمنصة ({categoriesList.length})</p>
            </div>
          </div>

          {/* Form Category */}
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="أدخل اسم القسم الجديد (مثلاً: سباك، دهان...)"
              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs md:text-sm text-secondary placeholder:text-gray-300 font-bold outline-none focus:border-primary/30 focus:bg-white transition-all"
              disabled={isAddingCategory}
            />
            <button
              type="submit"
              disabled={isAddingCategory || !newCategory.trim()}
              className="bg-primary hover:bg-primary/95 text-secondary text-xs font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-sm shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isAddingCategory ? (
                <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              ) : (
                <HiOutlineFolderPlus className="text-lg" />
              )}
              <span>إضافة</span>
            </button>
          </form>

          {/* Scrollable Categories List */}
          <div className="flex-1 overflow-y-auto max-h-[350px] custom-scrollbar border border-gray-50 rounded-xl divide-y divide-gray-50">
            {categoriesList.length > 0 ? (
              categoriesList.map((cat) => (
                <div key={cat.categoryID} className="flex items-center justify-between p-3 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-secondary text-xs font-bold">{cat.categoryName}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase">ID: {cat.categoryID}</span>
                </div>
              ))
            ) : (
              <p className="p-6 text-center text-xs text-gray-400 italic">لا توجد أقسام مسجلة حتى الآن.</p>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <HiOutlineSparkles className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-secondary">المهارات المتاحة</h3>
              <p className="text-[10px] md:text-xs text-gray-400">المهارات الإضافية لتوصيف دقة الحرفيين بالمنصة ({skillsList.length})</p>
            </div>
          </div>

          {/* Form Skill */}
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="أدخل المهارة الجديدة (مثلاً: تركيب خلاطات، ديكورات...)"
              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs md:text-sm text-secondary placeholder:text-gray-300 font-bold outline-none focus:border-primary/30 focus:bg-white transition-all"
              disabled={isAddingSkill}
            />
            <button
              type="submit"
              disabled={isAddingSkill || !newSkill.trim()}
              className="bg-primary hover:bg-primary/95 text-secondary text-xs font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-sm shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isAddingSkill ? (
                <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              ) : (
                <HiOutlineFolderPlus className="text-lg" />
              )}
              <span>إضافة</span>
            </button>
          </form>

          {/* Scrollable Skills List */}
          <div className="flex-1 overflow-y-auto max-h-[350px] custom-scrollbar border border-gray-50 rounded-xl divide-y divide-gray-50">
            {skillsList.length > 0 ? (
              skillsList.map((skill) => (
                <div key={skill.skillID} className="flex items-center justify-between p-3 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <HiOutlineCheck className="text-emerald-500 text-sm shrink-0" />
                    <span className="text-secondary text-xs font-bold">{skill.skillName}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase">ID: {skill.skillID}</span>
                </div>
              ))
            ) : (
              <p className="p-6 text-center text-xs text-gray-400 italic">لا توجد مهارات مسجلة حتى الآن.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
