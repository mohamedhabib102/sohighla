import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import CustomContainer from "@/components/ui/CustomContainer";
import { HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineExclamationTriangle } from "react-icons/hi2";

export const metadata: Metadata = {
  metadataBase: new URL("https://sohighla.vercel.app"),
  title: "كيف تعمل المنصة | شُغلَة - منصة الحرفيين",
  description: "اكتشف كيف تعمل منصة شُغلَة في ربط الحرفيين والصنايعية بالعملاء. خمس خطوات سهلة للعثور على أفضل الحرفيين والخدمات الموثوقة.",
  keywords: ["منصة حرفيين", "كيفية استخدام شُغلَة", "البحث عن حرفيين", "خدمات صيانة", "حرفيين أونلاين"],
  openGraph: {
    title: "كيف تعمل منصة شُغلَة | ربط الحرفيين بالعملاء",
    description: "تعرف على خطوات استخدام منصة شُغلَة للعثور على أفضل الحرفيين والصنايعية في منطقتك.",
    url: "https://sohighla.vercel.app/how-it-works",
    type: "website",
    locale: "ar_EG",
    siteName: "منصة شُغلَة",
    images: [
      {
        url: "/imgs/logo_jpg.jpg",
        width: 1200,
        height: 1200,
        alt: "شُغلَة - منصة الحرفيين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كيف تعمل منصة شُغلَة",
    description: "اكتشف كيفية استخدام منصة شُغلَة للعثور على حرفيين موثوقين.",
    images: ["/imgs/logo_jpg.jpg"],
  },
};

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "كيفية استخدام منصة شُغلَة",
  description: "خطوات سهلة للعثور على أفضل الحرفيين والصنايعية عبر منصة شُغلَة",
  image: "/imgs/logo_jpg.jpg",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "إنشاء حساب",
      description: "قم بالتسجيل أو تسجيل الدخول إلى حسابك على منصة شُغلَة",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "البحث عن التخصص",
      description: "ابحث عن نوع الخدمة أو التخصص الذي تحتاجه (نجار، دهان، سباك، كهربائي، إلخ)",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "تصفح الملفات الشخصية",
      description: "اطلع على ملفات الحرفيين، مهاراتهم، تقييماتهم، وأعمالهم السابقة",
    },
    {
      "@type": "HowToStep",
      position: "4",
      name: "اختر الحرفي الأنسب",
      description: "اختر الحرفي الذي يناسب احتياجاتك ومستوى التقييمات الذي تريده",
    },
    {
      "@type": "HowToStep",
      position: "5",
      name: "تواصل مباشر",
      description: "تواصل مع الحرفي مباشرة لمناقشة التفاصيل والاتفاق على الشروط",
    },
  ],
};

