"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { FiMail, FiArrowRight } from "react-icons/fi";
import Logo from "@/components/ui/Lgo";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { useResentOTP } from "@/hooks/auth/useAuth";

const VerifyEmailForm = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: resentOTP , isLoading: isResentOTPLoading } = useResentOTP()


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("الرجاء إدخال البريد الإلكتروني");
      return;
    }
    
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("الرجاء إدخال بريد إلكتروني صالح");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await resentOTP(email)
      setIsLoading(false);
      router.push(`/auth/verify-code?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.log(error)
      toast.error("حدث خطأ يرجى المحاولة مرة اخرى يمكنك عمل تحديث للصفحة ");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-500">
      
      {/* Back button */}
      <button 
        onClick={() => router.push("/dashboard-craftsman/profile")}
        className="self-start flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors cursor-pointer mb-6"
      >
        <FiArrowRight className="h-4 w-4" />
        العودة للملف الشخصي
      </button>

      {/* Header & Logo */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <Logo width={120} height={120} />
        <h2 className="text-2xl font-black text-secondary tracking-tight">التحقق من البريد الإلكتروني</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-[320px]">
          تفعيل حسابك عبر البريد الإلكتروني يمنحك التواجد الفوري بالمنصة للظهور للعملاء واستقبال طلبات العمل.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input 
            id="email-verify"
            name="email"
            type="email"
            label="البريد الإلكتروني للتحقق"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            iconBase={FiMail}
            error={error}
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="text-white text-[15px] font-bold w-full mt-4 cursor-pointer bg-linear-to-r from-[#EA580C] to-[#F97316] hover:from-[#F97316] hover:to-[#EA580C] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl p-4 shadow-lg shadow-orange-600/20 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري إرسال الرمز...</span>
            </div>
          ) : (
            <span>أرسل رمز التحقق</span>
          )}
        </button>
      </form>
      
      {/* Help footer */}
      <div className="mt-8 text-center text-[10px] text-slate-400">
        هل تواجه مشكلة؟ يرجى التواصل مع الدعم الفني لحل مشكلتك.
      </div>
    </div>
  );
};

export default VerifyEmailForm;
