"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";

// -------------------
// Tipagens
// -------------------
interface Barbeiro {
  id: number;
  name: string;
}

interface Servico {
  id: number;
  name: string;
  price: number;
  duration: number; // minutos
}

// -------------------
// Component
// -------------------
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("services");

  // -------------------
  // Barbearia Info
  // -------------------
  const [barbershopInfo, setBarbershopInfo] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [editingInfo, setEditingInfo] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("barbershopInfo");
    if (saved) setBarbershopInfo(JSON.parse(saved));
  }, []);

  const handleUpdateInfo = () => {
    localStorage.setItem("barbershopInfo", JSON.stringify(barbershopInfo));
    setEditingInfo(false);
  };

  // -------------------
  // Barbeiros CRUD (via API)
  // -------------------
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [newBarbeiroName, setNewBarbeiroName] = useState("");
  const [editingBarbeiroId, setEditingBarbeiroId] = useState<number | null>(
    null
  );
  const [editingBarbeiroName, setEditingBarbeiroName] = useState("");

  // Buscar barbeiros da API
  const fetchBarbeiros = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/barbeiros");
      if (!res.ok) throw new Error("Erro ao buscar barbeiros");
      const data = await res.json();
      const mapped = data.map((b: any) => ({ id: b.id, name: b.nome }));
      setBarbeiros(mapped);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBarbeiros();
  }, []);

  // Adicionar barbeiro
  const handleAddBarbeiro = async () => {
    if (!newBarbeiroName.trim()) return;
    try {
      const res = await fetch("http://localhost:8080/api/barbeiros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: newBarbeiroName }),
      });
      if (!res.ok) throw new Error("Erro ao adicionar barbeiro");

      const savedBarbeiro = await res.json();
      setBarbeiros([
        ...barbeiros,
        { id: savedBarbeiro.id, name: savedBarbeiro.nome },
      ]);
      setNewBarbeiroName("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Atualizar barbeiro
  const handleUpdateBarbeiro = async () => {
    if (editingBarbeiroId === null || !editingBarbeiroName.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/barbeiros/${editingBarbeiroId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: editingBarbeiroName }),
        }
      );
      if (!res.ok) throw new Error("Erro ao atualizar barbeiro");

      const updatedBarbeiro = await res.json();
      setBarbeiros(
        barbeiros.map((b) =>
          b.id === updatedBarbeiro.id ? { ...b, name: updatedBarbeiro.nome } : b
        )
      );
      setEditingBarbeiroId(null);
      setEditingBarbeiroName("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Deletar barbeiro
  const handleDeleteBarbeiro = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/barbeiros/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar barbeiro");
      setBarbeiros(barbeiros.filter((b) => b.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  // -------------------
  // Serviços CRUD (via API)
  // -------------------
  const [services, setServices] = useState<Servico[]>([]);
  const [editingService, setEditingService] = useState<Servico | null>(null);
  const [newService, setNewService] = useState({
    name: "",
    price: 0,
    duration: 0,
  });

  // Buscar serviços da API
  useEffect(() => {
    fetch("http://localhost:8080/api/servicos")
      .then((res) => res.json())
      .then((data: any[]) => {
        const mapped = data.map((s) => ({
          id: s.id,
          name: s.nome,
          price: s.preco,
          duration: s.duracao,
        }));
        setServices(mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  // Adicionar serviço
  const handleAddService = async () => {
    if (!newService.name || newService.price <= 0 || newService.duration <= 0)
      return;

    try {
      const res = await fetch("http://localhost:8080/api/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: newService.name,
          preco: newService.price,
          duracao: newService.duration,
        }),
      });
      if (!res.ok) throw new Error("Erro ao adicionar serviço");

      const savedService = await res.json();
      setServices([
        ...services,
        {
          id: savedService.id,
          name: savedService.nome,
          price: savedService.preco,
          duration: savedService.duracao,
        },
      ]);
      setNewService({ name: "", price: 0, duration: 0 });
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Atualizar serviço
  const handleUpdateService = async () => {
    if (!editingService) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/servicos/${editingService.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: editingService.name,
            preco: editingService.price,
            duracao: editingService.duration,
          }),
        }
      );
      if (!res.ok) throw new Error("Erro ao atualizar serviço");

      const updatedService = await res.json();
      setServices(
        services.map((s) =>
          s.id === updatedService.id
            ? {
                id: updatedService.id,
                name: updatedService.nome,
                price: updatedService.preco,
                duration: updatedService.duracao,
              }
            : s
        )
      );
      setEditingService(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Deletar serviço
  const handleDeleteService = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/servicos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar serviço");

      setServices(services.filter((s) => s.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  // -------------------
  // Render
  // -------------------
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === "services"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Serviços
            </button>

            <button
              onClick={() => setActiveTab("barbers")}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === "barbers"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Barbeiros
            </button>

            <button
              onClick={() => setActiveTab("info")}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === "info"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Informações da Barbearia
            </button>
          </div>

          {/* Serviços */}
          {activeTab === "services" && (
            <div className="space-y-6">
              {/* Adicionar Serviço */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Adicionar Novo Serviço
                </h2>
                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <input
                    type="text"
                    placeholder="Nome do serviço"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Preço (R$)"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          price: Number.parseFloat(e.target.value),
                        })
                      }
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                    <input
                      type="number"
                      placeholder="Duração (min)"
                      value={newService.duration}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          duration: Number.parseInt(e.target.value),
                        })
                      }
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <button
                    onClick={handleAddService}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> Adicionar Serviço
                  </button>
                </div>
              </div>

              {/* Serviços Cadastrados */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Serviços Cadastrados
                </h2>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-muted p-4 rounded-lg flex items-center justify-between"
                    >
                      {editingService?.id === service.id ? (
                        <div className="flex gap-3 flex-1">
                          <input
                            type="text"
                            value={editingService.name}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                name: e.target.value,
                              })
                            }
                            className="flex-1 p-2 border border-border rounded bg-background"
                          />
                          <input
                            type="number"
                            value={editingService.price}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                price: Number.parseFloat(e.target.value),
                              })
                            }
                            className="w-24 p-2 border border-border rounded bg-background"
                          />
                          <input
                            type="number"
                            value={editingService.duration}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                duration: Number.parseInt(e.target.value),
                              })
                            }
                            className="w-24 p-2 border border-border rounded bg-background"
                          />
                          <button
                            onClick={handleUpdateService}
                            className="bg-primary text-primary-foreground p-2 rounded hover:shadow-lg transition"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setEditingService(null)}
                            className="bg-muted-foreground text-background p-2 rounded hover:shadow-lg transition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              R$ {service.price?.toFixed(2) ?? "0.00"} •{" "}
                              {service.duration ?? 0} min
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingService(service)}
                              className="bg-primary text-primary-foreground p-2 rounded hover:shadow-lg transition"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="bg-destructive text-destructive-foreground p-2 rounded hover:shadow-lg transition"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Barbeiros */}
          {activeTab === "barbers" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">
                Adicionar Barbeiro
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nome do barbeiro"
                  value={newBarbeiroName}
                  onChange={(e) => setNewBarbeiroName(e.target.value)}
                  className="flex-1 p-3 border border-border rounded-lg bg-background"
                />
                <button
                  onClick={handleAddBarbeiro}
                  className="bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Salvar
                </button>
              </div>

              <h2 className="text-2xl font-semibold mt-6 mb-4">
                Barbeiros Cadastrados
              </h2>
              <ul className="space-y-2">
                {barbeiros.map((b) => (
                  <li
                    key={b.id}
                    className="bg-muted p-3 rounded-lg flex justify-between items-center"
                  >
                    {editingBarbeiroId === b.id ? (
                      <div className="flex gap-2 flex-1">
                        <input
                          type="text"
                          value={editingBarbeiroName}
                          onChange={(e) =>
                            setEditingBarbeiroName(e.target.value)
                          }
                          className="flex-1 p-2 border border-border rounded bg-background"
                        />
                        <button
                          onClick={handleUpdateBarbeiro}
                          className="bg-primary text-primary-foreground p-2 rounded hover:shadow-lg transition"
                        >
                          <Save className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setEditingBarbeiroId(null)}
                          className="bg-muted-foreground text-background p-2 rounded hover:shadow-lg transition"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span>{b.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingBarbeiroId(b.id);
                              setEditingBarbeiroName(b.name);
                            }}
                            className="bg-primary text-primary-foreground p-2 rounded hover:shadow-lg transition"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBarbeiro(b.id)}
                            className="bg-destructive text-destructive-foreground p-2 rounded hover:shadow-lg transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Informações Barbearia */}
          {activeTab === "info" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">
                Informações da Barbearia
              </h2>
              {editingInfo ? (
                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <input
                    type="text"
                    value={barbershopInfo.name}
                    onChange={(e) =>
                      setBarbershopInfo({
                        ...barbershopInfo,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    placeholder="Nome"
                  />
                  <input
                    type="tel"
                    value={barbershopInfo.phone}
                    onChange={(e) =>
                      setBarbershopInfo({
                        ...barbershopInfo,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    placeholder="Telefone"
                  />
                  <input
                    type="text"
                    value={barbershopInfo.address}
                    onChange={(e) =>
                      setBarbershopInfo({
                        ...barbershopInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    placeholder="Endereço"
                  />
                  <input
                    type="email"
                    value={barbershopInfo.email}
                    onChange={(e) =>
                      setBarbershopInfo({
                        ...barbershopInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    placeholder="Email"
                  />
                  <button
                    onClick={handleUpdateInfo}
                    className="bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <div className="bg-muted p-6 rounded-lg space-y-2">
                  <p>
                    <strong>Nome:</strong> {barbershopInfo.name}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {barbershopInfo.phone}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {barbershopInfo.address}
                  </p>
                  <p>
                    <strong>Email:</strong> {barbershopInfo.email}
                  </p>
                  <button
                    onClick={() => setEditingInfo(true)}
                    className="bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
