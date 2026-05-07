import Image from "next/image";

interface DescriptionSignUpProps {
  className?: string;
}

const DescriptionSignUp = ({ className }: DescriptionSignUpProps) => {
  return (
    <div className={`rtl ${className} w-full relative overflow-hidden`}>
      {/* Mobile Full Background Image (Visible only on mobile) */}
      <div className="lg:hidden absolute inset-0 z-0">
        <Image
          src="/imgs/sign-Up.png.jpg"
          fill
          alt="hero image"
          className="object-cover"
          priority
        />
        {/* Overlay for readability - matching desktop style */}
        <div className="absolute inset-0 bg-[#F59E0B]/15"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-4 text-right p-8 lg:p-0">
        <Image
          src="/imgs/logos.svg"
          width={180}
          height={60}
          alt="logo"
          className="mb-2 object-contain"
        />
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
            جودة الحرفة،
          </h1>
          <h2 className="text-2xl lg:text-4xl font-semibold text-white/90 leading-tight">
            بأيدٍ وطنية محترفة.
          </h2>
        </div>
        <p className="max-w-[480px] text-base lg:text-xl text-white/80 leading-relaxed mt-2 font-medium">
          منصة شغلة تربطك بأفضل الحرفيين والمختصين لإنجاز مهامك المنزلية
          والتجارية بدقة واحترافية عالية.
        </p>
      </div>
    </div>
  );
};

export default DescriptionSignUp;
