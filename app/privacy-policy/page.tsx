import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import CustomContainer from "@/components/ui/CustomContainer";
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineEye, HiOutlineDocumentText } from "react-icons/hi2";

export const metadata: Metadata = {
  metadataBase: new URL("https://sohighla.vercel.app"),
  title: "سياسة الخصوصية | شُغلَة - منصة الحرفيين",
  description: "سياسة الخصوصية لمنصة شُغلَة - نوضح كيف نجمع، نستخدم، ونحمي معلوماتك الشخصية عند استخدامك للمنصة.",
  openGraph: {
    title: "سياسة الخصوصية - منصة شُغلَة",
    description: "تعرف على كيفية تعامل منصة شُغلَة مع معلوماتك الشخصية وخصوصيتك.",
    url: "https://sohighla.vercel.app/privacy-policy",
    type: "website",
    locale: "ar_EG",
    siteName: "منصة شُغلَة",
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="min-h-[50vh] relative py-12 lg:py-20 flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/90">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <CustomContainer>
          <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 text-center py-10">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
              <HiOutlineShieldCheck className="text-5xl text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-black leading-[1.2] tracking-tight drop-shadow-2xl">
                سياسة الخصوصية
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-lg max-w-2xl mx-auto">
                كيف نحمي معلوماتك ونتعامل معها على منصة شُغلَة
              </p>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <CustomContainer>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-500 text-sm mb-8">آخر تحديث: 2026</p>

            <div className="space-y-10">
              {/* Introduction */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  في منصة <span className="font-bold text-primary">شُغلَة</span>، خصوصيتك وأمان معلوماتك 
                  هما أولويتنا القصوى. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية 
                  عند استخدامك للمنصة. باستخدامك للمنصة، فإنك توافق على الممارسات الموضحة في هذه السياسة.
                </p>
              </div>

              {/* 1 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineDocumentText className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">المعلومات التي نجمعها</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">عند استخدامك لمنصة شُغلَة، قد نجمع المعلومات التالية:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span><strong>معلومات الحساب:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، وكلمة المرور المشفرة عند إنشاء حساب.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span><strong>معلومات الملف الشخصي:</strong> الصور الشخصية، الوصف، الخبرات، المهارات، الموقع الجغرافي، وأعمالك السابقة (للحرفيين).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span><strong>معلومات الاستخدام:</strong> كيفية تفاعلك مع المنصة، الصفحات التي تزورها، والخدمات التي تبحث عنها.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span><strong>معلومات التقنية:</strong> عنوان IP، نوع المتصفح، نظام التشغيل، ومعلومات الجهاز المستخدم للوصول إلى المنصة.</span>
                  </li>
                </ul>
              </div>

              {/* 2 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineEye className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">كيف نستخدم معلوماتك</h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>تقديم وتحسين خدمات المنصة لك.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>تمكين التواصل بين العملاء والحرفيين بشكل فعال.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>إرسال إشعارات مهمة تتعلق بحسابك أو خدمات المنصة.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>تحليل استخدام المنصة لتحسين تجربة المستخدم وتطوير الميزات.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>حماية المنصة والمستخدمين من الاحتيال والاستخدام غير القانوني.</span></li>
                </ul>
              </div>

              {/* 3 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineLockClosed className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">حماية معلوماتك</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  نستخدم إجراءات أمان تقنية وإدارية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به، 
                  التعديل، الإفشاء، أو الإتلاف. تشمل هذه الإجراءات التشفير، جدران الحماية، 
                  وأنظمة التحكم في الوصول. مع ذلك، لا يمكن ضمان أمان مطلق لأي معلومات تُنقل عبر الإنترنت.
                </p>
              </div>

              {/* 4 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">مشاركة المعلومات</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك في الحالات التالية:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span><strong>بين المستخدمين:</strong> المعلومات الأساسية في الملف الشخصي (الاسم، المهارات، التقييمات) تكون مرئية للمستخدمين الآخرين لتسهيل عملية الاختيار والتواصل.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span><strong>مزودو الخدمة:</strong> قد نشارك معلومات مع شركات موثوقة تقدم خدمات تحليل البيانات واستضافة الخوادم.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span><strong>الامتثال القانوني:</strong> قد نكشف عن معلومات إذا كان ذلك مطلوباً بموجب القانون أو لحماية حقوق المنصة أو المستخدمين.</span></li>
                </ul>
              </div>

              {/* 5 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineDocumentText className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">حقوقك</h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span><strong>الوصول:</strong> يمكنك طلب نسخة من معلوماتك الشخصية التي نحتفظ بها.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span><strong>التصحيح:</strong> يمكنك تحديث أو تصحيح معلوماتك الشخصية من خلال إعدادات حسابك.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span><strong>الحذف:</strong> يمكنك طلب حذف حسابك ومعلوماتك الشخصية (راجع صفحة حذف الحساب).</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span><strong>الاعتراض:</strong> يمكنك الاعتراض على معالجة معلوماتك لأغراض التسويق المباشر.</span></li>
                </ul>
              </div>

              {/* 6 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineEye className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">ملفات تعريف الارتباط (Cookies)</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة. تساعدنا هذه الملفات في فهم كيفية 
                  استخدامك للمنصة وتذكر تفضيلاتك. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال 
                  إعدادات المتصفح الخاص بك.
                </p>
              </div>

              {/* 7 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">التحديثات على سياسة الخصوصية</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية عن 
                  طريق البريد الإلكتروني أو من خلال إشعار على المنصة. نوصي بمراجعة هذه الصفحة بشكل دوري.
                </p>
              </div>

              {/* 8 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineDocumentText className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">اتصل بنا</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية، يرجى التواصل معنا:
                </p>
                <div className="text-gray-700">
                  <p><strong>البريد الإلكتروني:</strong> support@sohighla.com</p>
                </div>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  );
}
