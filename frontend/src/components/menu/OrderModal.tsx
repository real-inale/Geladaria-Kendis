"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Truck, ShoppingBag, X, User, Phone, MapPin, CheckCircle } from "lucide-react";
import { Product } from "@/data/products";

interface OrderModalProps {
    product: Product;
    quantity: number;
    isOpen: boolean;
    onClose: () => void;
}

type OrderType = "delivery" | "pickup" | null;
type Step = "type" | "details" | "success";

export default function OrderModal({ product, quantity, isOpen, onClose }: OrderModalProps) {
    const [step, setStep] = useState<Step>("type");
    const [orderType, setOrderType] = useState<OrderType>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        notes: ""
    });

    if (!isOpen) return null;

    const handleTypeSelect = (type: OrderType) => {
        setOrderType(type);
        setStep("details");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simular envio
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Aqui seria a integração real (API ou WhatsApp Link)
        console.log("Pedido enviado:", { product, quantity, orderType, formData });

        setLoading(false);
        setStep("success");
    };

    const handleWhatsappRedirect = () => {
        const message = `Olá! Gostaria de encomendar:\n\n*${quantity}x ${product.name}*\nPreço Total: ${(product.price * quantity).toLocaleString("pt-AO")} Kz\n\n*Tipo:* ${orderType === 'delivery' ? 'Entrega 🛵' : 'Recolha 🏪'}\n*Cliente:* ${formData.name}\n*Contato:* ${formData.phone}\n${orderType === 'delivery' ? `*Endereço:* ${formData.address}\n` : ''}${formData.notes ? `*Obs:* ${formData.notes}` : ''}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/244923456789?text=${encodedMessage}`, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-white/10 relative animate-in slide-in-from-bottom-10 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Header */}
                <div className="bg-brand/5 p-6 border-b border-brand/10">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {step === 'success' ? 'Pedido Confirmado! 🎉' : 'Finalizar Encomenda'}
                    </h2>
                    {step !== 'success' && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {quantity}x {product.name} - <span className="font-bold text-brand">{(product.price * quantity).toLocaleString("pt-AO")} Kz</span>
                        </p>
                    )}
                </div>

                <div className="p-6">
                    {/* STEP 1: Tipo de Pedido */}
                    {step === "type" && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-center mb-6">Como deseja receber seu pedido?</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleTypeSelect("delivery")}
                                    className="h-32 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 dark:border-zinc-700 hover:border-brand hover:bg-brand/5 transition-all group"
                                >
                                    <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                        <Truck className="w-8 h-8" />
                                    </div>
                                    <span className="font-bold text-gray-700 dark:text-gray-200">Entrega</span>
                                </button>
                                <button
                                    onClick={() => handleTypeSelect("pickup")}
                                    className="h-32 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 dark:border-zinc-700 hover:border-brand hover:bg-brand/5 transition-all group"
                                >
                                    <div className="p-4 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                                        <ShoppingBag className="w-8 h-8" />
                                    </div>
                                    <span className="font-bold text-gray-700 dark:text-gray-200">Recolha</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Formulário de Detalhes */}
                    {step === "details" && (
                        <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-10">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <User className="w-4 h-4 text-brand" /> Nome Completo
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                                    placeholder="Seu nome"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-brand" /> Telefone
                                </label>
                                <input
                                    required
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                                    placeholder="9XX XXX XXX"
                                />
                            </div>

                            {orderType === 'delivery' && (
                                <div className="space-y-2 animate-in slide-in-from-top-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-brand" /> Endereço de Entrega
                                    </label>
                                    <textarea
                                        required
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all min-h-[80px]"
                                        placeholder="Bairro, Rua, Ponto de referência..."
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Observações (Opcional)</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all min-h-[60px]"
                                    placeholder="Ex: Sem cebola, molho à parte..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setStep("type")}
                                    className="flex-1"
                                >
                                    Voltar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-[2] bg-brand hover:bg-brand-dark text-white font-bold"
                                >
                                    {loading ? 'Processando...' : 'Confirmar Encomenda'}
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* STEP 3: Sucesso */}
                    {step === "success" && (
                        <div className="text-center space-y-6 animate-in zoom-in-95">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>

                            <h3 className="text-xl font-bold">Tudo pronto!</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Seu pedido foi gerado com sucesso. Clique abaixo para enviar os detalhes pelo WhatsApp e finalizar.
                            </p>

                            <Button
                                onClick={handleWhatsappRedirect}
                                className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/20"
                            >
                                Enviar no WhatsApp 💬
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
