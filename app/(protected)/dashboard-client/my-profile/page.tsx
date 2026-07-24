"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import Image from "next/image";
import { useClientRequests } from "@/hooks/client/useClient";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { motion } from "framer-motion";
import { 
  FiUser, 
  FiMail, 
  FiShield, 
  FiPhone, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiInfo, 
  FiLock, 
  FiCalendar,
  FiArrowLeft,
  FiExternalLink
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const cleanImageUrl = (url?: string | null) => {
  if (!url) return "/default-profile.png";
  let cleanUrl = url;
  if (cleanUrl.startsWith("https://tasklyqu.runasp.nethttps://tasklyqu.runasp.net")) {
    cleanUrl = cleanUrl.replace("https://tasklyqu.runasp.nethttps://tasklyqu.runasp.net", "https://tasklyqu.runasp.net");
  }
  return cleanUrl;
};

const MyProfile = () => {
  const user = useAuthStore((state) => state.user);
  const { requests, loading: loadingRequests } = useClientRequests(user?.personID);

  if (!user) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-sm w-full">
          <FiAlertTriangle className="text-orange-500 mx-auto mb-4" size={48} />
          <p className="text-gray-600 text-lg mb-4 font-bold">يجب تسجيل الدخول أولاً</p>
          <Link href="/auth/sign-in" className="bg-primary text-secondary font-bold px-6 py-3 rounded-2xl block hover:opacity-95 transition-opacity">
            اذهب إلى تسجيل الدخول
          </Link>
        </div>
      </section>
    );
  }

  if (loadingRequests) {
    return <LoadingComponent />;
  }

  const isClient = user.role === "customer" || user.role === "client";

  // Calculate completion percentage
  const isEmailVerified = !!user.isVerifyEmail;
  const hasName = !!(user.firstName && user.lastName);
  const hasEmail = !!user.email;

  let completionPercentage = 0;
  if (isEmailVerified) completionPercentage += 50;
  if (hasName) completionPercentage += 25;
  if (hasEmail) completionPercentage += 25;

  // Get the last craftsman contacted
  const lastRequest = requests && requests.length > 0 
    ? [...requests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "قيد الانتظار";
      case 1:
        return "تم إنجاز العمل";
      case 2:
        return "ملغى";
      default:
        return "غير معروف";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-secondary/10 text-secondary";
      case 1:
        return "bg-green-50 text-green-600 border border-green-100";
      case 2:
        return "bg-red-50 text-red-600 border border-red-100";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
  } as const;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 bg-gray-50 text-right font-tajawal pb-20"
    >
      <CustomContainer>
        {/* Welcome Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-secondary rounded-3xl shadow-lg p-8 md:p-10 text-white mb-8 relative overflow-hidden border border-gray-800"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-10 translate-y-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold font-lemonada text-primary mb-3">
                مرحباً، {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                {isClient 
                  ? "حساب العميل الخاص بك يتيح لك البحث عن أفضل الصنايعية والحرفيين، والتواصل معهم مباشرة لتنفيذ أعمالك بأعلى جودة."
                  : "مرحباً بك في لوحة تحكم حسابك الخاصة بالعملاء."}
              </p>
            </div>

            {!isEmailVerified && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link 
                  href="/auth/verify-email" 
                  className="bg-primary text-secondary px-6 py-3 rounded-2xl font-bold text-xs hover:opacity-95 transition-all flex items-center gap-2 self-start md:self-auto shrink-0 shadow-lg shadow-primary/20"
                >
                  تأكيد الحساب الآن
                  <FiArrowLeft size={14} />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Right Column: Account Info & Last Contact */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Account Info Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
            >
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2 border-r-4 border-primary pr-3">
                <FiInfo className="text-primary" /> تفاصيل الحساب الأساسية
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                  <div className="p-3 bg-white text-primary rounded-xl shadow-xs"><FiUser size={20} /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">الاسم الكامل</p>
                    <p className="text-sm font-bold text-secondary mt-0.5">{user.firstName} {user.lastName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                  <div className="p-3 bg-white text-primary rounded-xl shadow-xs"><FiMail size={20} /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">البريد الإلكتروني</p>
                    <p className="text-sm font-bold text-secondary mt-0.5">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                  <div className="p-3 bg-white text-primary rounded-xl shadow-xs"><FiShield size={20} /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">حالة الحساب</p>
                    <p className="text-sm font-bold text-secondary mt-0.5">
                      {isEmailVerified ? "مؤكد بنجاح" : "غير مؤكد"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                  <div className="p-3 bg-white text-primary rounded-xl shadow-xs"><FiUser size={20} /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">نوع الحساب</p>
                    <p className="text-sm font-bold text-secondary mt-0.5">عميل المنصة</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Last Craftsman Contacted Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
            >
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2 border-r-4 border-primary pr-3">
                <FiUser className="text-primary" /> آخر حرفي تم التواصل معه
              </h2>

              {lastRequest ? (
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <Image 
                      src={cleanImageUrl(lastRequest.profileImageUrl)} 
                      alt={`${lastRequest.firstName} ${lastRequest.lastName}`}
                      width={65} 
                      height={65} 
                      className="rounded-2xl border border-gray-200 object-cover w-[65px] h-[65px]" 
                    />
                    <div>
                      <h4 className="font-bold text-secondary text-base">{lastRequest.firstName} {lastRequest.lastName}</h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 justify-end">
                        <span>{lastRequest.requestTitle || "خدمة صيانة"}</span>
                      </p>
                      {lastRequest.requestDescription && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-sm">{lastRequest.requestDescription}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                    <div className="flex gap-2 text-xs">
                      <span className={`px-3 py-1 rounded-full font-bold ${getStatusColor(lastRequest.status)}`}>
                        {getStatusLabel(lastRequest.status)}
                      </span>
                      <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                        <FiCalendar size={12} />
                        {new Date(lastRequest.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                    </div>

                    {lastRequest.phoneNumber && (
                      <div className="flex gap-2 w-full justify-center md:justify-end">
                        <a 
                          href={`tel:${lastRequest.phoneNumber}`}
                          className="bg-secondary hover:opacity-95 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <FiPhone size={12} />
                          اتصال
                        </a>
                        <a 
                          href={`https://wa.me/${lastRequest.phoneNumber.trim().replace(/\+/g, "").replace(/^00/, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <FaWhatsapp size={14} />
                          واتساب
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 space-y-4">
                  <FiUser className="text-gray-300" size={40} />
                  <p className="text-gray-400 text-sm font-bold text-center">لم تقم بالتواصل مع أي حرفي حتى الآن</p>
                  <Link href="/craftsmen" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    تصفح قائمة الصنايعية وابدأ طلبك الأول ←
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Disclaimer Disclaimer */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary/5 rounded-3xl p-6 border border-gray-100 flex gap-3 text-right"
            >
              <FiInfo className="text-primary text-2xl shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-secondary mb-1">تنويه وإخلاء مسؤولية</p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  المنصة مجرد وسيط يربط بين العملاء والصنايعية لتسهيل الوصول للخدمة المناسبة بسرعة وسهولة. جميع الاتفاقات، الأسعار، وجودة التنفيذ تتم بشكل مباشر بين الطرفين دون أي تدخل من المنصة. المنصة لا تتحمل أي مسؤولية عن طبيعة الاتفاق أو جودة العمل أو أي تعامل يتم خارج نطاقها.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Left Column: Account Completion & Actions */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Account Completion Widget */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-2 mb-6">
                <FiCheckCircle className="text-primary" size={20} />
                <h2 className="text-lg font-bold text-secondary">استكمال الحساب</h2>
              </div>
              
              {/* Progress Bar */}
              <div className="relative pt-1 mb-6">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-secondary bg-primary/20">
                      مستوى الإنجاز
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold inline-block text-secondary">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2.5 text-xs flex rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                  ></motion.div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl border border-gray-50 text-xs">
                  <div className="flex items-center gap-2">
                    {isEmailVerified ? (
                      <FiCheckCircle className="text-green-500 shrink-0" size={16} />
                    ) : (
                      <FiAlertTriangle className="text-orange-500 shrink-0" size={16} />
                    )}
                    <span className="text-gray-600 font-medium">التحقق من البريد الإلكتروني (50%)</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${isEmailVerified ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    {isEmailVerified ? 'مكتمل' : 'مطلوب'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl border border-gray-50 text-xs">
                  <div className="flex items-center gap-2">
                    {hasName ? (
                      <FiCheckCircle className="text-green-500 shrink-0" size={16} />
                    ) : (
                      <FiAlertTriangle className="text-orange-500 shrink-0" size={16} />
                    )}
                    <span className="text-gray-600 font-medium">بيانات الاسم الكامل (25%)</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${hasName ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    {hasName ? 'مكتمل' : 'مطلوب'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl border border-gray-50 text-xs">
                  <div className="flex items-center gap-2">
                    {hasEmail ? (
                      <FiCheckCircle className="text-green-500 shrink-0" size={16} />
                    ) : (
                      <FiAlertTriangle className="text-orange-500 shrink-0" size={16} />
                    )}
                    <span className="text-gray-600 font-medium">البريد الإلكتروني مضاف (25%)</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${hasEmail ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    {hasEmail ? 'مكتمل' : 'مطلوب'}
                  </span>
                </div>
              </div>

              {requests && (
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-gray-400">إجمالي التواصلات مع الحرفيين</span>
                  <span className="bg-primary/20 text-secondary font-black px-2.5 py-1 rounded-lg">
                    {requests.length} تواصل
                  </span>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4"
            >
              <h3 className="text-lg font-bold text-secondary border-r-2 border-primary pr-3 mb-4">إجراءات سريعة</h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3"
              >
                {!isEmailVerified && (
                  <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link 
                      href="/auth/verify-email" 
                      className="w-full bg-primary text-secondary font-bold py-3 px-4 rounded-2xl text-center text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                    >
                      <FiShield size={14} />
                      تأكيد الحساب وتفعيل البريد
                    </Link>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="/auth/forgot-password" 
                    className="w-full border border-gray-200 text-gray-500 font-bold py-3 px-4 rounded-2xl text-center text-xs flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <FiLock size={14} />
                    تغيير كلمة المرور
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="/craftsmen" 
                    className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-2xl text-center text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                  >
                    <FiExternalLink size={14} />
                    تصفح الصنايعية في شغلّة
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </CustomContainer>
    </motion.section>
  );
};

export default MyProfile;
