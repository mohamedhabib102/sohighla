"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import Logo from "@/components/ui/Lgo";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { useResentOTP } from "@/hooks/auth/useAuth";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { mutate: resentOTP, isLoading: isResentOTPLoading } = useResentOTP();

  const handleSubmit = async (e: React.FormEvent) => {
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
    try {
      await resentOTP(email);
      router.push(`/auth/verify-reset-code?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.log(error);
      // الـ hook يعرض الخطأ بنفسه
    }
  };

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-500">
      
      {/* Back button */}
      <button 
        onClick={() => router.push("/auth/sign-in")}
        className="self-start flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors cursor-pointer mb-6"
      >
        <FiArrowRight className="h-4 w-4" />
        العودة لتسجيل الدخول
      </button>

      {/* Header & Logo */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <Logo />
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            نسيت كلمة المرور؟
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            أدخل بريدك الإلكتروني لإرسال رمز التحقق
          </p>
        </div>
      </div>

      {/* Email Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <FiMail className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            label="البريد الإلكتروني"
            placeholder="أدخل بريدك الإلكتروني"
            name="email"
            id="email"
            iconBase={MdEmail}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            error={error}
          />
        </div>

        <button
          type="submit"
          disabled={isResentOTPLoading}
          className="w-full bg-linear-main text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isResentOTPLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              جاري الإرسال...
            </>
          ) : (
            "إرسال رمز التحقق"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-slate-400">أو</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-slate-600">
        ليس لديك حساب؟{" "}
        <button
          type="button"
          onClick={() => router.push("/auth/sign-up")}
          className="font-bold text-primary hover:text-primary/80 transition-colors"
        >
          إنشاء حساب
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
