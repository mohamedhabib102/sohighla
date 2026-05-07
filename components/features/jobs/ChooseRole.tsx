"use client";


import Button from "@/components/ui/button";
import { useSignUp } from "@/hooks/auth/useAuth";
import { signUpType } from "@/types/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaTools, FaCheck, FaShieldAlt } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";


const ChooseRole = () => {
  const [choose, setChoose] = useState("")
    const {mutate, isLoading} = useSignUp()
    const [user, setUser] = useState<signUpType | null>(null);
    const router = useRouter();
  
    const handlerSignUp = async () => {
      if (!user || !choose) {
        toast.error("الرجاء اختيار نوع الحساب ")
        return;
      }
      const userData: signUpType = {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Password: user.Password,
        Role: choose,
      }
      await mutate(userData)
      localStorage.removeItem("user");
      router.push("/");
    }


    useEffect(() => {
      const data = localStorage.getItem("user")
      if(data){
        setUser(JSON.parse(data))
      }
    }, [])
    return (
    <div className="w-full max-w-5xl mx-auto px-4 rtl" dir="rtl">
      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-16 relative">
        <div className="flex items-center w-full max-w-2xl relative">
          {/* Step 1: Sign Up (Completed) */}
          <div className="flex flex-col items-center z-10 relative">
            <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white border-4 border-white">
              <FaCheck size={16} />
            </div>
            <span className="absolute -bottom-8 text-sm font-medium text-gray-500 whitespace-nowrap">
              إنشاء حساب
            </span>
          </div>

          <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>

          {/* Step 2: Choose Role (Active) */}
          <div className="flex flex-col items-center z-10 relative">
            <div className="w-10 h-10 rounded-full bg-[#EA580C] flex items-center justify-center text-white border-4 border-white shadow-lg">
              <FaTools size={18} />
            </div>
            <span className="absolute -bottom-8 text-sm font-bold text-[#EA580C] whitespace-nowrap">
              نوع الحساب
            </span>
          </div>
        </div>
      </div>


      {/* Main Heading */}
      <div className="text-center mb-12 mt-12">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4">
          اختر نوع الحساب
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          أهلاً بك في شغلة! لكي نتمكن من خدمتك بشكل أفضل، يرجى تحديد كيف تود
          استخدام المنصة.
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">

        {/* Customer Card */}
        <div
          onClick={() => setChoose("customer")}
          className={`${choose === "customer" ? "border-[#EA580C] shadow-2xl -translate-y-2" : "border-gray-100"} group bg-white border-2 rounded-3xl p-10 text-center transition-all duration-300 hover:border-[#EA580C] hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center`}
        >
          <div className="w-24 h-24 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-6 group-hover:bg-[#E0E7FF] transition-colors">
            <FaUser size={40} className="text-[#4338CA]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">عميل</h3>
          <p className="text-gray-500 leading-relaxed mb-8 h-20">
            أبحث عن حرفيين مهرة لإنجاز أعمالي المنزلية ومشاريعي الخاصة بكل سهولة
            وأمان.
          </p>
          <div className="flex items-center gap-2 text-[#EA580C] font-bold text-lg group-hover:gap-4 transition-all">
            <span>اختيار كعميل</span>
            <HiArrowLeft />
          </div>
        </div>

        {/* Craftsman Card */}
        <div
          onClick={() => setChoose("craftsman")}
          className={`${choose === "craftsman" ? "border-[#EA580C] shadow-2xl -translate-y-2" : "border-gray-100"} group bg-white border-2 rounded-3xl p-10 text-center transition-all duration-300 hover:border-[#EA580C] hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center`}
        >
          <div className="w-24 h-24 rounded-full bg-[#FFF7ED] flex items-center justify-center mb-6 group-hover:bg-[#FFEDD5] transition-colors">
            <FaTools size={40} className="text-[#EA580C]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
            حرفي / فني
          </h3>
          <p className="text-gray-500 leading-relaxed mb-8 h-20">
            أمتلك مهارات فنية وأرغب في تقديم خدماتي للعملاء وزيادة دخلي من خلال
            المنصة.
          </p>
          <div className="flex items-center gap-2 text-[#EA580C] font-bold text-lg group-hover:gap-4 transition-all">
            <span>البدء كحرفي</span>
            <HiArrowLeft />
          </div>
        </div>
      </div> 
    
        <Button
          title=" تأكيد الاختيار "
          type="button"
          onClick={handlerSignUp}
          isLoading={isLoading}
        />
    

    </div>
  );
};

export default ChooseRole;
