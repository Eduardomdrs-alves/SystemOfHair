"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function ReservasPage() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<Array<{ id: number; name: string; price: number }>>([])
  const [selectedBarber, setSelectedBarber] = useState<string>("sem-preferencia")
  const [notes, setNotes] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const services = [
    { id: 1, name: "Corte de Cabelo", price: 35.0 },
    { id: 2, name: "Corte + Barba", price: 60.0 },
    { id: 3, name: "Barba", price: 30.0 },
    { id: 4, name: "Pigmentação", price: 45.0 },
    { id: 5, name: "Tratamento Capilar", price: 50.0 },
  ]

  const barbers = [
    { id: "sem-preferencia", name: "Sem preferência" },
    { id: "joao", name: "João" },
    { id: "carlos", name: "Carlos" },
    { id: "pedro", name: "Pedro" },
  ]

  const times = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const days = Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => i)

  const total = selectedServices.reduce((sum, service) => sum + service.price, 0)

  const handleAddService = (service: (typeof services)[0]) => {
    setSelectedServices([...selectedServices, service])
  }

  const handleRemoveService = (index: number) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index))
  }

  const handleConfirm = () => {
    alert(`Reserva confirmada para ${selectedDate} às ${selectedTime}`)
    // Reset
    setStep(1)
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedServices([])
    setSelectedBarber("sem-preferencia")
    setNotes("")
  }

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h1 className="text-3xl font-bold mb-8 text-center">Agende seu Corte</h1>

          {/* Step 1: Select Services */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Escolha os Serviços</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleAddService(service)}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition"
                    >
                      <span className="font-medium">{service.name}</span>
                      <span className="text-sm">R$ {service.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>

                <h3 className="font-semibold mb-3">Serviços Selecionados:</h3>
                {selectedServices.length === 0 ? (
                  <p className="text-muted-foreground">Nenhum serviço selecionado</p>
                ) : (
                  <div className="space-y-2 mb-6">
                    {selectedServices.map((service, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                        <span>
                          {service.name} - R$ {service.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemoveService(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => selectedServices.length > 0 && setStep(2)}
                  disabled={selectedServices.length === 0}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  Próximo: Escolher Data e Hora
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date and Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
                  <span>Escolha a Data</span>
                  <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-muted rounded">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-center min-w-48">
                      {currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                    </span>
                    <button onClick={nextMonth} className="p-2 hover:bg-muted rounded">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </h2>

                <div className="grid grid-cols-7 gap-2 mb-6">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
                    <div key={day} className="text-center font-semibold text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  {emptyDays.map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDate(
                          currentMonth.toISOString().split("T")[0].replace("-", "-").replace("-", "-") +
                            "-" +
                            day.toString().padStart(2, "0"),
                        )
                      }
                      className={`p-3 rounded-lg font-semibold transition ${
                        selectedDate ===
                        currentMonth.toISOString().split("T")[0] + "-" + day.toString().padStart(2, "0")
                          ? "bg-primary text-primary-foreground"
                          : "border border-border hover:bg-muted"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Escolha o Horário</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-6">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg font-semibold transition ${
                        selectedTime === time
                          ? "bg-primary text-primary-foreground"
                          : "border border-border hover:bg-muted"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Escolha o Barbeiro</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                  {barbers.map((barber) => (
                    <button
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber.id)}
                      className={`p-3 rounded-lg font-semibold transition ${
                        selectedBarber === barber.id
                          ? "bg-primary text-primary-foreground"
                          : "border border-border hover:bg-muted"
                      }`}
                    >
                      {barber.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition"
                >
                  Voltar
                </button>
                <button
                  onClick={() => selectedDate && selectedTime && setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  Próximo: Confirmar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Resumo da Reserva</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data:</span>
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hora:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Barbeiro:</span>
                    <span className="font-semibold">{barbers.find((b) => b.id === selectedBarber)?.name}</span>
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <h3 className="font-semibold mb-2">Serviços:</h3>
                  {selectedServices.map((service, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{service.name}</span>
                      <span>R$ {service.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-border pt-4 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-accent">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Anotações (Opcional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Deixe suas preferências ou observações..."
                  className="w-full p-3 border border-border rounded-lg bg-background"
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition"
                >
                  Voltar
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
