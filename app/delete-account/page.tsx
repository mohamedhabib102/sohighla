import type { Metadata } from "next";
import CustomContainer from "@/components/ui/CustomContainer";
import { HiOutlineTrash, HiOutlineExclamationTriangle, HiOutlineShieldCheck, HiOutlineEnvelope } from "react-icons/hi2";

export const metadata: Metadata = {
  metadataBase: new URL("https://sohighla.vercel.app"),
  title: "حذف الحساب | شُغلَة - منصة الحرفيين",
  description: "تعرف على كيفية حذف حسابك من منصة شُغلَة وما هي الإجراءات المتبعة لضمان حذف جميع بياناتك.",
  openGraph: {
    title: "حذف الحساب - منصة شُغلَة",
    description: "إجراءات حذف الحساب من منصة شُغلَة وبيان كيفية التعامل مع بياناتك بعد الحذف.",
    url: "https://sohighla.vercel.app/delete-account",
    type: "website",
    locale: "ar_EG",
    siteName: "منصة شُغلَة",
  },
};

export default function DeleteAccount() {
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
              <HiOutlineTrash className="text-5xl text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-black leading-[1.2] tracking-tight drop-shadow-2xl">
                حذف الحساب
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-lg max-w-2xl mx-auto">
                إجراءات حذف حسابك وبياناتك من منصة شُغلَة
              </p>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <CustomContainer>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">

              {/* What happens */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineTrash className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">ماذا يحدث عند حذف الحساب؟</h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span>يتم حذف جميع معلومات حسابك الشخصية بشكل نهائي.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span>سيتم إزالة ملفك التعريفي (للحرفيين) من نتائج البحث.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span>لن تتمكن من تسجيل الدخول أو استعادة حسابك بعد الحذف.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span>التقييمات والتعليقات التي كتبتها قد تبقى مرئية بشكل غير مرتبط بحسابك.</span>
                  </li>
                </ul>
              </div>

              {/* Before you delete */}
              <div className="p-6 rounded-2xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <HiOutlineExclamationTriangle className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">قبل أن تحذف حسابك</h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                    <span><strong>هذا الإجراء نهائي:</strong> لا يمكن التراجع عن حذف الحساب أو استعادة بياناتك بعد تنفيذه.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                    <span><strong>احتفظ بنسخة:</strong> إذا كان لديك أي معلومات مهمة في حسابك، يفضل حفظ نسخة منها قبل الحذف.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                    <span><strong>بديل:</strong> إذا كنت تواجه مشكلة مع المنصة، يمكنك التواصل مع الدعم الفني أولاً بدلاً من حذف الحساب.</span>
                  </li>
                </ul>
              </div>

              {/* How to delete */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">كيف تحذف حسابك</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  لحذف حسابك من منصة شُغلَة، يرجى اتباع الخطوات التالية:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-linear-main text-white flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-bold text-secondary">سجل الدخول إلى حسابك</h4>
                      <p className="text-gray-600 text-sm">استخدم بريدك الإلكتروني وكلمة المرور للدخول إلى حسابك على المنصة.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-linear-main text-white flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-bold text-secondary">اذهب إلى الإعدادات</h4>
                      <p className="text-gray-600 text-sm">من لوحة التحكم، انتقل إلى إعدادات الملف الشخصي أو إعدادات الحساب.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-linear-main text-white flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-bold text-secondary">اختر "حذف الحساب"</h4>
                      <p className="text-gray-600 text-sm">ابحث عن خيار حذف الحساب في إعدادات الأمان أو أسفل الصفحة.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-linear-main text-white flex items-center justify-center shrink-0 font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-bold text-secondary">تأكيد الحذف</h4>
                      <p className="text-gray-600 text-sm">اتبع التعليمات التي تظهر على الشاشة لتأكيد رغبتك في حذف الحساب بشكل نهائي.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineEnvelope className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">حذف الحساب عبر البريد الإلكتروني</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  إذا واجهت أي مشكلة في حذف حسابك بنفسك، يمكنك إرسال طلب حذف عبر البريد الإلكتروني:
                </p>
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="text-gray-700 mb-2"><strong>أرسل بريداً إلكترونياً إلى:</strong> support@sohighla.com</p>
                  <p className="text-gray-600 text-sm">يرجى تضمين المعلومات التالية في البريد:</p>
                  <ul className="space-y-1 text-gray-600 text-sm mt-2">
                    <li>• البريد الإلكتروني المسجل به الحساب</li>
                    <li>• اسم المستخدم الكامل</li>
                    <li>• سبب حذف الحساب (اختياري)</li>
                  </ul>
                </div>
              </div>

              {/* After deletion */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">بعد حذف الحساب</h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>سيتم حذف جميع بياناتك الشخصية من قواعد البيانات النشطة خلال مدة أقصاها 30 يوماً.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>بعض المعلومات غير الشخصية (مثل التقييمات) قد تبقى لأغراض إحصائية بشكل مجهول.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>سيتم إرسال تأكيد حذف إلى بريدك الإلكتروني بعد اكتمال العملية.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span><span>لن نتمكن من استعادة حسابك أو بياناتك بعد الحذف.</span></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-main text-white flex items-center justify-center shrink-0">
                    <HiOutlineEnvelope className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">لديك استفسار؟</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  إذا كان لديك أي استفسار حول حذف الحساب أو كيفية التعامل مع بياناتك، لا تتردد في 
                  التواصل معنا على: <strong>support@sohighla.com</strong>
                </p>
              </div>

            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  );
}
