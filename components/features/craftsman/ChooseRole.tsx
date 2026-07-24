"use client";
import Button from "@/components/ui/ButtonCustom";
import { useSignUp } from "@/hooks/auth/useAuth";
import { useAuthStore } from "@/store/auth-store";
import { signUpType } from "@/types/api";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import toast from "react-hot-toast";
import { FaUser, FaTools, FaCheck, FaShieldAlt } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";


const ChooseRoleContent = () => {
  const [choose, setChoose] = useState("")
    const {mutate, isLoading} = useSignUp()
    const [user, setUser] = useState<signUpType | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const {login} =  useAuthStore();
    const {data:session} = useSession();

    const mode = searchParams.get("mode");


    
  
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
      const res = await mutate(userData)
      localStorage.removeItem("user");
      const data = {
        personID: res?.personID,
        firstName: res?.firstName,
        lastName: res?.lastName,
        email: res?.email,
        role: res?.role,
        isVerifyEmail: res?.isVerifyEmail,
        accessToken: res?.accessToken,
      }
      login(data)
      if (data.role === "admin") {
        router.push("/control");
      } else if (data.role === "craftsman") {
        router.push("/dashboard-craftsman");
      } else if (data.role === "client" || data.role === "customer") {
        router.push("/dashboard-client");
      } else {
        router.push("/");
      }
    }


    const handerlPlatform = async () => {
      if (!choose) {
        toast.error("الرجاء اختيار نوع الحساب ")
        return;
      }
      console.log(session?.id_token, choose);
      const staticUser = {
        personID: 10,
        firstName: "Ahmed",
        lastName: "Ali",
        email: "[EMAIL_ADDRESS]",
        role: choose,
        isVerifyEmail: false,
      }

      login(staticUser)
      if (staticUser.role === "admin") {
        router.push("/control");
      } else if (staticUser.role === "craftsman") {
        router.push("/dashboard-craftsman");
      } else if (staticUser.role === "client" || staticUser.role === "customer") {
        router.push("/dashboard-client");
      } else {
        router.push("/");
      }
    }



    const submitHandler = async () => {
      if (mode === "register") {
        await handlerSignUp();
      }else{
        await handerlPlatform();
      }
    }


    useEffect(() => {
      const data = localStorage.getItem("user")
      if(data){
        setUser(JSON.parse(data))
      }
    }, [])
    return (
    <div className="w-full max-w-5xl mx-auto px-4 rtl" dir="rtl">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-secondary transition-colors text-sm font-medium mb-10 group"
      >
        <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
          <HiArrowLeft className="rotate-180 text-base" />
        </span>
        <span>العودة للخلف</span>
      </button>

      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-16 relative">
        <div className="flex items-center w-full max-w-2xl relative">
          {/* Step 1: Sign Up (Completed) */}
          <div className="flex flex-col items-center z-10 relative">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white border-4 border-white">
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
        <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
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
          <h3 className="text-2xl font-bold text-secondary mb-4">عميل</h3>
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
          <h3 className="text-2xl font-bold text-secondary mb-4">
            حرفي / فني
          </h3>
          <p className="text-secondary/50 leading-relaxed mb-8 h-20">
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
          onClick={submitHandler}
          isLoading={isLoading}
        />
    

    </div>
  );
};

const ChooseRole = () => {
  return (
    <Suspense fallback={<div className="flex justify-center p-20 text-gray-500">جاري التحميل...</div>}>
      <ChooseRoleContent />
    </Suspense>
  );
};

export default ChooseRole;
