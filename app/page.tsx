"use client";
import HeroSection from "@/components/layout/HeroSection";
import Features from "@/components/layout/Features";
import ServicesAndCraftsmen from "@/components/layout/ServicesAndCraftsmen";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <section>
      <HeroSection/>
      <Features/>
      <ServicesAndCraftsmen />
    </section>
  );
}
