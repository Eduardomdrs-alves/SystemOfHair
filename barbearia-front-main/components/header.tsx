"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const r = localStorage.getItem("userRole");
    setRole(r);
  }, []);

  const logout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <header className="bg-secondary text-secondary-foreground sticky top-0 z-50 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          System of Hair
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8">
          {/* HOME — todos */}
          <Link href="/" className="hover:text-accent transition">
            Home
          </Link>

          {/* CLIENTE — Home + Agendar */}
          {role === "cliente" && (
            <>
              <Link href="/reservas" className="hover:text-accent transition">
                Agendar
              </Link>
            </>
          )}

          {/* FUNCIONÁRIO — Home + Agendar + Reservas */}
          {role === "funcionario" && (
            <>
              <Link href="/reservas" className="hover:text-accent transition">
                Agendar
              </Link>

              <Link href="/reservados" className="hover:text-accent transition">
                Reservas
              </Link>
            </>
          )}

          {/* ADMIN — tudo */}
          {role === "admin" && (
            <>
              <Link href="/reservas" className="hover:text-accent transition">
                Agendar
              </Link>

              <Link href="/reservados" className="hover:text-accent transition">
                Reservas
              </Link>

              <Link href="/admin" className="hover:text-accent transition">
                Admin
              </Link>
            </>
          )}

          {/* BOTÃO sair */}
          {role && (
            <button
              onClick={logout}
              className="ml-4 bg-red-600 text-white px-3 py-1 rounded"
            >
              Sair
            </button>
          )}
        </div>

        {/* BOTÃO MOBILE */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-secondary/95 border-t border-secondary-foreground/10">
          <div className="flex flex-col gap-4 px-4 py-4">

            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            {/* CLIENTE */}
            {role === "cliente" && (
              <Link href="/reservas" onClick={() => setMobileOpen(false)}>
                Agendar
              </Link>
            )}

            {/* FUNCIONARIO */}
            {role === "funcionario" && (
              <>
                <Link href="/reservas" onClick={() => setMobileOpen(false)}>
                  Agendar
                </Link>

                <Link href="/reservados" onClick={() => setMobileOpen(false)}>
                  Reservas
                </Link>
              </>
            )}

            {/* ADMIN */}
            {role === "admin" && (
              <>
                <Link href="/reservas" onClick={() => setMobileOpen(false)}>
                  Agendar
                </Link>

                <Link href="/reservados" onClick={() => setMobileOpen(false)}>
                  Reservas
                </Link>

                <Link href="/admin" onClick={() => setMobileOpen(false)}>
                  Admin
                </Link>
              </>
            )}

            {role && (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Sair
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
