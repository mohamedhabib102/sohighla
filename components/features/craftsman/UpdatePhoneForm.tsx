"use client";
import React, { useState } from "react";
import { useUpdatePhoneNumber } from "@/hooks/craftsman/useCraftsman";
import { FiPhone, FiInfo } from "react-icons/fi";

interface UpdatePhoneFormProps {
  initialPhone?: string;
  onSuccess: () => void;
}

const UpdatePhoneForm = ({ initialPhone = "", onSuccess }: UpdatePhoneFormProps) => {
  const { mutate, isLoading } = useUpdatePhoneNumber();
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError("الرجاء إدخال رقم الهاتف");
      return;
    }

    // Global phone validation (supports optional + and 7 to 15 digits)
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      setError("الرجاء إدخال رقم هاتف صحيح يشمل رمز الدولة (مثال: 9665XXXXXXXX+ أو 05XXXXXXXX)");
      return;
    }

    setError("");
    try {
      await mutate(phoneNumber.trim());
      onSuccess();
    } catch (err) {
      console.error("Failed to update phone number:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-right" dir="rtl">
      <div className="space-y-2">
        <label className="text-sm font-bold text-secondary flex items-center gap-2">
          <FiPhone className="text-primary" /> رقم الهاتف الجديد
        </label>
        <div className="relative">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (error) setError("");
            }}
            placeholder="مثال: 9665xxxxxxxx+ أو 05xxxxxxxx"
            required
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left dir-ltr font-bold text-slate-700"
          />
        </div>
        {error && <p className="text-red-500 text-xs font-bold mt-1">{error}</p>}
      </div>

      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start gap-2.5">
        <FiInfo className="text-primary shrink-0 mt-0.5" size={16} />
        <p className="text-[10px] text-orange-800 leading-relaxed font-bold">
          سيتم تحديث رقم هاتفك المعتمد في المنصة للتواصل معك من قبل العملاء. يرجى التأكد من كتابة الرقم بشكل صحيح لاستقبال الاتصالات.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-primary text-secondary font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 text-base flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <span>جاري الحفظ...</span>
          </div>
        ) : (
          "تعديل رقم الهاتف"
        )}
      </button>
    </form>
  );
};

export default UpdatePhoneForm;
