"use client";

import Header from "@/components/layout/Header";
import CustomContainer from "@/components/ui/CustomContainer";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { IoIosWarning, IoMdInformationCircleOutline } from "react-icons/io";
import { MdEmail, MdVerified, MdPerson, MdOutlineInfo } from "react-icons/md";

const MyProfile = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <>
        <Header />
        <section className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">يجب تسجيل الدخول أولاً</p>
            <Link href="/auth/sign-in" className="text-primary font-semibold">
              اذهب إلى تسجيل الدخول
            </Link>
          </div>
        </section>
      </>
    );
  }

  const isClient = user.role === "customer";

  return (
    <>
      <Header />

      <section className="min-h-screen py-12 bg-gray-50">
        <CustomContainer>
          <div className="bg-secondary rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex-1 text-right">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {user.firstName} {user.lastName}
                </h1>

                <p className="text-xl mb-4">
                  {isClient &&
                    "عميل يبحث عن صنايعية محترفين لتنفيذ أعمال بجودة عالية وتشطيب احترافي حسب الطلب"}
                </p>

                <div className="px-4 py-3 bg-white/10 rounded-lg w-fit mb-4">
                  {user.isVerifyEmail ? (
                    <span className="flex items-center gap-2 text-green-300">
                      <MdVerified />
                      تم التحقق من البريد الإلكتروني
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-primary">
                      <IoIosWarning className="mt-1" size={20} />
                      <span className="text-sm">
                        يجب تأكيد البريد الإلكتروني لتفعيل الحساب واستخدام جميع
                        الخدمات
                      </span>
                    </span>
                  )}
                </div>

                {!user.isVerifyEmail && (
                  <Link
                    href="/auth/verify-email"
                    className="inline-flex items-center gap-2 bg-primary text-secondary font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition"
                  >
                    تأكيد الحساب
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8 text-right">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-secondary">
              <MdOutlineInfo className="text-primary text-2xl" />
              بيانات الحساب
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                <MdPerson className="text-primary text-xl mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">الاسم الكامل</p>
                  <p className="font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                <MdEmail className="text-primary text-xl mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">البريد الإلكتروني</p>
                  <p className="font-bold text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                <MdVerified className="text-primary text-xl mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">حالة البريد</p>
                  <p className="font-bold text-gray-900">
                    {user.isVerifyEmail
                      ? "تم التحقق من البريد الإلكتروني"
                      : "لم يتم التحقق من البريد الإلكتروني"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                <MdPerson className="text-primary text-xl mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">نوع الحساب</p>
                  <p className="font-bold text-gray-900">
                    {isClient ? "عميل" : user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isClient && (
            <div className="bg-primary/10 rounded-xl p-6 text-right mb-8">
              <h3 className="font-bold mb-2 text-secondary">عن الحساب</h3>
              <p className="text-gray-700 leading-relaxed">
                حساب مخصص للعملاء للبحث عن صنايعية محترفين وتنفيذ الأعمال بسهولة
                مع إمكانية اختيار الأنسب حسب الخبرة والتقييم.
              </p>
            </div>
          )}

          <div className="bg-secondary/5 rounded-xl p-6 flex gap-3 text-right">
            <IoMdInformationCircleOutline className="text-primary text-2xl mt-1" />

            <div>
              <p className="font-bold text-secondary mb-1">تنويه مهم</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                المنصة مجرد وسيط يربط بين العملاء والصنايعية لتسهيل الوصول
                للخدمة المناسبة بسرعة وسهولة. جميع الاتفاقات، الأسعار، وجودة
                التنفيذ تتم بشكل مباشر بين الطرفين دون أي تدخل من المنصة. المنصة
                لا تتحمل أي مسؤولية عن طبيعة الاتفاق أو جودة العمل أو أي تعامل
                يتم خارج نطاقها، ودورها يقتصر فقط على توفير وسيلة تواصل بين
                المستخدمين
              </p>
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  );
};

export default MyProfile;
