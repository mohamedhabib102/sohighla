"use client";
import Image from "next/image";
import SearchCraftsmenHome from "../ui/SearchCraftsmenHome";
import CustomContainer from "../ui/CustomContainer";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-dvh lg:min-h-[calc(100vh-100px)] relative py-12 lg:py-20 flex items-center justify-center">
      {/* Background Wrapper */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src="/imgs/hero.png"
            alt="hero"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <CustomContainer>
        <div className="relative z-30 w-full flex flex-col items-center justify-center gap-14 text-center py-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-black leading-[1.1] tracking-tight drop-shadow-2xl">
              أول منصة عربية تربطك بأفضل <br className="hidden md:block" />
              <span className="text-primary">الصنايعية</span> لتنفيذ أعمالك
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-3xl text-gray-200 font-bold drop-shadow-lg"
            >
               بكل ثقة وسهولة وفي أسرع وقت
            </motion.p>
          </motion.div>

          {/* Search Bar Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
             <SearchCraftsmenHome />
          </motion.div>
        </div>
      </CustomContainer>
    </section>
  );
};
export default HeroSection;
