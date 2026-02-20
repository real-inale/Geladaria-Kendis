"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);

    // Placeholder baseado na categoria
    const getPlaceholderImage = (category: string) => {
        const placeholders = {
            'gelados': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23FF6347"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E🍦%3C/text%3E%3C/svg%3E',
            'bebidas': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%234A90E2"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E🥤%3C/text%3E%3C/svg%3E',
            'bolos-salgados': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23F5A623"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E🥨%3C/text%3E%3C/svg%3E',
            'hamburgueria': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23FF4500"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E🍔%3C/text%3E%3C/svg%3E',
        };
        return placeholders[category as keyof typeof placeholders] || placeholders.gelados;
    };

    return (
        <Link href={`/produto/${product.id}`} className="block h-full group relative bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/10">
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <Image
                    src={imageError ? getPlaceholderImage(product.category) : product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImageError(true)}
                />
                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-400 hover:text-red-500 shadow-sm transition-colors">
                    <Heart className="w-5 h-5" />
                </button>
                {/* Popular Badge */}
                {product.popular && (
                    <div className="absolute top-3 left-3 bg-accent text-gray-900 font-bold px-3 py-1 rounded-full shadow-sm text-xs">
                        ⭐ Popular
                    </div>
                )}
                {/* Floating Price Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-brand font-bold px-3 py-1.5 rounded-full shadow-sm text-sm">
                    {product.price.toLocaleString("pt-AO")} Kz
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-brand transition-colors">
                        {product.name}
                    </h3>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 h-10">
                    {product.description}
                </p>

                <div className="mt-2 flex items-center justify-between">
                    <Button
                        size="sm"
                        className="w-full bg-gray-900 hover:bg-brand text-white rounded-xl shadow-none group-hover:shadow-lg transition-all"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar
                    </Button>
                </div>
            </div>
        </Link>
    );
}
