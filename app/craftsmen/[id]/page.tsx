import React from "react";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import CraftsmanDetailClient from "@/components/features/craftsman/CraftsmanDetailClient";
import { getCraftsmanById } from "@/services/craftsman/craftsmane.service";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

// Generate dynamic premium SEO metadata on the server side
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Resolve params if it's a promise (standard in modern Next.js versions)
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  
  try {
    const craftsman = await getCraftsmanById(id);
    if (!craftsman) {
      return {
        title: "الحرفي غير موجود - منصة صهايلا",
        description: "عذراً، لم يتم العثور على ملف الحرفي المطلوب في منصة صهايلا.",
      };
    }

    const fullName = `${craftsman.firstName} ${craftsman.lastName}`;
    const craft = craftsman.categoryName || "حرفي مميز";
    const experienceText = craftsman.yearsOfExperience ? `خبرة ${craftsman.yearsOfExperience} سنوات` : "خبرة مهنية عالية";
    const titleStr = `${fullName} | ${craft} - ${experienceText} | منصة صهايلا`;
    const descStr = `${fullName} هو حرفي متخصص ومحترف في مجال ${craft} في منصة صهايلا. ${experienceText}. تصفح صور سابقة أعماله، تقييمات العملاء الحقيقية، وشاهد الفيديو التعريفي الخاص به وتواصل معه مباشرة.`;
    
    // Dynamic profile image for outstanding OpenGraph/Social media sharing
    const ogImage = craftsman.profileImageURL || "https://sohighla.com/imgs/logo-new.png";

    return {
      title: titleStr,
      description: descStr,
      openGraph: {
        title: titleStr,
        description: descStr,
        type: "profile",
        images: [
          {
            url: ogImage,
            width: 800,
            height: 800,
            alt: `${fullName} - ${craft}`,
          }
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: titleStr,
        description: descStr,
        images: [ogImage],
      }
    };
  } catch (error) {
    console.error("Failed to generate metadata on server side:", error);
    return {
      title: "صهايلا | منصة الحرفيين والمبدعين",
      description: "المنصة الأولى لربط الحرفيين والمبدعين بالعملاء.",
    };
  }
}

const CraftsmanServerDetailPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  // Fetch craftsman data on the server side (SSR)
  const initialCraftsman = await getCraftsmanById(id).catch((err) => {
    console.error("Failed to fetch craftsman on server side:", err);
    return null;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Header />

      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <CraftsmanDetailClient 
          craftsmanId={id} 
        />
      </main>
    </div>
  );
};

export default CraftsmanServerDetailPage;
