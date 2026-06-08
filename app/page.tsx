"use client";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/HeroSection";
import Features from "@/components/layout/Features";
import ServicesAndCraftsmen from "@/components/layout/ServicesAndCraftsmen";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log("Session data:", session);
  return (
    <section>
      <Header/>
      <HeroSection/>
      <Features/>
      <ServicesAndCraftsmen />
    </section>
  );
}
