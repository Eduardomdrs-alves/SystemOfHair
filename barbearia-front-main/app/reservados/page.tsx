"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Clock, User, Scissors } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const filtros = ["Dia", "Semana", "Mês"] as const;

interface Agendamento {
  id: number;
  cliente: string;
  servico: string;
  dataHora: string; // ISO string
  barbeiro?: string;
}

export default function AgendamentosPage() {
  const [filtro, setFiltro] = useState<"Dia" | "Semana" | "Mês">("Dia");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/agendamentos");
        if (!res.ok) throw new Error("Erro ao carregar agendamentos");
        const data: Agendamento[] = await res.json();
        setAgendamentos(data);
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar agendamentos");
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  // Filtro
  const now = new Date();
  const filtered = agendamentos.filter((a) => {
    const agDate = new Date(a.dataHora);

    if (filtro === "Dia") {
      return (
        agDate.getFullYear() === now.getFullYear() &&
        agDate.getMonth() === now.getMonth() &&
        agDate.getDate() === now.getDate()
      );
    } else if (filtro === "Semana") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // domingo
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // sábado
      return agDate >= startOfWeek && agDate <= endOfWeek;
    } else if (filtro === "Mês") {
      return (
        agDate.getFullYear() === now.getFullYear() &&
        agDate.getMonth() === now.getMonth()
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header />

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

        {loading ? (
          <p className="text-center">Carregando agendamentos...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-500">
            Nenhum agendamento encontrado.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((a) => {
              const agDate = new Date(a.dataHora);
              return (
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
                    <p>{agDate.toLocaleDateString("pt-BR")}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="text-teal-700" />
                    <p>
                      {agDate.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
