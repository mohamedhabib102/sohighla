"use client";
import { FiLoader } from "react-icons/fi";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-20 space-y-4">
      <div className="relative">
        <FiLoader className="text-primary animate-spin" size={50} />
        <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full"></div>
      </div>
      <div className="text-center">
        <p className="text-secondary font-bold text-lg font-lemonada animate-pulse">جاري تحميل البيانات...</p>
        <p className="text-gray-400 text-sm">يرجى الانتظار قليلاً</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
