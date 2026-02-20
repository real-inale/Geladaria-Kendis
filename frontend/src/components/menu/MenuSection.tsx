"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { products, categories, Category } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Coffee, IceCream, Pizza, CakeSlice } from "lucide-react"; // Using generic icons for now

export default function MenuSection() {
    const [activeCategory, setActiveCategory] = useState<Category>("gelados");

    const filteredProducts = products.filter(
        (product) => product.category === activeCategory
    );

    const getIcon = (category: string) => {
        switch (category) {
            case "gelados": return <IceCream className="w-5 h-5" />;
            case "hamburgueria": return <Pizza className="w-5 h-5" />; // Should be burger, but using available icon
            case "bebidas": return <Coffee className="w-5 h-5" />;
            case "bolos-salgados": return <CakeSlice className="w-5 h-5" />;
            default: return null;
        }
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-stone-900 overflow-hidden" id="cardapio">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-brand font-semibold text-sm tracking-widest uppercase">
                        Nosso Menu
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        Descubra Nossos Sabores
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Escolha sua categoria favorita e surpreenda seu paladar.
                    </p>
                </div>

                {/* Categories Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id as Category)}
                            className={`
                group flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border
                ${activeCategory === cat.id
                                    ? "bg-brand text-white border-brand shadow-lg shadow-brand/20 scale-105"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-300"}
              `}
                        >
                            {/* Using lucide icons instead of text emoji if possible, for now keeping label */}
                            <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        Nenhum produto encontrado nesta categoria.
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="rounded-full px-10 border-gray-300 text-gray-700 hover:border-brand hover:text-brand">
                        Ver Cardápio Completo
                    </Button>
                </div>
            </div>
        </section>
    );
}
