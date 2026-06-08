"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { IoLockClosed } from "react-icons/io5";
import Logo from "@/components/ui/Lgo";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { useResetPassword } from "@/hooks/auth/useAuth";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [resetToken, setResetToken] = useState<string | null>(null);
  const { mutate: resetPassword, isLoading: isResetLoading } = useResetPassword();

  // Get reset token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("resetToken");
    if (!token) {
      toast.error("انتهت صلاحية الرمز، يرجى المحاولة مرة أخرى");
      router.push("/auth/forgot-password");
    } else {
    //   const 
      setResetToken(token);
    }
  }, [router]);

  const validatePassword = (pwd: string): boolean => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { password?: string; confirmPassword?: string } = {};

    // Validation
    if (!password) {
      newErrors.password = "يرجى إدخال كلمة المرور الجديدة";
    } else if (!validatePassword(password)) {
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حروف كبيرة وصغيرة وأرقام";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "يرجى تأكيد كلمة المرور";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Submit
    if (!resetToken) {
      toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
      return;
    }

    try {
      await resetPassword({ resetToken, newPassword: password });
      toast.success("تم تغيير كلمة المرور بنجاح!");
      // Clear the reset token from localStorage
      localStorage.removeItem("resetToken");
      router.push("/auth/sign-in");
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
            إعادة تعيين كلمة المرور
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            أدخل كلمة المرور الجديدة
          </p>
        </div>
      </div>

      {/* Lock Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <FiLock className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Password Input */}
        <div className="relative">
          <Input
            type="password"
            label="كلمة المرور الجديدة"
            placeholder="أدخل كلمة المرور الجديدة"
            name="password"
            id="password"
            iconBase={IoLockClosed}
            iconPassword={true}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
          />
          <p className="text-xs text-slate-400 mt-2">
            • 8 أحرف على الأقل
            <br />• حروف كبيرة وصغيرة
            <br />• أرقام
          </p>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <Input
            type="password"
            label="تأكيد كلمة المرور"
            placeholder="أكد كلمة المرور"
            name="confirmPassword"
            id="confirmPassword"
            iconBase={IoLockClosed}
            iconPassword={true}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors({ ...errors, confirmPassword: undefined });
            }}
            error={errors.confirmPassword}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isResetLoading || !resetToken}
          className="w-full bg-linear-main text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isResetLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              جاري التحديث...
            </>
          ) : (
            "تحديث كلمة المرور"
          )}
        </button>
      </form>

      {/* Info Message */}
      <p className="text-xs text-slate-400 text-center mt-6">
        بعد تحديث كلمة المرور سيتم توجيهك لصفحة تسجيل الدخول
      </p>
    </div>
  );
};

export default ResetPasswordForm;
