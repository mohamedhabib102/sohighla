"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { isValidPassword } from "@/utils/validtions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdPerson } from "react-icons/io";
import { IoLockClosed } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const FormSignUp = () => {
  const router = useRouter()

  const handlerSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      FirstName: e.currentTarget.fullName.value.trim().split(" ")[0],
      LastName: e.currentTarget.fullName.value.trim().split(" ").slice(1).join(" "),
      Email: e.currentTarget.email.value.trim(),
      Password: e.currentTarget.password.value,
    }

    if (data.FirstName === "" || data.LastName === "" || data.Email === "" || data.Password === "") {
      toast.error("الرجاء إدخال جميع البيانات");
      return;
    };

    if (!isValidPassword(data.Password)) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير ورقم ورمز خاص (@$!%*?&)");
      return;
    }
    localStorage.setItem("user", JSON.stringify(data));
    router.push(`/auth/choose-role?mode=register`)
  }
  return (
    <div className="w-full max-w-[600px] mx-auto p-6 md:p-14 flex flex-col justify-center min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#0F172A] mb-2">
            
            إنشاء حساب جديد
          </h1>
          <p className="text-[#44474C] text-lg">
            
            إنضنم إلى مجتمع شغلة في إنجاز أعمالك اليوم.
          </p>
        </div>
        <div>
          <form
          onSubmit={handlerSignUp}
          >
            <Input
              label=" الأسم كامل "
              placeholder=" أدخل أسمك ثلاثي "
              name="fullName"
              id="fName"
              type="text"
              iconBase={IoMdPerson}
            />

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

            <div className="select-none lg:text-lg text-sm">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="ml-2"
                required
              />
              <label htmlFor="terms">
                أوافق على
                <Link href="/terms" className="text-[#EA580C] font-semibold">
                  {" "}
                  شروط الخدمة{" "}
                </Link>
                و
                <Link href="/policy" className="text-[#EA580C] font-semibold">
                  {" "}
                  سياسة الخصوصية{" "}
                </Link>
              </label>
            </div>

            <Button
              title=" الخطوة التالية "
              type="submit"
            />

            <p className="text-center text-gray-600 mt-6 rtl">
              لديك حساب بالفعل؟{" "}
              <Link href="/auth/sign-in" className="text-[#EA580C] font-semibold">
                تسجيل الدخول
              </Link>
            </p>
          </form>
        </div>
    </div>
  );
};

export default FormSignUp;
