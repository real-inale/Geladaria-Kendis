"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand via-brand-light to-orange-400">
            {/* Background Pattern / Shapes */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600 rounded-full blur-[120px] opacity-30"></div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6"
                >
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-medium">Melhor Geladaria de Luanda</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
                >
                    O Sabor Que Te <br className="hidden md:block" />
                    <span className="text-accent drop-shadow-sm">Faz Sorrir</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
                >
                    Experimente nossos gelados artesanais cremosos e hambúrgueres gourmet feitos com ingredientes frescos e muito amor.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" className="bg-white text-brand hover:bg-gray-100 w-full sm:w-auto shadow-xl">
                        Ver Cardápio
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-brand hover:bg-white/10 hover:text-white w-full sm:w-auto font-semibold">
                        Reservar Mesa
                    </Button>
                </motion.div>
            </div>

            {/* Floating Elements (Ice Cream / Burger placeholders) */}
            {/* 
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] top-[30%] hidden lg:block"
      >
        <div className="w-64 h-64 bg-white/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center">
            <span className="text-white text-xs">Imagem 1</span>
        </div>
      </motion.div>
      */}
        </section>
    );
}
