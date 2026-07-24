"use client";
import Image from "next/image";
import FormsSignIn from "./FormsSignIn";
import DescriptionSignUp from "@/components/ui/DescriptionSignUp";
import { motion } from "framer-motion";

const SignInLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse lg:h-screen w-full overflow-x-hidden">
      {/* Form Section */}
      <motion.div 
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-1/2 lg:h-full lg:overflow-y-auto bg-white"
      >
        {/* Mobile Description */}
        <div className="lg:hidden w-full">
          <DescriptionSignUp />
        </div>
        
        {/* Form Container */}
        <div className="w-full">
          <FormsSignIn />
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:block lg:w-1/2 lg:h-full sticky top-0"
      >
        <div className="absolute inset-0 bg-linear-to-t from-[#041627] via-[#041627]/30 to-transparent z-10"></div>
        <Image
          src="/imgs/sign-Up.png.jpg"
          fill
          alt="sign in image"
          className="object-cover"
          priority
        />
        
        <div className="absolute bottom-16 left-0 p-4 z-20 flex justify-start bg-primary/15 w-full">
          <DescriptionSignUp className="max-w-[500px]" />
        </div>
      </motion.div>
    </div>
  );
};

export default SignInLayout;
