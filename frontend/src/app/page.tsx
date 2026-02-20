"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import MenuSection from "@/components/menu/MenuSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased font-sans overflow-x-hidden selection:bg-brand selection:text-white">
      <Navbar />
      <Hero />
      <MenuSection />
    </main>
  );
}
