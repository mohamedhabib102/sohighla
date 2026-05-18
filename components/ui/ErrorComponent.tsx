"use client";
import { FiAlertCircle } from "react-icons/fi";

interface ErrorComponentProps {
  sectionName?: string;
  message?: string;
}

const ErrorComponent = ({ sectionName, message }: ErrorComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border-2 border-dashed border-gray-100 w-full animate-in fade-in zoom-in duration-500">
      <div className="p-4 bg-red-50 rounded-full text-red-500 mb-4">
        <FiAlertCircle size={32} />
      </div>
      <h3 className="text-lg font-bold text-secondary mb-2">
        {sectionName ? `لا توجد بيانات في قسم ${sectionName}` : "حدث خطأ ما"}
      </h3>
      <p className="text-gray-400 text-sm text-center max-w-xs">
        {message || "يبدو أن هذا القسم لا يحتوي على بيانات حالياً، أو حدث خطأ أثناء جلب المعلومات."}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 text-primary font-bold text-sm hover:underline"
      >
        إعادة المحاولة
      </button>
    </div>
  );
};

export default ErrorComponent;
