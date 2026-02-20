"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/menu/ProductCard";
import { products, categories } from "@/data/products";
import { Loader2 } from "lucide-react";

// Import dinâmico do Three.js para evitar problemas de SSR
const ThreeBackground = dynamic(() => import("@/components/three/ThreeBackground"), {
    ssr: false,
});

// Registrar plugin do GSAP
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CardapioPage() {
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);

    // Pré-loader
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Componente Tilt Card 3D
    function TiltCard({ children }: { children: React.ReactNode }) {
        const cardRef = useRef<HTMLDivElement>(null);
        const glowRef = useRef<HTMLDivElement>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current || !glowRef.current) return;

            const card = cardRef.current;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10; // Max 10 deg

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000,
                transformOrigin: "center"
            });

            // Efeito de brilho (glare)
            gsap.to(glowRef.current, {
                background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`,
                opacity: 1,
                duration: 0.3
            });
        };

        const handleMouseLeave = () => {
            if (!cardRef.current || !glowRef.current) return;

            gsap.to(cardRef.current, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            });

            gsap.to(glowRef.current, {
                opacity: 0,
                duration: 0.5
            });
        };

        return (
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative transform-style-3d will-change-transform h-full"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div ref={glowRef} className="absolute inset-0 z-50 pointer-events-none rounded-3xl opacity-0 transition-opacity duration-300 mix-blend-overlay"></div>
                {children}
            </div>
        );
    }

    // Animações Avançadas GSAP
    useEffect(() => {
        if (loading) return;

        // 1. Título Principal (Stagger Reveal)
        if (titleRef.current) {
            gsap.fromTo(titleRef.current.children,
                { opacity: 0, y: 100, rotateX: 45 },
                { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }
            );
        }

        // 2. Menu de Categorias (Elastic Stagger)
        if (categoriesRef.current) {
            gsap.fromTo(categoriesRef.current.children,
                { opacity: 0, scale: 0, y: 50 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "back.out(2)", delay: 0.5 }
            );
        }

        // 3. Animações Específicas por Categoria
        const animarCategoria = (id: string) => {
            const section = document.getElementById(`cat-${id}`);
            if (!section) return;

            const title = section.querySelector(".category-title");
            const line = section.querySelector(".category-line");
            const cards = section.querySelectorAll(".top-card-container");

            // ScrollTrigger comum
            const triggerConfig = {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            };

            // Animação do Título da Categoria
            gsap.fromTo(title,
                { opacity: 0, x: -50 },
                { scrollTrigger: triggerConfig, opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
            );

            gsap.fromTo(line,
                { scaleX: 0, transformOrigin: "left" },
                { scrollTrigger: triggerConfig, scaleX: 1, duration: 1, delay: 0.2, ease: "expo.out" }
            );

            // Animações Distintas para os Cards
            switch (id) {
                case 'gelados': // Fade + Motion Suave (Cremoso)
                    gsap.fromTo(cards,
                        { opacity: 0, y: 100, scale: 0.9 },
                        {
                            scrollTrigger: triggerConfig,
                            opacity: 1, y: 0, scale: 1,
                            duration: 1, stagger: 0.1,
                            ease: "circ.out"
                        }
                    );
                    break;

                case 'bebidas': // Liquid Rise (Clip-path de baixo para cima)
                    // Nota: Clip-path pode ser pesado, usando scaleY como alternativa performática para "encher"
                    gsap.fromTo(cards,
                        { opacity: 0, clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
                        {
                            scrollTrigger: triggerConfig,
                            opacity: 1, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            duration: 1.2, stagger: 0.15,
                            ease: "power2.inOut"
                        }
                    );
                    break;

                case 'bolos-salgados': // 3D Flip (Elegante)
                    gsap.fromTo(cards,
                        { opacity: 0, rotationY: 90, z: -100 },
                        {
                            scrollTrigger: triggerConfig,
                            opacity: 1, rotationY: 0, z: 0,
                            duration: 1.2, stagger: 0.1,
                            ease: "back.out(1.2)"
                        }
                    );
                    break;

                case 'hamburgueria': // Elastic Pop (Impacto)
                    gsap.fromTo(cards,
                        { opacity: 0, scale: 0, rotation: -15 },
                        {
                            scrollTrigger: triggerConfig,
                            opacity: 1, scale: 1, rotation: 0,
                            duration: 0.9, stagger: 0.1,
                            ease: "elastic.out(1, 0.5)"
                        }
                    );
                    break;

                default: // Fallback
                    gsap.fromTo(cards,
                        { opacity: 0, y: 50 },
                        { scrollTrigger: triggerConfig, opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
                    );
            }
        };

        // Aplicar animações para cada categoria ativa ou todas
        if (activeCategory) {
            // Pequeno timeout para garantir que o DOM atualizou
            setTimeout(() => animarCategoria(activeCategory), 100);
        } else {
            categories.forEach(cat => setTimeout(() => animarCategoria(cat.id), 100));
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [loading, activeCategory]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-brand via-brand-dark to-accent flex items-center justify-center z-50">
                <div className="text-center space-y-6">
                    {/* Logo/Texto Animado */}
                    <div className="relative">
                        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-pulse">
                            KENDIS
                        </h1>
                        <p className="text-white/80 text-xl font-light tracking-widest uppercase">Carregando Sabores...</p>
                    </div>

                    {/* Custom Loader SVG */}
                    <div className="flex justify-center">
                        <svg className="w-16 h-16 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>

                    {/* Progress bar */}
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mt-4">
                        <div className="h-full bg-white rounded-full animate-[width_2s_ease-in-out_infinite] w-full origin-left"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50/80 dark:bg-stone-900/80 overflow-x-hidden relative">
            <Navbar />

            <div className="pt-28 pb-16 relative z-10">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Título com animação */}
                    <div ref={titleRef} className="text-center mb-20 perspective-1000">
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter drop-shadow-2xl">
                            NOSSO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">CARDÁPIO</span>
                        </h1>
                        <div className="h-1 w-24 bg-brand mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-800 dark:text-gray-200 text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
                            Uma seleção exclusiva de sabores artesanais preparados para despertar seus sentidos.
                        </p>
                    </div>

                    {/* Navegação por Categorias */}
                    <div ref={categoriesRef} className="flex flex-wrap justify-center gap-4 mb-24 sticky top-20 z-40 py-4 backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-2xl border border-white/20 shadow-lg">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`
                group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border
                ${activeCategory === null
                                    ? "bg-gray-900 text-white border-gray-900 shadow-xl scale-105"
                                    : "bg-white/80 dark:bg-zinc-800/80 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-brand hover:text-brand"}
              `}
                        >
                            <span>🍴</span>
                            Todos
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`
                  group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border
                  ${activeCategory === cat.id
                                        ? "bg-brand text-white border-brand shadow-xl shadow-brand/30 scale-105"
                                        : "bg-white/80 dark:bg-zinc-800/90 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-brand hover:text-brand"}
                `}
                            >
                                <span className="text-xl group-hover:rotate-12 transition-transform duration-300">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Produtos por Categoria */}
                    <div className="space-y-32">
                        {(activeCategory ? [activeCategory] : categories.map(c => c.id)).map((categoryId) => {
                            const categoryProducts = products.filter(p => p.category === categoryId);
                            const category = categories.find(c => c.id === categoryId);

                            if (categoryProducts.length === 0) return null;

                            return (
                                <div key={categoryId} id={`cat-${categoryId}`} className="relative">
                                    {/* Cabeçalho da Categoria */}
                                    <div className="flex flex-col md:flex-row items-end gap-6 mb-12 category-header">
                                        <div className="category-title relative z-10">
                                            <div className="text-8xl md:text-9xl absolute -top-10 -left-10 opacity-5 dark:opacity-10 select-none font-black text-gray-900 dark:text-white pointer-events-none">
                                                {category?.label.charAt(0)}
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                                                <span className="text-5xl filter drop-shadow-lg">{category?.icon}</span>
                                                {category?.label}
                                            </h2>
                                        </div>
                                        <div className="category-line flex-1 h-[2px] bg-gradient-to-r from-gray-200 via-brand to-transparent dark:from-gray-700 rounded-full mb-4"></div>
                                    </div>

                                    {/* Grid de Produtos */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                                        {categoryProducts.map((product) => (
                                            <div key={product.id} className="top-card-container transform-gpu">
                                                <TiltCard>
                                                    <ProductCard product={product} />
                                                </TiltCard>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mensagem se não houver produtos */}
                    {products.filter(p => !activeCategory || p.category === activeCategory).length === 0 && (
                        <div className="text-center py-20 flex flex-col items-center justify-center opacity-50">
                            <span className="text-6xl mb-4">🤷‍♂️</span>
                            <p className="text-xl font-light">Nenhum produto encontrado nesta categoria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Three.js Background */}
            <ThreeBackground />

            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,69,0,0.03),transparent_70%)]"></div>
            </div>
        </main>
    );
}
