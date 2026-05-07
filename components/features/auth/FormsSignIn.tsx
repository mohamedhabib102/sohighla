"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/Input";
import ButtonPlatform from "@/components/ui/LoginPlatform";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoLockClosed } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useSignIn } from "@/hooks/auth/useAuth";
import { Controller, useForm } from "react-hook-form";
import { signInType } from "@/types/api";
import toast from "react-hot-toast";
import { isValidPassword } from "@/utils/validtions";


const FormsSignIn = () => {

  const { mutate: signInMutate, isLoading } = useSignIn();
     
  
     const handlerSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = {
        Email: e.currentTarget.email.value.trim(),
        PasswordHash: e.currentTarget.password.value,
      }

      if (data.Email === "" || data.PasswordHash === "") {
        toast.error("الرجاء إدخال جميع البيانات");
        return;
      };
      const res = await signInMutate(data);
      console.log(res);
     }
  
  return (
    <div className="w-full max-w-[600px] mx-auto p-6 md:p-14 flex flex-col justify-center min-h-screen">

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#0F172A] mb-2 rtl text-right">
          تسجيل الدخول
        </h1>
        <p className="text-[#44474C] text-lg rtl text-right">
          مرحباً بك مجدداً! قم بتسجيل الدخول لمتابعة أعمالك.
        </p>
      </div>

      <form 
      onSubmit={handlerSignIn}
      className="space-y-4">
        <Input
          label=" البريد الإلكتروني "
          placeholder="example@example.com"
          name="email"
          id="email"
          type="email"
          iconBase={MdEmail}
        />

        <Input
          label=" كلمة المرور "
          placeholder="كلمة المرور"
          name="password"
          id="password"
          type="password"
          iconBase={IoLockClosed}
          iconPassword={true}
        />

        <div className="flex justify-between items-center rtl">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className="text-sm text-gray-600">تذكرني</label>
          </div>
          <Link href="/forgot-password" className="text-[#EA580C] text-sm font-semibold">
            نسيت كلمة المرور؟
          </Link>
        </div>

        <Button 
        title=" تسجيل الدخول " 
        type="submit" 
        isLoading={isLoading}
        />

        <div className="flex items-center gap-3 w-full my-6">
          <div className="w-full h-0.5 bg-gray-200"></div>
          <span className="text-gray-400 whitespace-nowrap text-sm">أو أكمل عبر</span>
          <div className="w-full h-0.5 bg-gray-200"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <ButtonPlatform
            textButton="متابعة مع جوجل"
            Icon={FcGoogle}
            provider="google"
          />
          <ButtonPlatform
            textButton="متابعة مع فيسبوك"
            Icon={BsFacebook}
            provider="facebook"
          />
        </div>

        <p className="text-center text-gray-600 mt-8 rtl">
          ليس لديك حساب؟{" "}
          <Link href="/auth/sign-up" className="text-[#EA580C] font-semibold">
            إنشاء حساب جديد
          </Link>
        </p>
      </form>
    </div>
  );
};

export default FormsSignIn;
