"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingBag, X } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Início", href: "/" },
        { name: "Cardápio", href: "/cardapio" },
        { name: "Reservas", href: "/reservas" },
        { name: "Fidelização", href: "/fidelidade" },
        { name: "Sobre Nós", href: "/sobre" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    <span className="text-brand">KENDIS</span>
                    <span className="text-gray-800">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-brand"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-gray-800 hover:text-brand">
                        <ShoppingBag className="h-5 w-5" />
                    </Button>
                    <Button className="bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/20">
                        Pedir Agora
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-gray-800 hover:text-brand"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t animate-in slide-in-from-top-2">
                    <nav className="flex flex-col p-4 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-brand rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col gap-2">
                            <Button className="w-full bg-brand hover:bg-brand-dark shadow-lg shadow-brand/20">
                                Pedir Online
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
