"use client";
import { FiStar, FiUser, FiPhone, FiPlay, FiImage, FiBriefcase, FiMapPin, FiCheckCircle, FiAlertCircle, FiCalendar } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useCraftsmanById } from "@/hooks/craftsman/useCraftsman";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { motion } from "framer-motion";

const HomeDashboardCraftsman = () => {
  const { user } = useAuthStore();
  const { data: craftsman, isLoading } = useCraftsmanById(user?.personID || 0);

  if (isLoading) {
    return <LoadingComponent />;
  }

  // Calculate completion steps
  const isEmailVerified = !!user?.isVerifyEmail;
  const hasProfile = !!craftsman;
  const hasAbout = !!craftsman?.aboutDescription;
  const hasWorkImages = !!(craftsman?.workImages && craftsman.workImages.length > 0);

  let completionPercentage = 0;
  if (isEmailVerified) completionPercentage += 25;
  if (hasProfile) completionPercentage += 25;
  if (hasAbout) completionPercentage += 25;
  if (hasWorkImages) completionPercentage += 25;

  const stats = [
    {
      id: 1,
      label: "استكمال الحساب",
      value: `${completionPercentage}%`,
      icon: FiUser,
      color: completionPercentage === 100 ? "text-green-500" : "text-orange-500",
      bg: completionPercentage === 100 ? "bg-green-50" : "bg-orange-50"
    },
    {
      id: 2,
      label: "متوسط التقييم",
      value: craftsman?.averageRating ? craftsman.averageRating.toFixed(1) : "0.0",
      icon: FiStar,
      color: "text-yellow-500",
      bg: "bg-yellow-50"
    },
    {
      id: 3,
      label: "إجمالي التقييمات",
      value: craftsman?.totalRatings || 0,
      icon: FiStar,
      color: "text-blue-500",
      bg: "bg-blue-50"
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  } as const;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-lemonada">لوحة التحكم</h1>
          <p className="text-gray-500 mt-1 text-lg">
            مرحباً بك مجدداً، <span className="font-lemonada text-secondary font-bold">{craftsman?.firstName || user?.firstName || "أيها الحرفي"}</span> في <span className="font-lemonada text-primary">شُغلَة</span>
          </p>
        </div>
      </div>

      {/* Analysis Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow cursor-default"
          >
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-secondary mt-1">{stat.value}</h3>
            </div>
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Left: Account Completion & Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Account Completion Widget */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <FiCheckCircle className="text-primary" size={20} />
              <h2 className="text-xl font-bold text-secondary">حالة الحساب</h2>
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
              {/* Step 1: Email Verification */}
              <div className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 bg-gray-50/30">
                <div className="flex items-center gap-3">
                  {isEmailVerified ? (
                    <FiCheckCircle className="text-green-500 shrink-0" size={18} />
                  ) : (
                    <FiAlertCircle className="text-orange-500 shrink-0" size={18} />
                  )}
                  <span className="text-sm text-secondary font-medium">التحقق من البريد الإلكتروني</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isEmailVerified ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {isEmailVerified ? 'مكتمل' : 'مطلوب'}
                </span>
              </div>

              {/* Step 2: Profile Added */}
              <div className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 bg-gray-50/30">
                <div className="flex items-center gap-3">
                  {hasProfile ? (
                    <FiCheckCircle className="text-green-500 shrink-0" size={18} />
                  ) : (
                    <FiAlertCircle className="text-orange-500 shrink-0" size={18} />
                  )}
                  <span className="text-sm text-secondary font-medium">إضافة بيانات الملف الشخصي</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${hasProfile ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {hasProfile ? 'مكتمل' : 'مطلوب'}
                </span>
              </div>

              {/* Step 3: Bio Added */}
              <div className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 bg-gray-50/30">
                <div className="flex items-center gap-3">
                  {hasAbout ? (
                    <FiCheckCircle className="text-green-500 shrink-0" size={18} />
                  ) : (
                    <FiAlertCircle className="text-orange-500 shrink-0" size={18} />
                  )}
                  <span className="text-sm text-secondary font-medium">كتابة السيرة الذاتية (نبذة عني)</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${hasAbout ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {hasAbout ? 'مكتمل' : 'مطلوب'}
                </span>
              </div>

              {/* Step 4: Portfolio Images */}
              <div className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 bg-gray-50/30">
                <div className="flex items-center gap-3">
                  {hasWorkImages ? (
                    <FiCheckCircle className="text-green-500 shrink-0" size={18} />
                  ) : (
                    <FiAlertCircle className="text-orange-500 shrink-0" size={18} />
                  )}
                  <span className="text-sm text-secondary font-medium">إضافة صور لمعرض الأعمال</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${hasWorkImages ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {hasWorkImages ? 'مكتمل' : 'مطلوب'}
                </span>
              </div>
            </div>

            {completionPercentage < 100 && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-6">
                <Link 
                  href="/dashboard-craftsman/profile" 
                  className="block text-center bg-primary text-secondary py-3 px-4 rounded-2xl font-bold text-sm hover:opacity-95 transition-opacity"
                >
                  أكمل ملفك الشخصي الآن
                </Link>
              </motion.div>
            )}
          </div>

          {/* Quick Info Card */}
          {craftsman && (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-md font-bold text-secondary border-r-2 border-primary pr-3 mb-4">معلومات العمل</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-primary"><FiBriefcase size={16} /></div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">الصنعة / المهنة</p>
                    <p className="text-xs font-bold text-secondary">{craftsman.categoryName || "غير محدد"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-primary"><FiMapPin size={16} /></div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">الموقع</p>
                    <p className="text-xs font-bold text-secondary">{craftsman.locationText || "غير محدد"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-primary"><FiCalendar size={16} /></div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">تاريخ الانضمام</p>
                    <p className="text-xs font-bold text-secondary">
                      {new Date(craftsman.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Center/Right Content: Profile & Projects */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          
          {/* Professional Profile Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
              <FiUser className="text-primary" /> السيرة المهنية والبيانات
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-gray-400 text-xs block mb-3 uppercase tracking-wider font-semibold">نبذة عني (About)</label>
                {craftsman?.aboutDescription ? (
                  <div className="p-5 bg-gray-50/50 rounded-2xl text-secondary leading-relaxed border border-gray-50 text-md italic">
                    "{craftsman.aboutDescription}"
                  </div>
                ) : (
                  <div className="p-5 bg-orange-50/30 rounded-2xl text-orange-600 leading-relaxed border border-dashed border-orange-200 text-md text-center">
                    لا توجد نبذة تعريفية مضافة حالياً. يرجى إضافتها لعرضها للعملاء.
                    <div className="mt-2">
                      <Link href="/dashboard-craftsman/profile" className="text-xs font-bold text-primary hover:underline">
                        إضافة نبذة الآن ←
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {craftsman && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-400 text-xs block mb-3 uppercase tracking-wider font-semibold">رقم التواصل</label>
                    <div className="flex items-center gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-50 font-bold text-secondary text-lg">
                      <FiPhone className="text-primary" size={20} />
                      <span>اتصال مباشر</span>
                    </div>
                  </div>
                  {craftsman.introVideoURL && (
                    <div>
                      <label className="text-gray-400 text-xs block mb-3 uppercase tracking-wider font-semibold">فيديو تعريفي</label>
                      <motion.div whileHover={{ scale: 1.02 }} className="relative group cursor-pointer overflow-hidden rounded-2xl h-[65px] border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
                        <Link href="/dashboard-craftsman/profile" className="absolute inset-0 bg-secondary/80 flex items-center justify-center text-white gap-3 transition-all hover:bg-secondary">
                          <FiPlay size={20} /> <span className="text-sm font-bold">مشاهدة الفيديو التعريفي</span>
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Projects Gallery Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <FiImage className="text-primary" /> معرض أعمالي السابقة
              </h2>
              {craftsman?.workImages && (
                <span className="text-gray-400 text-sm">{craftsman.workImages.length} مشاريع معروضة</span>
              )}
            </div>
            
            {craftsman?.workImages && craftsman.workImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {craftsman.workImages.map((project) => (
                  <motion.div 
                    key={project.imageID} 
                    whileHover={{ scale: 1.04, y: -3 }}
                    className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group border-4 border-white cursor-pointer"
                  >
                    <Image 
                      src={project.imageURL} 
                      alt="Project" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-bold">عرض تفاصيل المشروع</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 space-y-3">
                <FiImage className="text-gray-300" size={40} />
                <p className="text-gray-400 text-sm font-bold">معرض الأعمال فارغ حالياً</p>
                <Link href="/dashboard-craftsman/profile" className="text-xs font-bold text-primary hover:underline">
                  أضف بعض الصور لعرض مهاراتك للعملاء ←
                </Link>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
              <FiStar className="text-primary" /> تقييمات العملاء
            </h2>
            <div className="space-y-6">
              {craftsman?.ratings && craftsman.ratings.length > 0 ? (
                craftsman.ratings.map((rev, index) => (
                  <div key={index} className="space-y-3 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center font-bold text-sm">
                          {rev.personName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-secondary text-xs">{rev.personName}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                size={10} 
                                className={i < rev.rate ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full font-bold">
                        {new Date(rev.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed pr-2 border-r-2 border-gray-50">
                      {rev.ratingMessage}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic text-center py-4">لا توجد تقييمات بعد.</p>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default HomeDashboardCraftsman;