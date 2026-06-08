"use client";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

const EmailVerificationBanner = () => {
  const { user } = useAuthStore();
  if (!user || user.isVerifyEmail !== false) return null;
  return (
    <div className="w-full bg-secondary text-white shadow-lg relative z-50 animate-in slide-in-from-top duration-500 border-b-2 border-primary/80">
      <div className="max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-right w-full md:w-auto">
          <div className="p-2 bg-primary/10 backdrop-blur-md rounded-xl shrink-0 animate-pulse border border-primary/25">
            <FiAlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold tracking-wide text-white/95">تنبيه هام جداً: حسابك غير نشط!</h4>
            <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
              لن تظهر في المنصة للعملاء، ولن يتمكن أي عميل من التواصل معك، رؤية رقمك أو تصفح ملفك الشخصي حتى تقوم بالتحقق من بريدك الإلكتروني.
            </p>
          </div>
        </div>

        {/* Left Section: Action Button */}
        <div className="flex items-center shrink-0 w-full md:w-auto justify-end">
          <Link 
            href="/auth/verify-email" 
            className="flex items-center justify-center gap-2 w-full md:w-auto whitespace-nowrap bg-primary text-secondary hover:scale-105 active:scale-95 px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md shadow-primary/10 hover:shadow-primary/20"
          >
            التحقق من البريد الآن
            <FiArrowLeft className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default EmailVerificationBanner;
