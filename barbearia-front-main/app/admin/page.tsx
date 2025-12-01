"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Plus, Trash2, Edit2, Save, X } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("services")
  const [services, setServices] = useState([
    { id: 1, name: "Corte de Cabelo", price: 35.0, duration: 30 },
    { id: 2, name: "Corte + Barba", price: 60.0, duration: 45 },
    { id: 3, name: "Barba", price: 30.0, duration: 20 },
  ])

  const [barbershopInfo, setBarbershopInfo] = useState({
    name: "Prime Cuts",
    phone: "(11) 98765-4321",
    address: "Rua do Prado, 17 - Patos, SP",
    email: "contato@primecuts.com",
  })

  const [editingService, setEditingService] = useState<(typeof services)[0] | null>(null)
  const [newService, setNewService] = useState({ name: "", price: 0, duration: 0 })
  const [editingInfo, setEditingInfo] = useState(false)

  const handleAddService = () => {
    if (newService.name && newService.price > 0 && newService.duration > 0) {
      setServices([
        ...services,
        {
          id: Math.max(...services.map((s) => s.id), 0) + 1,
          ...newService,
        },
      ])
      setNewService({ name: "", price: 0, duration: 0 })
    }
  }

  const handleDeleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleUpdateService = () => {
    if (editingService && editingService.name && editingService.price > 0) {
      setServices(services.map((s) => (s.id === editingService.id ? editingService : s)))
      setEditingService(null)
    }
  }

  const handleUpdateInfo = () => {
    setEditingInfo(false)
  }

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

          {/* Services Tab */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Adicionar Novo Serviço</h2>
                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <input
                    type="text"
                    placeholder="Nome do serviço"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Preço (R$)"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: Number.parseFloat(e.target.value) })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                    <input
                      type="number"
                      placeholder="Duração (min)"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: Number.parseInt(e.target.value) })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <button
                    onClick={handleAddService}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar Serviço
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Serviços Cadastrados</h2>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="bg-muted p-4 rounded-lg flex items-center justify-between">
                      {editingService?.id === service.id ? (
                        <div className="flex gap-3 flex-1">
                          <input
                            type="text"
                            value={editingService.name}
                            onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                            className="flex-1 p-2 border border-border rounded bg-background"
                          />
                          <input
                            type="number"
                            value={editingService.price}
                            onChange={(e) =>
                              setEditingService({ ...editingService, price: Number.parseFloat(e.target.value) })
                            }
                            className="w-24 p-2 border border-border rounded bg-background"
                          />
                          <input
                            type="number"
                            value={editingService.duration}
                            onChange={(e) =>
                              setEditingService({ ...editingService, duration: Number.parseInt(e.target.value) })
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
                              R$ {service.price.toFixed(2)} • {service.duration} min
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

          {/* Info Tab */}
          {activeTab === "info" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Informações da Barbearia</h2>

              {editingInfo ? (
                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Nome da Barbearia</label>
                    <input
                      type="text"
                      value={barbershopInfo.name}
                      onChange={(e) => setBarbershopInfo({ ...barbershopInfo, name: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={barbershopInfo.phone}
                      onChange={(e) => setBarbershopInfo({ ...barbershopInfo, phone: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Endereço</label>
                    <input
                      type="text"
                      value={barbershopInfo.address}
                      onChange={(e) => setBarbershopInfo({ ...barbershopInfo, address: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={barbershopInfo.email}
                      onChange={(e) => setBarbershopInfo({ ...barbershopInfo, email: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleUpdateInfo}
                      className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingInfo(false)}
                      className="flex-1 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground">Nome</label>
                    <p className="text-lg font-semibold">{barbershopInfo.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground">Telefone</label>
                    <p className="text-lg font-semibold">{barbershopInfo.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground">Endereço</label>
                    <p className="text-lg font-semibold">{barbershopInfo.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground">Email</label>
                    <p className="text-lg font-semibold">{barbershopInfo.email}</p>
                  </div>
                  <button
                    onClick={() => setEditingInfo(true)}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-5 h-5" />
                    Editar Informações
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
