"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowRight, FiShield } from "react-icons/fi";
import Logo from "@/components/ui/Lgo";
import toast from "react-hot-toast";
import { useResentOTP, useVerifyResetPassword } from "@/hooks/auth/useAuth";

const VerifyResetCodeForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { mutate: verifyReset, isLoading: isVerifyLoading } = useVerifyResetPassword();
  const { mutate: resentMutate, isLoading: isResentOTPLoading } = useResentOTP();

  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle value input and focus movement
  const handleChange = (index: number, value: string) => {
    // Only accept numeric digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input if a digit is entered (RTL: move backwards)
    if (value && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Handle keypresses, specifically backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!code[index] && index < 3) {
        // Clear next input and focus it (RTL: move backwards)
        const newCode = [...code];
        newCode[index + 1] = "";
        setCode(newCode);
        inputRefs[index + 1].current?.focus();
      } else {
        // Clear current input
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  // Handle paste events (removed - now inline)

  const handleResend = async () => {
    if (!canResend) return;
    await resentMutate(email);
    setTimer(59);
    setCanResend(false);
    setCode(["", "", "", ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = [code[3], code[2], code[1], code[0]].join("");

    if (verificationCode.length < 4) {
      toast.error("يرجى إدخال الرمز المكون من 4 أرقام");
      return;
    }

    console.log(verificationCode);

    try {
      const res = await verifyReset({ email, code: verificationCode });
      // Store reset token in localStorage temporarily
      localStorage.setItem("resetToken", res.data);
      toast.success("تم التحقق بنجاح!");
      router.push("/auth/reset-password");
    } catch (error) {
      console.log(error);
      // الـ hook يعرض الخطأ بنفسه
    }
  };

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-500">
      
      {/* Back button */}
      <button 
        onClick={() => router.push("/auth/forgot-password")}
        className="self-start flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors cursor-pointer mb-6"
      >
        <FiArrowRight className="h-4 w-4" />
        تغيير البريد الإلكتروني
      </button>

      {/* Header & Logo */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <Logo />
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            تحقق من الرمز
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            أدخل رمز التحقق المكون من 4 أرقام المرسل على:{" "}
            <span className="text-primary font-bold">{email}</span>
          </p>
        </div>
      </div>

      {/* Shield Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <FiShield className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code Input */}
        <div className="space-y-3" dir="ltr">
          <label className="block text-right text-sm font-bold text-slate-700">
            رمز التحقق
          </label>
          <div className="flex gap-2 justify-between">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                value={code[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedData = e.clipboardData.getData("text").trim();
                  if (!/^\d{4}$/.test(pastedData)) return;
                  const digits = pastedData.split("");
                  setCode([digits[3], digits[2], digits[1], digits[0]]);
                  inputRefs[0].current?.focus();
                }}
                maxLength={1}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
              />
            ))}
          </div>
        </div>

        {/* Timer & Resend */}
        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-slate-500">
              إعادة الإرسال متاح خلال:{" "}
              <span className="font-bold text-primary">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResentOTPLoading}
              className="text-sm font-bold text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
            >
              {isResentOTPLoading ? "جاري الإرسال..." : "إرسال الرمز مرة أخرى"}
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isVerifyLoading}
          className="w-full bg-linear-main text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isVerifyLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              جاري التحقق...
            </>
          ) : (
            "التحقق من الرمز"
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyResetCodeForm;
