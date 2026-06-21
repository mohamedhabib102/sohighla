import type { Metadata } from "next";
import CustomContainer from "@/components/ui/CustomContainer";
import { HiOutlineDocumentText, HiOutlineScale, HiOutlineUserGroup, HiOutlineShieldCheck } from "react-icons/hi2";

export const metadata: Metadata = {
  metadataBase: new URL("https://sohighla.vercel.app"),
  title: "الشروط والأحكام | شُغلَة - منصة الحرفيين",
  description: "الشروط والأحكام الخاصة باستخدام منصة شُغلَة. يرجى قراءتها بعناية قبل استخدام المنصة.",
  openGraph: {
    title: "الشروط والأحكام - منصة شُغلَة",
    description: "تعرف على شروط وأحكام استخدام منصة شُغلَة لربط الحرفيين بالعملاء.",
    url: "https://sohighla.vercel.app/terms",
    type: "website",
    locale: "ar_EG",
    siteName: "منصة شُغلَة",
  },
};

export default function Terms() {
  return (
    <>

      {/* Hero */}
      <section className="min-h-[50vh] relative py-12 lg:py-20 flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/90">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <CustomContainer>
          <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 text-center py-10">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
              <HiOutlineDocumentText className="text-5xl text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-black leading-[1.2] tracking-tight drop-shadow-2xl">
                الشروط والأحكام
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-lg max-w-2xl mx-auto">
                القواعد والالتزامات التي تنظم استخدام منصة شُغلَة
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
                  مرحباً بك في منصة <span className="font-bold text-primary">شُغلَة</span>. باستخدامك لهذه المنصة، 
                  فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءتها بعناية قبل استخدام المنصة. 
                  إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.
                </p>
              </div>

              {/* 1 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineScale className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">١. قبول الشروط</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  باستخدامك لمنصة شُغلَة، فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع القوانين 
                  واللوائح المعمول بها. أنت مسؤول عن الامتثال لأي قوانين محلية معمول بها. إذا كنت لا توافق 
                  على أي من هذه الشروط، يحظر عليك استخدام أو الوصول إلى هذه المنصة.
                </p>
              </div>

              {/* 2 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineUserGroup className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">٢. وصف الخدمة</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  منصة شُغلَة هي <strong>سوق إلكتروني</strong> يهدف إلى تسهيل عملية الربط بين العملاء 
                  والحرفيين. المنصة تقدم الخدمات التالية:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عرض ملفات الحرفيين وأعمالهم السابقة وتقييماتهم.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>توفير معلومات الاتصال بالحرفيين (رقم الهاتف) للتواصل المباشر.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>تمكين الحرفيين من عرض خدماتهم ومهاراتهم.</span></li>
                </ul>
                <div className="mt-4 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                  <p className="text-gray-700 text-sm">
                    <strong>ملاحظة مهمة:</strong> منصة شُغلَة <strong>لا تقدم</strong> خدمات الصيانة أو التصليح بنفسها. 
                    كما أنها <strong>لا توفر</strong> نظام محادثة داخلي، <strong>لا تتوسط</strong> في التواصل بين 
                    العميل والحرفي، و <strong>لا تتحمل</strong> مسؤولية الاتفاقات أو المدفوعات أو جودة العمل. 
                    دور المنصة يقتصر على عرض الخدمات وتوفير وسيلة للتواصل المباشر.
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">٣. حسابات المستخدمين</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">عند إنشاء حساب على المنصة، أنت توافق على:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>تقديم معلومات دقيقة وكاملة وحديثة عند التسجيل.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>الحفاظ على سرية كلمة المرور وحسابك.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>إبلاغنا فوراً بأي استخدام غير مصرح به لحسابك.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>أنت وحدك المسؤول عن جميع الأنشطة التي تحدث من خلال حسابك.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>لا يجوز إنشاء أكثر من حساب شخصي واحد.</span></li>
                </ul>
              </div>

              {/* 4 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineScale className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">٤. مسؤولية المستخدم</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">باستخدامك للمنصة، أنت توافق على:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عدم استخدام المنصة لأي غرض غير قانوني أو غير مصرح به.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عدم نشر أو إرسال أي محتوى مسيء أو تشهيري أو تمييزي.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عدم انتحال شخصية أي شخص أو كيان آخر.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عدم محاولة اختراق أمان المنصة أو الوصول إلى بيانات غير مصرح بها.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عدم نشر معلومات مضللة أو غير دقيقة عن الخدمات أو المهارات.</span></li>
                </ul>
              </div>

              {/* 5 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineDocumentText className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">٥. التواصل بين المستخدمين</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  التواصل بين العميل والحرفي يتم <strong>بشكل مباشر</strong> بعد حصول العميل على معلومات 
                  الاتصال. المنصة لا توفر نظام محادثة داخلي ولا تتوسط في أي مفاوضات أو اتفاقيات. 
                  جميع الاتفاقات المتعلقة بالسعر، الجدول الزمني، جودة العمل، والمدفوعات تكون <strong>بين 
                  الطرفين مباشرة</strong> ودون أي تدخل من المنصة.
                </p>
              </div>

              {/* 6 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">٦. التقييمات والمراجعات</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  التقييمات والمراجعات على المنصة تعبر عن رأي المستخدمين الشخصي. نحن لا نتحقق من صحة 
                  كل تقييم، لكننا نرصد أي مخالفات أو تجاوزات. باستخدامك لنظام التقييمات، أنت توافق على:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>تقديم تقييمات صادقة تعكس تجربتك الحقيقية.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عدم استخدام التقييمات كوسيلة للابتزاز أو التشهير.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عدم نشر تقييمات كاذبة أو مضللة.</span></li>
                </ul>
              </div>

              {/* 7 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineScale className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">٧. إخلاء المسؤولية</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  منصة شُغلَة تقدم خدماتها "كما هي" دون أي ضمانات صريحة أو ضمنية. المنصة <strong>لا تتحمل 
                  أي مسؤولية</strong> عن:
                </p>
                <ul className="space-y-3 text-gray-700 mt-3">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>جودة العمل المقدم من قبل الحرفيين.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>الاتفاقات المالية بين العميل والحرفي.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>أي نزاعات تنشأ بين المستخدمين.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>دقة المعلومات المقدمة من قبل المستخدمين في ملفاتهم الشخصية.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام المنصة.</span></li>
                </ul>
              </div>

              {/* 8 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">٨. حقوق الملكية الفكرية</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  جميع المحتويات المنشورة على المنصة، بما في ذلك التصميم، النصوص، الرسومات، الشعارات، 
                  والصور، هي ملك لمنصة شُغلَة أو مرخصة لها. لا يجوز نسخ أو توزيع أو استخدام أي من هذه 
                  المحتويات دون إذن كتابي مسبق. المستخدمون يحتفظون بحقوق المحتوى الذي يرفعونه (صور، 
                  فيديوهات، وصف)، ويمنحون المنصة ترخيصاً لعرض هذا المحتوى على المنصة.
                </p>
              </div>

              {/* 9 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineDocumentText className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">٩. إنهاء الحساب</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  نحتفظ بالحق في تعليق أو إنهاء أي حساب في أي وقت للأسباب التالية:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>انتهاك هذه الشروط والأحكام.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>سلوك غير قانوني أو احتيالي.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>بناءً على طلبك (حذف الحساب).</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>عدم النشاط لفترة طويلة.</span></li>
                </ul>
              </div>

              {/* 10 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineDocumentText className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">١٠. التعديلات على الشروط</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سنقوم بإشعار المستخدمين بأي 
                  تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على المنصة. استمرار استخدامك للمنصة 
                  بعد نشر التعديلات يعني قبولك للشروط المعدلة.
                </p>
              </div>

              {/* 11 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineDocumentText className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">١١. اتصل بنا</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  إذا كان لديك أي استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا:
                </p>
                <p className="text-gray-700"><strong>البريد الإلكتروني:</strong> support@sohighla.com</p>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  );
}
