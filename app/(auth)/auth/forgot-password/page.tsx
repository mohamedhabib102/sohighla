import ForgotPasswordForm from "@/components/features/auth/ForgotPasswordForm";

export const metadata = {
  title: "نسيت كلمة المرور | شُغلَة",
  description: "استعد كلمة المرور الخاصة بك من خلال البريد الإلكتروني",
};

const ForgotPasswordPage = () => {
  return (
    <main className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden bg-linear-to-tr from-slate-100 via-white to-orange-50/30">
      
      {/* Ambient background glows */}
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-orange-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] pointer-events-none" />

      <div className="relative z-10 w-full flex justify-center">
        <ForgotPasswordForm />
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
