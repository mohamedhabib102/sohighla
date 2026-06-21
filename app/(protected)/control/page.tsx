"use client";

import React from "react";
import { useGetAllPersons, useGetAllCategory, useGetAllSkills } from "@/hooks/control/useConrtol";
import { 
  HiOutlineUsers, 
  HiOutlineBriefcase, 
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineFolderOpen 
} from "react-icons/hi2";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ErrorComponent from "@/components/ui/ErrorComponent";

export default function AdminDashboardPage() {
  const { data: persons, isLoading: loadingPersons, isError: errorPersons } = useGetAllPersons();
  const { data: categories, isLoading: loadingCategories, isError: errorCategories } = useGetAllCategory();
  const { data: skills, isLoading: loadingSkills, isError: errorSkills } = useGetAllSkills();

  const isLoading = loadingPersons || loadingCategories || loadingSkills;
  const isError = errorPersons || errorCategories || errorSkills;

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
        <ErrorComponent sectionName="لوحة التحكم" message="عذراً، فشل تحميل الإحصائيات الحالية." />
      </div>
    );
  }

  // Statistics calculation
  const totalUsers = persons?.length || 0;
  
  // Normalized roles check
  const totalCraftsmen = persons?.filter(
    (p) => p.role?.toLowerCase() === "craftsman"
  ).length || 0;

  const totalCustomers = persons?.filter(
    (p) => p.role?.toLowerCase() === "customer" || p.role?.toLowerCase() === "client"
  ).length || 0;

  const totalAdmins = persons?.filter(
    (p) => p.role?.toLowerCase() === "admin"
  ).length || 0;

  const totalCategories = categories?.length || 0;
  const totalSkills = skills?.length || 0;

  // Percentages for visualization
  const craftsmenPercentage = totalUsers > 0 ? Math.round((totalCraftsmen / totalUsers) * 100) : 0;
  const customersPercentage = totalUsers > 0 ? Math.round((totalCustomers / totalUsers) * 100) : 0;
  const adminsPercentage = totalUsers > 0 ? Math.round((totalAdmins / totalUsers) * 100) : 0;

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: totalUsers,
      icon: HiOutlineUsers,
      color: "from-blue-500 to-indigo-600",
      description: "المسجلين بالمنصة"
    },
    {
      title: "عدد الحرفيين",
      value: totalCraftsmen,
      icon: HiOutlineBriefcase,
      color: "from-orange-500 to-amber-600",
      description: "صنايعية وفنيين"
    },
    {
      title: "عدد العملاء",
      value: totalCustomers,
      icon: HiOutlineUserGroup,
      color: "from-emerald-500 to-teal-600",
      description: "طالبي الخدمات"
    },
    {
      title: "عدد الأقسام",
      value: totalCategories,
      icon: HiOutlineFolderOpen,
      color: "from-purple-500 to-pink-600",
      description: "المجالات المهنية"
    },
    {
      title: "عدد المهارات",
      value: totalSkills,
      icon: HiOutlineSparkles,
      color: "from-rose-500 to-red-600",
      description: "مهارات الحرفيين"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 dir-rtl text-right" dir="rtl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-secondary font-lemonada">لوحة إحصائيات النظام</h1>
        <p className="text-gray-400 text-xs md:text-sm mt-1">مرحباً بك في لوحة الإشراف وإدارة منصة شُغلَة.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[10px] md:text-xs font-bold">{stat.title}</span>
              <div className={`p-2 rounded-xl bg-gradient-to-tr ${stat.color} text-white`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-secondary">{stat.value}</h3>
              <p className="text-gray-400 text-[9px] font-bold uppercase mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ratios & Visuals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ratio Chart Container */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-sm font-bold text-secondary border-r-2 border-primary pr-3">توزيع أدوار المستخدمين</h3>
          
          <div className="space-y-6">
            {/* Craftsmen ratio */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-orange-500">حرفي / فني ({totalCraftsmen})</span>
                <span className="text-secondary">{craftsmenPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${craftsmenPercentage}%` }}
                />
              </div>
            </div>

            {/* Customers ratio */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-emerald-500">عميل ({totalCustomers})</span>
                <span className="text-secondary">{customersPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${customersPercentage}%` }}
                />
              </div>
            </div>

            {/* Admin ratio */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-indigo-500">مشرف / مدير ({totalAdmins})</span>
                <span className="text-secondary">{adminsPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${adminsPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Sidebar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-secondary border-r-2 border-primary pr-3 mb-4">نشاطات الإشراف</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              بصفتك مشرفاً على النظام، يمكنك تغيير أدوار المستخدمين، وإضافة وحذف الأقسام الفنية والمهارات لمساعدة الحرفيين في توثيق أعمالهم.
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-50 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs text-gray-500">تعديل أدوار المستخدمين في صفحة المستخدمين</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs text-gray-500">إضافة أقسام جديدة كـ (سباك، نجار..)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs text-gray-500">تحديث مهارات الحرفيين لدعم محركات البحث</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
