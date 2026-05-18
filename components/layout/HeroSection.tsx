import Image from "next/image";
import ButtonHeader from "../ui/ButtonHeader";
import SearchCraftsmenHome from "../ui/SearchCraftsmenHome";
import CustomContainer from "../ui/CustomContainer";

const HeroSection = () => {
  return (
    <section className="min-h-dvh lg:min-h-[calc(100vh-100px)] relative py-12 lg:py-20 flex items-center justify-center">
      {/* Background Wrapper */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <Image
          src="/imgs/hero.png"
          alt="hero"
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <CustomContainer>
        <div className="relative z-30 w-full flex flex-col items-center justify-center gap-14 text-center py-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-black leading-[1.1] tracking-tight drop-shadow-2xl">
              أول منصة عربية تربطك بأفضل <br className="hidden md:block" />
              <span className="text-primary">الصنايعية</span> لتنفيذ أعمالك
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 font-bold drop-shadow-lg">
               بكل ثقة وسهولة وفي أسرع وقت
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="w-full max-w-5xl">
             <SearchCraftsmenHome />
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};
export default HeroSection;
