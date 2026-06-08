import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import CustomContainer from "@/components/ui/CustomContainer";
import { HiOutlineEye, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineHeart, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { FiTarget, FiSearch, FiPhone, FiUserCheck, FiHelpCircle } from "react-icons/fi";

export const metadata: Metadata = {
  metadataBase: new URL("https://sohighla.vercel.app"),
  title: "من نحن | شُغلَة - منصة الحرفيين والصنايعية",
  description: "تعرف على منصة شُغلَة - رؤيتنا، رسالتنا، وقيمنا. نحن هنا لربط الحرفيين الموثوقين بالعملاء الذين يبحثون عن خدمات عالية الجودة.",
  keywords: ["عن شُغلَة", "منصة حرفيين عربية", "خدمات صيانة موثوقة", "رسالتنا", "رؤيتنا"],
  openGraph: {
    title: "من نحن - منصة شُغلَة",
    description: "تعرف على قصة منصة شُغلَة وكيف نساعد الحرفيين والعملاء على الالتقاء بسهولة وثقة.",
    url: "https://sohighla.vercel.app/about-us",
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
    title: "من نحن - منصة شُغلَة",
    description: "اكتشف قصة منصة شُغلَة وفريقنا المتفاني في خدمة الحرفيين والعملاء.",
    images: ["/imgs/logo_jpg.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "منصة شُغلَة",
  url: "https://sohighla.vercel.app",
  logo: "/imgs/logo_jpg.jpg",
  description: "منصة عربية تربط الحرفيين والصنايعية بالعملاء الذين يبحثون عن خدمات موثوقة وذات جودة عالية",
  sameAs: [
    "https://facebook.com/sohighla",
    "https://twitter.com/sohighla",
    "https://instagram.com/sohighla",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["ar", "en"],
  },
};

export default function AboutUs() {
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
                من نحن؟
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-lg max-w-2xl mx-auto">
                منصة عربية مبتكرة تربط الحرفيين الموثوقين بالعملاء الباحثين عن خدمات عالية الجودة
              </p>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* How We Help You - Card */}
      <section className="py-16 md:py-24 bg-white">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-10 rounded-2xl bg-linear-to-br from-primary/5 to-transparent border-2 border-primary/20 shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-linear-main flex items-center justify-center text-white mb-6 shadow-lg">
                <FiHelpCircle className="text-3xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                كيف نساعدك؟
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                منصة <span className="font-bold text-primary">شُغلَة</span> تسهل عليك العثور على الحرفي المناسب 
                لاحتياجاتك. نقدم لك المعلومات اللازمة لاتخاذ القرار الصحيح.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "ابحث عن التخصص", desc: "تصفح الحرفيين حسب التخصص الذي تحتاجه بسهولة", icon: FiSearch },
                  { title: "شاهد الأعمال", desc: "اطلع على صور وفيديوهات الأعمال السابقة لكل حرفي", icon: HiOutlineEye },
                  { title: "قيم وتقييمات", desc: "اقرأ تقييمات حقيقية من عملاء سابقين", icon: HiOutlineSparkles },
                  { title: "تواصل مباشر", desc: "اتصل بالحرفي مباشرة عبر رقم الهاتف", icon: FiPhone },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                      <div className="w-12 h-12 rounded-lg bg-linear-main text-white flex items-center justify-center shrink-0">
                        <Icon className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Our Vision - Card */}
      <section className="py-16 md:py-24 bg-gray-50">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-10 rounded-2xl bg-white border-2 border-primary/30 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-linear-main flex items-center justify-center text-white mb-6 shadow-lg">
                <HiOutlineEye className="text-3xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                رؤيتنا
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                أن نصبح المنصة الرائدة والموثوقة في العالم العربي لربط الحرفيين المهرة بالعملاء، 
                مما يسهم في تطور الحرف التقليدية والخدمات وتمكين الحرفيين اقتصادياً.
              </p>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Our Mission - Card */}
      <section className="py-16 md:py-24 bg-white">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-10 rounded-2xl bg-white border-2 border-primary/30 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-linear-main flex items-center justify-center text-white mb-6 shadow-lg">
                <FiTarget className="text-3xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                رسالتنا
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ربط الحرفيين الموثوقين بالعملاء الذين يبحثون عن خدمات عالية الجودة، من خلال منصة آمنة وسهلة الاستخدام 
                تتيح التواصل المباشر والشفاف والثقة بين الطرفين.
              </p>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* How the Platform Works - Marketplace Explanation */}
      <section className="py-16 md:py-24 bg-gray-50">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-10 rounded-2xl bg-white border-2 border-primary/30 shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-linear-main flex items-center justify-center text-white mb-6 shadow-lg">
                <FiUserCheck className="text-3xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                كيف تعمل المنصة؟
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                منصة <span className="font-bold text-primary">شُغلَة</span> هي <strong>سوق إلكتروني</strong> 
                لعرض الحرفيين والخدمات. نحن لا نقدم خدمات الصيانة بأنفسنا، بل نوفر لك منصة سهلة 
                للعثور على الحرفي المناسب.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 font-bold text-lg">1</div>
                  <div>
                    <h4 className="font-bold text-secondary">تصفح الحرفيين</h4>
                    <p className="text-gray-600 text-sm">ابحث عن الحرفي المناسب من خلال التصنيفات والتقييمات والأعمال السابقة.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 font-bold text-lg">2</div>
                  <div>
                    <h4 className="font-bold text-secondary">اختر الحرفي</h4>
                    <p className="text-gray-600 text-sm">اطلع على ملف الحرفي، تقييماته، وأعماله السابقة واختر الأنسب لك.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-lg">3</div>
                  <div>
                    <h4 className="font-bold text-secondary">تواصل مباشر</h4>
                    <p className="text-gray-600 text-sm">اتصل بالحرفي مباشرة عبر رقم الهاتف الموجود في ملفه الشخصي للاتفاق على التفاصيل.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <HiOutlineExclamationTriangle className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-2">تنبيه مهم: دور المنصة</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                        <span>المنصة هي <strong>سوق لعرض الخدمات فقط</strong>. دورنا ينتهي بعرض الحرفي وخدماته.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                        <span><strong>لا يوجد</strong> نظام محادثة أو دردشة داخل المنصة.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                        <span><strong>لا نتدخل</strong> في المحادثات أو المفاوضات بين الطرفين.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                        <span><strong>لا نوسط</strong> في الاتصال - يتم التواصل مباشرة بين العميل والحرفي.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                        <span>بعد اختيار الحرفي، يتم الاتصال به <strong>عبر رقم الهاتف</strong> أو أي وسيلة خارجية أخرى.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
              لماذا تختار <span className="text-primary">شُغلَة</span>؟
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "تقييمات حقيقية وموثوقة",
                  description: "جميع التقييمات من عملاء حقيقيين، مما يضمن صحتها وموثوقيتها.",
                  icon: HiOutlineShieldCheck,
                },
                {
                  title: "حرفيين مختارون بعناية",
                  description: "نختار الحرفيين بناءً على خبرتهم وسمعتهم وجودة عملهم.",
                  icon: HiOutlineSparkles,
                },
                {
                  title: "سهلة وآمنة",
                  description: "واجهة سهلة الاستخدام وإجراءات أمان عالية لحماية بيانات المستخدمين.",
                  icon: HiOutlineShieldCheck,
                },
                {
                  title: "مجانية تماماً للعملاء",
                  description: "لا توجد رسوم أو تكاليف خفية. الخدمة مجانية بالكامل للعملاء.",
                  icon: HiOutlineHeart,
                },
                {
                  title: "أعمال حقيقية وفيديوهات",
                  description: "شاهد أعمال الحرفي الفعلية بالصور والفيديو قبل اختياره.",
                  icon: HiOutlineSparkles,
                },
                {
                  title: "تواصل مباشر وفعال",
                  description: "تواصل مباشر مع الحرفي بدون وسيط، مما يسهل الاتفاق والتنسيق.",
                  icon: HiOutlineHeart,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-primary/50 hover:shadow-lg hover:bg-white transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-linear-main text-white flex items-center justify-center mb-4">
                      <Icon className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-linear-to-br from-primary/5 to-transparent">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
              قيمنا الأساسية
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "الثقة والشفافية", description: "نؤمن بأهمية الثقة والشفافية الكاملة في جميع التعاملات. نعطي جميع المعلومات الحقيقية والصادقة.", value: "1" },
                { title: "الجودة والاحترافية", description: "نركز على الجودة في كل جوانب خدمتنا، من تجربة المستخدم إلى اختيار الحرفيين.", value: "2" },
                { title: "تمكين الحرفيين", description: "نؤمن بأهمية تمكين الحرفيين وإعطاؤهم فرصة للنمو والازدهار اقتصادياً.", value: "3" },
                { title: "رضا العملاء", description: "رضا العملاء هو أولويتنا الأولى. نعمل بجد لتقديم أفضل خدمة ممكنة.", value: "4" },
                { title: "الابتكار والتطور", description: "نستمر في الابتكار والتطور لتقديم ميزات جديدة ومحسّنة بناءً على احتياجاتكم.", value: "5" },
                { title: "المسؤولية الاجتماعية", description: "نشعر بمسؤوليتنا تجاه المجتمع وندعم الحرف التقليدية والاقتصاد المحلي.", value: "6" },
              ].map((value, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white border-2 border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-linear-main text-white font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      {value.value}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-2">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* How We Help - Two Columns */}
      <section className="py-16 md:py-24 bg-white">
        <CustomContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
              خدمات المنصة
            </h2>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/20">
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-linear-main text-white flex items-center justify-center font-bold text-lg">1</span>
                  للعملاء
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>البحث السهل والسريع عن الحرفيين المتخصصين في منطقتك</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>مشاهدة تقييمات حقيقية وأعمال سابقة للحرفيين</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>التواصل المباشر مع الحرفيين بدون وسيط</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>الاتفاق المباشر على السعر والجدول الزمني</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>عدم وجود رسوم أو تكاليف إضافية - الخدمة مجانية تماماً</span></li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent border-2 border-secondary/20">
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-linear-main text-white flex items-center justify-center font-bold text-lg">2</span>
                  للحرفيين
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>عرض أعمالك وخبرتك أمام آلاف العملاء المحتملين</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>بناء سمعة قوية من خلال التقييمات الحقيقية من العملاء</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>الوصول إلى عملاء جدد بشكل منتظم وسهل</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>عدم الاعتماد على الوسطاء أو الوكلاء</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold text-xl mt-1">✓</span><span>زيادة الدخل والعمل المستمر من خلال عملاء دائمين</span></li>
                </ul>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80">
        <CustomContainer>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              انضم إلينا اليوم
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              كن جزءاً من منصة شُغلَة وابدأ رحلتك. سواء كنت تبحث عن حرفي ماهر أو حرفي يبحث عن عملاء جدد، 
              فنحن هنا لمساعدتك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/sign-up" className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-shadow">
                ابدأ الآن
              </a>
              <a href="/craftsmen" className="px-8 py-3 bg-white/20 text-white font-bold rounded-lg border border-white hover:bg-white/30 transition-colors">
                تصفح الحرفيين
              </a>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <CustomContainer>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-secondary mb-6">هل لديك أسئلة؟</h3>
            <p className="text-gray-600 mb-4">تواصل معنا مباشرة لأي استفسارات أو اقتراحات</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-600">
              <a href="mailto:support@sohighla.com" className="hover:text-primary transition-colors">support@sohighla.com</a>
              <span className="hidden sm:inline">•</span>
              <p>متاح قريباً</p>
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  );
}
