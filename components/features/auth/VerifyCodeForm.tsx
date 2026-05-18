"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowRight, FiShield } from "react-icons/fi";
import Logo from "@/components/ui/Lgo";
import toast from "react-hot-toast";
import { useResentOTP, useVerifyEmail } from "@/hooks/auth/useAuth";


const VerifyCodeForm = () => {
  const { user, login } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || (user?.email || "");
  const { mutate , isLoading: isVerifyOTPLoading} = useVerifyEmail();
  const { mutate: resentMutate , isLoading: isResentOTPLoading} = useResentOTP();

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

    // Auto-focus next input if a digit is entered
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle keypresses, specifically backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // Clear previous input and focus it
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs[index - 1].current?.focus();
      } else {
        // Clear current input
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  // Handle paste events
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{4}$/.test(pastedData)) return;

    const digits = pastedData.split("");
    setCode(digits);
    inputRefs[3].current?.focus();
  };

  const handleResend = async() => {
    if (!canResend) return;
    await resentMutate(email);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    
    if (verificationCode.length < 4) {
      toast.error("يرجى إدخال الرمز المكون من 4 أرقام");
      return;
    }

  try {
    const res = await mutate({ email, code: verificationCode })
    login(res)
    router.push(`/dashboard-craftsman/profile`);
  } catch (error) {
    console.log(error)
  }};

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-500">
      
      {/* Back button */}
      <button 
        onClick={() => router.push(`/dashboard-craftsman/verify-email?email=${encodeURIComponent(email)}`)}
        className="self-start flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors cursor-pointer mb-6"
      >
        <FiArrowRight className="h-4 w-4" />
        تغيير البريد الإلكتروني
      </button>

      {/* Header & Logo */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2 shadow-inner">
          <FiShield size={32} />
        </div>
        <h2 className="text-2xl font-black text-secondary tracking-tight">رمز التحقق</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-[320px]">
          أدخل الرمز المكون من 4 أرقام الذي أرسلناه إلى <span className="font-bold text-secondary block mt-1 dir-ltr">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Verification Inputs */}
        <div dir="ltr" className="flex gap-4 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-black text-secondary bg-[#F0F3FF] rounded-2xl border-2 border-[#C4C6CD] focus:border-[#EA580C] focus:bg-white outline-none transition-all duration-200 shadow-sm"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <div className="space-y-4">
          <button 
            type="submit"
            disabled={isVerifyOTPLoading}
            className="text-white text-[15px] font-bold w-full cursor-pointer bg-linear-to-r from-[#EA580C] to-[#F97316] hover:from-[#F97316] hover:to-[#EA580C] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl p-4 shadow-lg shadow-orange-600/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isVerifyOTPLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري التحقق...</span>
              </div>
            ) : (
              <span>تأكيد الرمز والتفعيل</span>
            )}
          </button>

          {/* Resend Code Section */}
          <div className="text-center text-xs">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResentOTPLoading}
                className="text-primary font-bold hover:underline cursor-pointer transition-all"
              >
                إعادة إرسال الرمز
              </button>
            ) : (
              <p className="text-slate-400">
                إعادة إرسال الرمز خلال <span className="font-bold text-secondary text-sm">{timer}</span> ثانية
              </p>
            )}
          </div>
        </div>

      </form>
      
      {/* Help footer */}
      <div className="mt-8 text-center text-[10px] text-slate-400">
        هل تواجه مشكلة؟ يرجى التواصل مع الدعم الفني لحل مشكلتك.
      </div>
    </div>
  );
};

export default VerifyCodeForm;