export default function HowItWorks() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] relative py-12 lg:py-20 flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/90">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <CustomContainer>
          <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 text-center py-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-black leading-[1.2] tracking-tight drop-shadow-2xl">
                كيف تعمل <span className="text-primary">شُغلَة</span>؟
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-lg max-w-2xl mx-auto">
                خمس خطوات سهلة للعثور على أفضل الحرفيين وأكثرهم موثوقية
              </p>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 md:py-24 bg-white">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
              البدء السريع
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3 mb-12">
              {[
                { num: 1, title: "التسجيل", desc: "أنشئ حسابك" },
                { num: 2, title: "البحث", desc: "اختر التخصص" },
                { num: 3, title: "التصفح", desc: "شاهد الملفات" },
                { num: 4, title: "الاختيار", desc: "اختر الأفضل" },
                { num: 5, title: "التواصل", desc: "تحدث مباشرة" },
              ].map((step, index) => (
                <div key={step.num} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-linear-main text-white font-bold text-2xl flex items-center justify-center mb-3 shadow-lg hover:shadow-xl transition-shadow">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-secondary text-center">{step.title}</h3>
                  <p className="text-xs text-gray-500 text-center mt-1">{step.desc}</p>
                  {index < 4 && (
                    <div className="hidden md:block absolute ml-20 text-primary text-2xl">→</div>
                  )}
                </div>
              ))}
            </div>

            {/* Detailed Steps */}
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "قم بالتسجيل أو تسجيل الدخول",
                  description: "ابدأ بإنشاء حساب مجاني على منصة شُغلَة. يمكنك التسجيل باستخدام بريدك الإلكتروني أو حسابك على Google أو Facebook.",
                  icon: HiOutlineCheckCircle,
                },
                {
                  step: 2,
                  title: "ابحث عن التخصص الذي تحتاجه",
                  description: "استخدم شريط البحث للعثور على نوع الخدمة التي تحتاجها. سواء كنت تبحث عن نجار، دهان، سباك، كهربائي، أو أي تخصص آخر.",
                  icon: HiOutlineSparkles,
                },
                {
                  step: 3,
                  title: "تصفح ملفات الحرفيين",
                  description: "اطلع على ملفات الحرفيين المتاحين في منطقتك. شاهد خبرتهم، تقييماتهم من عملاء سابقين، وأعمالهم السابقة بالفيديو والصور.",
                  icon: HiOutlineShieldCheck,
                },
                {
                  step: 4,
                  title: "اختر الحرفي الأنسب",
                  description: "اختر الحرفي الذي يتمتع بأفضل التقييمات والخبرة والأعمال التي تناسب احتياجاتك. ادرس التفاصيل والتقييمات بعناية.",
                  icon: HiOutlineCheckCircle,
                },
                {
                  step: 5,
                  title: "تواصل مع الحرفي مباشرة",
                  description: "تواصل مع الحرفي مباشرة من خلال المنصة. ناقش التفاصيل والسعر والجدول الزمني واتفق على الشروط قبل البدء.",
                  icon: HiOutlineSparkles,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="flex gap-6 items-start p-6 rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-full bg-linear-main text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <Icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-2">
                        الخطوة {item.step}: {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Platform Benefits */}
      <section className="py-16 md:py-24 bg-gray-50">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
              فوائد منصة <span className="text-primary">شُغلَة</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "تقييمات حقيقية وموثوقة",
                  description: "جميع التقييمات من عملاء حقيقيين عملوا مع الحرفيين، مما يضمن اختيارك القرار الصحيح.",
                },
                {
                  title: "أعمال سابقة وفيديوهات",
                  description: "شاهد أعمال الحرفي الفعلية بالصور والفيديو لتتأكد من جودة وأسلوب عمله.",
                },
                {
                  title: "حرفيين بالقرب منك",
                  description: "اعثر على حرفيين موثوقين في منطقتك مباشرة، مما يوفر الوقت والجهد والمسافات.",
                },
                {
                  title: "تواصل مباشر وآمن",
                  description: "تواصل مع الحرفي مباشرة دون وسيط، مع ضمان سهولة التواصل والاتفاق على الشروط.",
                },
                {
                  title: "توثيق العملية",
                  description: "احتفظ بسجل كامل لجميع الحرفيين الذين عملت معهم والخدمات التي استقدمتها.",
                },
                {
                  title: "مجاني وسهل الاستخدام",
                  description: "المنصة مجانية للعملاء، واستخدامها سهل وبسيط جداً حتى للمبتدئين.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 font-bold text-lg">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Important Note */}
      <section className="py-16 md:py-24 bg-primary/5 border-t border-b border-primary/20">
        <CustomContainer>
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-6 items-start p-8 rounded-2xl bg-white border-2 border-primary/30 shadow-md">
              <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0 text-xl">
                <HiOutlineExclamationTriangle className="text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-3">ملاحظة مهمة</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  منصة <span className="font-bold text-primary">شُغلَة</span> هي منصة لتسهيل الاتصال والتواصل بين العملاء والحرفيين فقط. 
                  المنصة <strong>لا تتدخل في</strong>:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    تحديد الأسعار والرسوم
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    الاتفاقات والعقود بين الطرفين
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    تنفيذ العمل أو جودته
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    المدفوعات والتحويلات المالية
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  كل هذه المسائل تكون بين العميل والحرفي مباشرة. المنصة توفر الأدوات والمعلومات فقط لتسهيل هذا الاتصال.
                </p>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <CustomContainer>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
              الأسئلة الشائعة
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "هل المنصة مجانية؟",
                  a: "نعم، منصة شُغلَة مجانية تماماً للعملاء. لا توجد رسوم للتسجيل أو البحث عن حرفيين أو التواصل معهم.",
                },
                {
                  q: "كيف أتأكد من موثوقية الحرفي؟",
                  a: "يمكنك التحقق من التقييمات الحقيقية من العملاء السابقين، ومشاهدة أعماله السابقة بالصور والفيديو، والتحقق من خبرته وتخصصاته.",
                },
                {
                  q: "هل يمكنني التواصل مع عدة حرفيين في نفس الوقت؟",
                  a: "نعم، بالتأكيد! يمكنك التواصل مع عدة حرفيين والاستفسار عنهم قبل الاختيار النهائي.",
                },
                {
                  q: "ماذا لو لم أكن راضياً عن الخدمة؟",
                  a: "الخدمة بين العميل والحرفي مباشرة. يجب أن تناقش أي مشاكل مباشرة معه. المنصة توفر مساحة للتواصل والاتفاق، لكن المسؤولية هي بين الطرفين.",
                },
                {
                  q: "هل بياناتي آمنة على المنصة؟",
                  a: "نعم، نحن نحافظ على خصوصيتك وأمان بياناتك. لا نشارك معلوماتك الشخصية إلا مع الحرفي الذي تختار التواصل معه.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group p-6 border border-gray-200 rounded-xl hover:border-primary/50 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-bold text-secondary text-lg">
                    <span>{faq.q}</span>
                    <span className="text-2xl text-primary group-open:rotate-180 transition-transform">
                      ›
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Upcoming Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <CustomContainer>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
              ميزات قريباً 🚀
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "نظام الحجوزات والمواعيد المتقدم",
                "نظام الدفع الآمن المدمج",
                "التقييمات والشهادات التفصيلية",
                "تطبيق موبايل iOS و Android",
                "نظام الضمان والحماية للعملاء",
                "خدمة العملاء 24/7",
                "شهادات معتمدة للحرفيين",
                "تقارير وإحصائيات مفصلة",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-secondary">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  );
}
