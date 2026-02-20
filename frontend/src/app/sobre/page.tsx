"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Mail, Award, Users, Heart } from "lucide-react";

export default function SobrePage() {
    return (
        <main className="min-h-screen bg-background text-foreground antialiased font-sans overflow-x-hidden selection:bg-brand selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-brand/5 via-white to-accent/5 dark:from-brand/10 dark:via-zinc-900 dark:to-accent/10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
                        <span className="text-brand font-semibold text-sm tracking-wide uppercase">Conheça-nos</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                            Sobre a <span className="text-brand">Kendis</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            Uma história de sabor, dedicação e paixão por criar experiências memoráveis.
                        </p>
                    </div>
                </div>
            </section>

            {/* Nossa História */}
            <section className="py-20 bg-white dark:bg-zinc-900">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-brand font-semibold text-sm tracking-uppercase">Nossa História</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                Mais do que Gelados, <br />
                                <span className="text-brand-light">Criamos Momentos.</span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Na Kendis, cada sabor é uma viagem e cada hambúrguer, uma obra de arte.
                                Nascemos com a missão de transformar o simples ato de comer em uma experiência memorável.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Localizada no coração da cidade, a Geladaria & Hamburgeria Kendis tornou-se um ponto de encontro
                                para quem valoriza qualidade, sabor autêntico e um atendimento caloroso.
                            </p>
                            <ul className="space-y-3 pt-4">
                                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                                    <div className="w-2 h-2 rounded-full bg-brand" />
                                    Ingredientes 100% Frescos
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                                    <div className="w-2 h-2 rounded-full bg-brand" />
                                    Receitas Exclusivas
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                                    <div className="w-2 h-2 rounded-full bg-brand" />
                                    Ambiente Acolhedor
                                </li>
                            </ul>
                        </div>
                        <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/local-fisico.jpg"
                                alt="Fachada da Geladaria Kendis"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="py-20 bg-gray-50 dark:bg-stone-900">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Nossos Valores
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Os pilares que nos guiam todos os dias
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Valor 1 */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-white/10 group">
                            <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand group-hover:scale-110 transition-all">
                                <Award className="w-7 h-7 text-brand group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Qualidade Premium</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Selecionamos rigorosamente cada ingrediente para garantir o melhor sabor e frescor em todos os nossos produtos.
                            </p>
                        </div>

                        {/* Valor 2 */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-white/10 group">
                            <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand group-hover:scale-110 transition-all">
                                <Users className="w-7 h-7 text-brand group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Atendimento Familiar</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Tratamos cada cliente como parte da família Kendis, oferecendo um serviço caloroso e personalizado.
                            </p>
                        </div>

                        {/* Valor 3 */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-white/10 group">
                            <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand group-hover:scale-110 transition-all">
                                <Heart className="w-7 h-7 text-brand group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Paixão pelo que Fazemos</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Cada gelado, cada hambúrguer é feito com dedicação e amor pela arte culinária.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Localização e Contacto */}
            <section className="py-20 bg-white dark:bg-zinc-900">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Informações de Contacto */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                    Visite-nos
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    Estamos à sua espera para proporcionar momentos deliciosos!
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Localização */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Localização</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Rua Principal, Luanda<br />
                                            Angola
                                        </p>
                                    </div>
                                </div>

                                {/* Horário */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Horário de Funcionamento</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Segunda a Sexta: 10h - 22h<br />
                                            Sábado e Domingo: 12h - 23h
                                        </p>
                                    </div>
                                </div>

                                {/* Telefone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Telefone</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            +244 XXX XXX XXX
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            contato@kendis.ao
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button size="lg" className="mt-6">
                                Ver no Mapa
                            </Button>
                        </div>

                        {/* Mapa Placeholder */}
                        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                    <MapPin className="w-16 h-16 mx-auto mb-4 text-brand" />
                                    <p className="text-lg">Mapa será integrado aqui</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-brand to-brand-dark text-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Pronto para uma Experiência Deliciosa?
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Venha conhecer nossos sabores únicos e ambiente acolhedor. A Kendis espera por si!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="bg-white text-brand hover:bg-gray-100">
                            Ver Cardápio
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand">
                            Fazer Reserva
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
