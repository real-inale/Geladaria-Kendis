"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Check, X, ChefHat, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

// Tipos para as mesas
type TableStatus = "available" | "occupied" | "selected";

interface Table {
    id: string;
    number: number;
    capacity: number;
    status: TableStatus;
    position: { x: number; y: number };
}

export default function ReservasPage() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(2);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);

    // Refs para animação
    const containerRef = useRef<HTMLDivElement>(null);
    const tablesRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const summaryRef = useRef<HTMLDivElement>(null);

    // Horários disponíveis
    const availableTimes = [
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
    ];

    // Layout das mesas
    const [tables, setTables] = useState<Table[]>([
        { id: "t1", number: 1, capacity: 2, status: "available", position: { x: 10, y: 10 } },
        { id: "t2", number: 2, capacity: 2, status: "available", position: { x: 40, y: 10 } },
        { id: "t3", number: 3, capacity: 4, status: "occupied", position: { x: 70, y: 10 } },
        { id: "t4", number: 4, capacity: 4, status: "available", position: { x: 10, y: 40 } },
        { id: "t5", number: 5, capacity: 6, status: "available", position: { x: 40, y: 40 } },
        { id: "t6", number: 6, capacity: 2, status: "occupied", position: { x: 70, y: 40 } },
        { id: "t7", number: 7, capacity: 4, status: "available", position: { x: 10, y: 70 } },
        { id: "t8", number: 8, capacity: 2, status: "available", position: { x: 40, y: 70 } },
        { id: "t9", number: 9, capacity: 8, status: "available", position: { x: 70, y: 70 } },
    ]);

    // Animação de Entrada
    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
            .fromTo(tablesRef.current,
                { opacity: 0, x: -50, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.5"
            )
            .fromTo(formRef.current,
                { opacity: 0, x: 50, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.6"
            );
    }, []);

    // Animação ao Selecionar Mesa
    const handleTableSelect = (tableId: string) => {
        if (tables.find(t => t.id === tableId)?.status === "occupied") return;

        // Animar Mesa Clicada
        gsap.fromTo(`#table-${tableId}`,
            { scale: 0.8 },
            {
                scale: 1.1, duration: 0.4, ease: "elastic.out(1, 0.3)", onComplete: () => {
                    gsap.to(`#table-${tableId}`, { scale: 1, duration: 0.2 });
                }
            }
        );

        setTables(tables.map(table => ({
            ...table,
            status: table.id === tableId ? "selected" :
                table.status === "selected" ? "available" :
                    table.status
        })));
        setSelectedTable(tableId);

        // Animar entrada do Resumo se for a primeira seleção
        if (!selectedTable && summaryRef.current) {
            gsap.fromTo(summaryRef.current,
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.6, ease: "power3.out" }
            );
        }
    };

    const handleReservation = () => {
        if (!selectedDate || !selectedTime || !selectedTable) {
            alert("Por favor, preencha todos os campos e selecione uma mesa.");
            return;
        }

        // Efeito de sucesso botão
        const btn = document.getElementById('confirm-btn');
        if (btn) {
            gsap.to(btn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    alert(`Reserva confirmada!\nMesa: ${tables.find(t => t.id === selectedTable)?.number} \nData: ${selectedDate} \nHora: ${selectedTime} \nPessoas: ${numberOfPeople} `);
                }
            });
        }
    };

    const availableTables = tables.filter(t => t.status === "available" || t.status === "selected");
    const occupiedTables = tables.filter(t => t.status === "occupied");

    return (
        <main className="min-h-screen bg-gray-50/50 dark:bg-stone-900/50 overflow-hidden relative selection:bg-brand selection:text-white">
            <Navbar />

            {/* Background Decorativo Animado */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div ref={containerRef} className="pt-28 pb-16 container mx-auto px-4 md:px-6">
                {/* Título com animação sutil */}
                <div className="mb-12 text-center relative z-10">
                    <div className="inline-block p-2 px-4 rounded-full bg-brand/10 text-brand font-bold text-sm mb-4 animate-bounce">
                        ✨ Reserve seu Momento
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        Reserva de Mesa
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto font-light">
                        Escolha o lugar perfeito para desfrutar dos nossos sabores únicos.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Lado Esquerdo - Layout das Mesas */}
                    <div ref={tablesRef} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand via-accent to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <ChefHat className="w-6 h-6 text-brand" />
                                Planta do Salão
                            </h2>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div> Livre
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div> Ocupada
                                </div>
                            </div>
                        </div>

                        {/* Grid de Mesas */}
                        <div className="relative bg-gray-50 dark:bg-black/20 rounded-3xl p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10">
                            <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                                {tables.map((table) => (
                                    <button
                                        key={table.id}
                                        id={`table-${table.id}`}
                                        onClick={() => handleTableSelect(table.id)}
                                        disabled={table.status === "occupied"}
                                        className={cn(
                                            "relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-sm",
                                            table.status === "available" && "bg-white dark:bg-zinc-800 border-2 border-green-500/20 hover:border-green-500 hover:shadow-green-200 dark:hover:shadow-green-900/20 active:scale-95",
                                            table.status === "occupied" && "bg-gray-100 dark:bg-zinc-800/50 border-2 border-transparent opacity-60 cursor-not-allowed grayscale",
                                            table.status === "selected" && "bg-brand text-white border-2 border-brand shadow-xl shadow-brand/30 transform scale-110 z-10 ring-4 ring-brand/10"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-2xl font-black",
                                            table.status === "available" && "text-gray-400 group-hover:text-green-600",
                                            table.status === "selected" && "text-white"
                                        )}>
                                            {table.number}
                                        </span>
                                        <div className={cn(
                                            "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
                                            table.status === "selected" ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-zinc-700 text-gray-500"
                                        )}>
                                            <Users className="w-3 h-3" />
                                            <span>{table.capacity}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito - Formulário de Reserva */}
                    <div ref={formRef} className="space-y-6">
                        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-white/5">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-brand" />
                                Detalhes
                            </h2>

                            <div className="space-y-8">
                                {/* Pessoas */}
                                <div>
                                    <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 block">Pessoas</label>
                                    <div className="flex items-center gap-6 bg-gray-50 dark:bg-black/20 p-2 rounded-2xl border border-gray-100 dark:border-white/5">
                                        <button
                                            onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                                            className="w-14 h-14 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center text-2xl font-bold text-gray-600 hover:text-brand"
                                        >-</button>
                                        <div className="flex-1 text-center">
                                            <span className="text-4xl font-black text-gray-900 dark:text-white">{numberOfPeople}</span>
                                            <span className="text-sm text-gray-500 ml-2">pessoas</span>
                                        </div>
                                        <button
                                            onClick={() => setNumberOfPeople(Math.min(10, numberOfPeople + 1))}
                                            className="w-14 h-14 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center text-2xl font-bold text-gray-600 hover:text-brand"
                                        >+</button>
                                    </div>
                                </div>

                                {/* Data e Hora Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="reservation-date" className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Data</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand w-5 h-5 pointer-events-none" />
                                            <input
                                                id="reservation-date"
                                                name="date"
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-medium focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="reservation-time" className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Horário</label>
                                        <div className="relative">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand w-5 h-5 pointer-events-none" />
                                            <select
                                                id="reservation-time"
                                                name="time"
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-medium focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all shadow-sm appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Escolher hora</option>
                                                {availableTimes.map((time) => (
                                                    <option key={time} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Resumo Expansível */}
                                <div ref={summaryRef} className="overflow-hidden">
                                    {(selectedTable || (selectedDate && selectedTime)) && (
                                        <div className="bg-brand/5 border border-brand/10 p-6 rounded-2xl space-y-4">
                                            {selectedTable && (
                                                <div className="flex justify-between items-center pb-4 border-b border-brand/10">
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Mesa Selecionada</p>
                                                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                                                            Mesa 0{tables.find(t => t.id === selectedTable)?.number}
                                                        </div>
                                                    </div>
                                                    <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-sm">
                                                        <ChefHat className="w-5 h-5 text-brand" />
                                                    </div>
                                                </div>
                                            )}

                                            {selectedDate && selectedTime && (
                                                <div className="flex justify-between items-center pt-2">
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Data e Hora</p>
                                                        <div className="text-lg font-bold text-brand">
                                                            {selectedDate} • {selectedTime}
                                                        </div>
                                                    </div>
                                                    <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-sm">
                                                        <Check className="w-5 h-5 text-green-500" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <Button
                                    id="confirm-btn"
                                    onClick={handleReservation}
                                    disabled={!selectedDate || !selectedTime || !selectedTable}
                                    className="w-full h-16 text-lg font-bold rounded-2xl bg-brand hover:bg-brand-dark shadow-xl shadow-brand/20 disabled:opacity-50 disabled:shadow-none transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    {selectedTable ? "✨ Confirmar Experiência" : "👈 Selecione sua Mesa"}
                                </Button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                            Ao confirmar, você receberá um email com os detalhes da reserva
                        </p>
                    </div>
                </div>
            </div>
        </main >
    );
}
