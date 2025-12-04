"use client";

import { useState } from "react";
import { CalendarDays, Clock, User, Scissors } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const filtros = ["Dia", "Semana", "Mês"] as const;

interface Agendamento {
  id: number;
  cliente: string;
  servico: string;
  data: string;
  hora: string;
}

export default function AgendamentosPage() {
  const [filtro, setFiltro] = useState<"Dia" | "Semana" | "Mês">("Dia");

  const agendamentos: Agendamento[] = [
    {
      id: 1,
      cliente: "João Silva",
      servico: "Corte de Cabelo",
      data: "2025-12-04",
      hora: "14:00",
    },
    {
      id: 2,
      cliente: "Carlos Santos",
      servico: "Barba",
      data: "2025-12-05",
      hora: "10:30",
    },
    {
      id: 3,
      cliente: "Pedro Oliveira",
      servico: "Corte + Barba",
      data: "2025-12-06",
      hora: "16:00",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header */}
      <Header />

      {/* Conteúdo */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-10">Agendamentos</h2>

        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-10">
          {filtros.map((item) => (
            <button
              key={item}
              onClick={() => setFiltro(item)}
              className={`px-5 py-2 rounded-lg border transition 
                ${
                  filtro === item
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white border-slate-300 hover:bg-slate-200"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Lista de Agendamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agendamentos.map((a) => (
            <div
              key={a.id}
              className="bg-white shadow-md rounded-lg p-6 border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <User className="text-teal-700" />
                <h3 className="text-lg font-semibold">{a.cliente}</h3>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <Scissors className="text-teal-700" />
                <p className="text-slate-700">{a.servico}</p>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <CalendarDays className="text-teal-700" />
                <p>{a.data}</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-teal-700" />
                <p>{a.hora}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
