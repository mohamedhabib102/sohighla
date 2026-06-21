import React, { Suspense } from "react";
import CraftsmenListClient from "@/components/features/craftsman/CraftsmenListClient";
import { getAllCraftsmen } from "@/services/craftsman/craftsmane.service";

export const metadata = {
  title: "دليل الحرفيين والمبدعين - منصة صهايلا",
  description: "ابحث وتصفح قائمة الحرفيين والمبدعين المعتمدين في منصة صهايلا لتقديم أفضل خدمات الجبس والديكور والصيانة المنزلية في جدة ومكة وكافة مدن المملكة.",
  openGraph: {
    title: "دليل الحرفيين والمبدعين - منصة صهايلا",
    description: "ابحث وتصفح قائمة الحرفيين والمبدعين المعتمدين في منصة صهايلا.",
    images: [{ url: "/imgs/logo-new.png", width: 1200, height: 630, alt: "صهايلا | منصة الحرفيين والمبدعين" }]
  }
};

const getServerCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/GetCategories`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
};

const AllCraftsmenServerPage = async () => {
  await Promise.all([
    getAllCraftsmen().catch(() => []),
    getServerCategories()
  ]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <Suspense fallback={
          <div className="flex items-center justify-center py-24 text-gray-400 gap-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold">جاري التحميل...</span>
          </div>
        }>
          <CraftsmenListClient />
        </Suspense>
      </main>
    </div>
  );
};

export default AllCraftsmenServerPage;
