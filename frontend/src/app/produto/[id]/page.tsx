"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Heart, Share2, Star, Minus, Plus, Truck, Clock, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/data/products";
import OrderModal from "@/components/menu/OrderModal";

export default function ProductDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simular carregamento e busca do produto
        if (params.id) {
            const foundProduct = products.find(p => p.id === params.id);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                // Redirecionar se não encontrar (ou mostrar erro)
                // router.push('/cardapio');
            }
            setLoading(false);
        }
    }, [params.id, router]);

    // Animações de entrada
    useEffect(() => {
        if (!loading && product) {
            const tl = gsap.timeline();

            tl.from(containerRef.current, { opacity: 0, duration: 0.5 })
                .from(imageRef.current, {
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.2")
                .from(contentRef.current?.children || [], {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.6");
        }
    }, [loading, product]);

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const getPlaceholderImage = (category: string) => {
        const placeholders = {
            'gelados': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23FF6347"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E🍦%3C/text%3E%3C/svg%3E',
            'bebidas': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%234A90E2"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E🥤%3C/text%3E%3C/svg%3E',
            'bolos-salgados': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23F5A623"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E🥨%3C/text%3E%3C/svg%3E',
            'hamburgueria': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23FF4500"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E🍔%3C/text%3E%3C/svg%3E',
        };
        return placeholders[category as keyof typeof placeholders] || placeholders.gelados;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 bg-brand/20 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Produto não encontrado 😕</h2>
                <Link href="/cardapio">
                    <Button variant="outline">Voltar ao Cardápio</Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-stone-900 overflow-x-hidden selection:bg-brand selection:text-white">
            <Navbar />

            <div ref={containerRef} className="pt-28 pb-16 container mx-auto px-4 md:px-6">
                {/* Breadcrumb / Back Button */}
                <div className="mb-8">
                    <Link
                        href="/cardapio"
                        className="inline-flex items-center text-gray-500 hover:text-brand transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Voltar ao Cardápio</span>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Product Image Section */}
                    <div ref={imageRef} className="relative group">
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-800 border-2 border-white dark:border-zinc-700">
                            {/* Background Decorative Blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-brand/10 to-accent/10 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

                            <Image
                                src={imageError ? getPlaceholderImage(product.category) : product.image}
                                alt={product.name}
                                fill
                                className="object-cover z-10 transition-transform duration-700 group-hover:scale-110"
                                priority
                                onError={() => setImageError(true)}
                            />

                            {/* Badges Overlay */}
                            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                {product.popular && (
                                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" /> Popular
                                    </span>
                                )}
                                <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-gray-100 dark:border-white/10 uppercase tracking-wide">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails (Simulado) */}
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${i === 1 ? 'border-brand ring-2 ring-brand/20' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                    <div className="w-full h-full bg-gray-200 dark:bg-zinc-800 relative">
                                        <Image
                                            src={imageError ? getPlaceholderImage(product.category) : product.image}
                                            alt={`Thumbnail ${i}`}
                                            fill
                                            className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div ref={contentRef} className="flex flex-col h-full justify-center lg:pl-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-brand font-bold tracking-wider text-sm uppercase">Kendis Signature</div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 hover:text-red-500 transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 hover:text-blue-500 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating (Simulado) */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current opacity-50" />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">(4.8 de 120 avaliações)</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-brand/30 pl-4">
                            {product.description}
                        </p>

                        <div className="flex items-end gap-4 mb-8">
                            <div className="text-5xl font-bold text-brand">
                                {product.price.toLocaleString("pt-AO")}
                                <span className="text-2xl text-gray-500 dark:text-gray-400 font-normal ml-1">Kz</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 mb-8">
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Quantity */}
                                <div className="flex items-center justify-between sm:justify-start gap-4">
                                    <span className="text-sm font-bold text-gray-500 uppercase">Qtd:</span>
                                    <div className="flex items-center bg-gray-50 dark:bg-zinc-900 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-zinc-800 shadow-sm transition-all text-gray-600 dark:text-gray-400"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-bold text-lg text-gray-900 dark:text-white">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-zinc-800 shadow-sm transition-all text-gray-600 dark:text-gray-400"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Add Button */}
                                <div className="flex-1">
                                    <Button
                                        onClick={() => setIsOrderModalOpen(true)}
                                        className="w-full h-12 text-lg font-bold bg-brand hover:bg-brand-dark shadow-xl shadow-brand/20 rounded-xl transition-all hover:scale-[1.02]"
                                    >
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Fazer Encomenda
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Features Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300">
                                <Truck className="w-6 h-6" />
                                <div>
                                    <div className="font-bold text-sm">Entrega Rápida</div>
                                    <div className="text-xs opacity-80">Em Luanda e arredores</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300">
                                <ShieldCheck className="w-6 h-6" />
                                <div>
                                    <div className="font-bold text-sm">Qualidade Garantida</div>
                                    <div className="text-xs opacity-80">Ingredientes frescos</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Order Modal Injection */}
            <OrderModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                product={product}
                quantity={quantity}
            />
        </main>
    );
}
