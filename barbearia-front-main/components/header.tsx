"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="bg-secondary text-secondary-foreground sticky top-0 z-50 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Barbearia
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="hover:text-accent transition">
            Home
          </Link>
          <Link href="/reservas" className="hover:text-accent transition">
            Reservas
          </Link>
          <Link href="/admin" className="hover:text-accent transition">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-secondary/95 border-t border-secondary-foreground/10">
          <div className="flex flex-col gap-4 px-4 py-4">
            <Link href="/" className="hover:text-accent transition" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/reservas" className="hover:text-accent transition" onClick={() => setMobileOpen(false)}>
              Reservas
            </Link>
            <Link href="/admin" className="hover:text-accent transition" onClick={() => setMobileOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
