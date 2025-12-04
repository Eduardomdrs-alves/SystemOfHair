"use client";

import Link from "next/link";
import { Star, MapPin, Phone, Clock, Users } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setIsLogged(!!role);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "João Silva",
      rating: 5,
      text: "Excelente atendimento! O barbeiro tem muito talento, ficou perfeito.",
      date: "2 dias atrás",
    },
    {
      id: 2,
      name: "Carlos Santos",
      rating: 5,
      text: "Muito bom mesmo, consegui agendar fácil e o corte ficou impecável.",
      date: "1 semana atrás",
    },
    {
      id: 3,
      name: "Pedro Oliveira",
      rating: 4,
      text: "Ótimo ambiente, profissionais atenciosos. Super recomendo!",
      date: "2 semanas atrás",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">System of Hair</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            A melhor barbearia da região
          </p>

          <Link
            href={isLogged ? "/reservas" : "/login"}
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            {isLogged ? "Agendar Agora" : "Registre-se Agora"}
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 bg-card">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Localização</h3>
            <p className="text-muted-foreground">Rua do Prado, 17 - Patos, SP</p>
          </div>

          <div className="text-center">
            <Phone className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Contato</h3>
            <p className="text-muted-foreground">(11) 98765-4321</p>
          </div>

          <div className="text-center">
            <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Horário</h3>
            <p className="text-muted-foreground">Seg-Sex: 9h às 19h</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">Avaliações dos Clientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <h3 className="font-semibold mb-2">{review.name}</h3>
                <p className="text-muted-foreground mb-3">{review.text}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para seu novo visual?
          </h2>

          <Link
            href={isLogged ? "/reservas" : "/login"}
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            {isLogged ? "Reserve seu Corte" : "Crie sua Conta"}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
