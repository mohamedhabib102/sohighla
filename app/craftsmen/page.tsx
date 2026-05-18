import React from "react";
import Header from "@/components/layout/Header";
import CraftsmenListClient from "@/components/features/craftsman/CraftsmenListClient";
import { getAllCraftsmen } from "@/services/craftsman/craftsmane.service";
import { axiosInstance } from "@/lib/axiosInstance";

// Dynamic metadata configuration for outstanding index list SEO
export const metadata = {
  title: "دليل الحرفيين والمبدعين - منصة صهايلا",
  description: "ابحث وتصفح قائمة الحرفيين والمبدعين المعتمدين في منصة صهايلا لتقديم أفضل خدمات الجبس والديكور والصيانة المنزلية في جدة ومكة وكافة مدن المملكة.",
  openGraph: {
    title: "دليل الحرفيين والمبدعين - منصة صهايلا",
    description: "ابحث وتصفح قائمة الحرفيين والمبدعين المعتمدين في منصة صهايلا.",
    images: [
      {
        url: "/imgs/logo-new.png",
        width: 1200,
        height: 630,
        alt: "صهايلا | منصة الحرفيين والمبدعين",
      }
    ]
  }
};

// Directly fetch categories on the server side
const getServerCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/GetCategories`, {
      next: { revalidate: 60 } // Cache and revalidate every 60 seconds
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Failed to load categories on server side:", error);
    return [];
  }
};

const AllCraftsmenServerPage = async () => {
  // Concurrent fetching on the server side
  const [initialCraftsmen, initialCategories] = await Promise.all([
    getAllCraftsmen().catch((err) => {
      console.error("Failed to load craftsmen on server side:", err);
      return [];
    }),
    getServerCategories()
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Header />

      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <CraftsmenListClient />
      </main>
    </div>
  );
};

export default AllCraftsmenServerPage;
