import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Barbearia</h3>
          <p className="text-secondary-foreground/80">A melhor barbearia para você e sua família.</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
          <div className="flex flex-col gap-2 text-secondary-foreground/80">
            <Link href="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link href="/reservas" className="hover:text-accent transition">
              Agendar
            </Link>
            <Link href="/admin" className="hover:text-accent transition">
              Painel Admin
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Contato</h3>
          <div className="flex flex-col gap-3 text-secondary-foreground/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Rua do Prado, 17 - Patos, SP</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>(11) 98765-4321</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contato@primecuts.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 mt-8 pt-8 text-center pb-4 text-secondary-foreground/60">
        <p>&copy; 2025 Barbearia. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
