"use client";

import { motion } from "framer-motion";
import { HiOutlineStar, HiOutlineMapPin, HiOutlineVideoCamera } from "react-icons/hi2";
import CustomContainer from "../ui/CustomContainer";

const features = [
  {
    title: "صنايعية بالقرب منك",
    description: "نوصلك بأفضل الحرفيين المهرة في منطقتك لضمان سرعة الوصول وتوفير وقتك ومجهودك.",
    icon: HiOutlineMapPin,
  },
  {
    title: "تقييمات حقيقية",
    description: "تعتمد منصتنا على تقييمات وتجارب حقيقية من عملاء سابقين، لتختار الصنايعي الأنسب بكل ثقة.",
    icon: HiOutlineStar,
  },
  {
    title: "شاهد أعمالهم بالفيديو",
    description: "يمكنك مشاهدة فيديوهات حقيقية لأعمال الحرفيين السابقة للتأكد من جودة التنفيذ واحترافية الصنايعي.",
    icon: HiOutlineVideoCamera,
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <CustomContainer>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-secondary mb-4"
            >
              لماذا تختار <span className="text-primary">شُغْلَة</span>؟
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-1.5 w-20 bg-linear-main mx-auto rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="h-full bg-white p-8 rounded-3xl border border-gray-200 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.15)] transition-all duration-300 relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-right gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-linear-main flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform duration-300 shrink-0">
                      <feature.icon className="text-3xl" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle bottom line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-linear-main w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default Features;
