import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/HeroSection";
import Features from "@/components/layout/Features";
import ServicesAndCraftsmen from "@/components/layout/ServicesAndCraftsmen";

export default function Home() {
  return (
    <section>
      <Header/>
      <HeroSection/>
      <Features/>
      <ServicesAndCraftsmen />
    </section>
  );
}
