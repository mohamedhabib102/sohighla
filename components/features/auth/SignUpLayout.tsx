import Image from "next/image";
import FormSignUp from "./FormSignUp";
import DescriptionSignUp from "@/components/ui/DescriptionSignUp";

const SignUpLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse lg:h-screen w-full overflow-x-hidden">
      {/* Form Section (Scrollable on desktop if content exceeds screen height) */}
      <div className="w-full lg:w-1/2 lg:h-full lg:overflow-y-auto bg-white">
        {/* Mobile Description: Shown only on mobile at the top */}
        {/* Mobile Description: Full-width background handled by the component */}
        <div className="lg:hidden w-full">
          <DescriptionSignUp />
        </div>
        
        {/* Form Container: Centered and capped in width for better readability */}
        <div className="w-full">
          <FormSignUp />
        </div>
      </div>

      {/* Image Section (Fixed/Sticky on desktop) */}
      <div className="hidden lg:block lg:w-1/2  lg:h-full sticky top-0">
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-[#041627] via-[#041627]/30 to-transparent z-10"></div>
        <Image
          src="/imgs/sign-Up.png.jpg"
          fill
          alt="sign up image"
          className="object-cover"
          priority
        />
        
        {/* Description: Positioned at the bottom-right on desktop */}
        <div className="absolute bottom-16 left-0 p-4 z-20 flex justify-start
        bg-[#F59E0B]/15 w-full">
          <DescriptionSignUp className="max-w-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default SignUpLayout;

