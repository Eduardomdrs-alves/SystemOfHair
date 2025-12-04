"use client";

import { useState, useEffect } from "react";
import { LogIn, User, Shield, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginHub() {
  const router = useRouter();

  const [mode, setMode] = useState("select");

  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteSenha, setClienteSenha] = useState("");
  const [clienteNome, setClienteNome] = useState("");

  const [funcEmail, setFuncEmail] = useState("");
  const [funcSenha, setFuncSenha] = useState("");

  const [admEmail, setAdmEmail] = useState("");
  const [admSenha, setAdmSenha] = useState("");

  const funcionarioLogin = { email: "func@primecuts.com", senha: "123456" };
  const adminLogin = { email: "admin@primecuts.com", senha: "admin123" };

  // -------------------------------------------------
  // CARREGA OS DADOS SALVOS QUANDO O COMPONENTE INICIA
  // -------------------------------------------------
  useEffect(() => {
    const savedClienteEmail = localStorage.getItem("clienteEmail");
    const savedClienteNome = localStorage.getItem("clienteNome");
    const savedFuncEmail = localStorage.getItem("funcEmail");
    const savedAdmEmail = localStorage.getItem("admEmail");

    if (savedClienteEmail) setClienteEmail(savedClienteEmail);
    if (savedClienteNome) setClienteNome(savedClienteNome);
    if (savedFuncEmail) setFuncEmail(savedFuncEmail);
    if (savedAdmEmail) setAdmEmail(savedAdmEmail);
  }, []);

  // -------------------------------------------------
  // SALVA AUTOMATICAMENTE QUANDO O USUÁRIO DIGITA
  // -------------------------------------------------
  useEffect(() => {
    localStorage.setItem("clienteEmail", clienteEmail);
  }, [clienteEmail]);

  useEffect(() => {
    localStorage.setItem("clienteNome", clienteNome);
  }, [clienteNome]);

  useEffect(() => {
    localStorage.setItem("funcEmail", funcEmail);
  }, [funcEmail]);

  useEffect(() => {
    localStorage.setItem("admEmail", admEmail);
  }, [admEmail]);

  // -------------------------------------------------
  // LOGIN / REGISTER
  // -------------------------------------------------

  const handleLoginCliente = () => {
    localStorage.setItem("userRole", "cliente");
    router.push("/");
  };

  const handleRegisterCliente = () => {
    localStorage.setItem("userRole", "cliente");
    router.push("/");
  };

  const handleLoginFuncionario = () => {
    if (
      funcEmail === funcionarioLogin.email &&
      funcSenha === funcionarioLogin.senha
    ) {
      localStorage.setItem("userRole", "funcionario");
      router.push("/");
    } else {
      alert("Credenciais inválidas para funcionário.");
    }
  };

  const handleLoginAdmin = () => {
    if (admEmail === adminLogin.email && admSenha === adminLogin.senha) {
      localStorage.setItem("userRole", "admin");
      router.push("/");
    } else {
      alert("Credenciais inválidas para administrador.");
    }
  };

  // Card genérico
  const Card = ({ children }: any) => (
    <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-xl text-center">
      {children}
    </div>
  );

  const IconLogin = () => (
    <div className="flex justify-center mb-3">
      <LogIn className="w-10 h-10 text-primary" />
    </div>
  );

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ background: "linear-gradient(180deg, #0A535A, #061A1D)" }}
    >
      <Card>
        <IconLogin />

        {/* ------------------------------------------------------------- SELECT ------------------------------------------------------------- */}
        {mode === "select" && (
          <>
            <h1 className="text-3xl font-bold mb-1">Prime Cuts</h1>
            <p className="text-muted-foreground mb-6">
              Faça login para continuar
            </p>

            <p className="text-sm font-medium text-foreground mb-4">
              Escolha seu tipo de acesso:
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setMode("cliente-login")}
                className="w-full py-3 rounded-lg bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90"
              >
                <User className="w-5 h-5" /> Sou Cliente
              </button>

              <button
                onClick={() => setMode("func-login")}
                className="w-full py-3 rounded-lg bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800"
              >
                <Wrench className="w-5 h-5" /> Sou Funcionário
              </button>

              <button
                onClick={() => setMode("admin-login")}
                className="w-full py-3 rounded-lg bg-secondary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90"
              >
                <Shield className="w-5 h-5 text-white" /> Sou Administrador
              </button>
            </div>

            <p className="text-xs text-muted-foreground mt-8">
              Prime Cuts © 2025 • Sistema de Agendamento
            </p>
          </>
        )}

        {/* ------------------------------------------------------------- LOGIN CLIENTE ------------------------------------------------------------- */}
        {mode === "cliente-login" && (
          <>
            <h1 className="text-3xl font-bold mb-1">Prime Cuts</h1>
            <p className="text-muted-foreground mb-4">
              Faça login para continuar
            </p>

            <button
              onClick={() => setMode("select")}
              className="text-sm mb-6 text-muted-foreground hover:text-primary"
            >
              ← Voltar
            </button>

            <div className="text-left mb-4">
              <label className="text-sm">Email</label>
              <input
                type="email"
                autoComplete="off"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"
                value={clienteEmail}
                onChange={(e) => setClienteEmail(e.target.value)}
              />
            </div>

            <div className="text-left mb-6">
              <label className="text-sm">Senha</label>
              <input
                type="password"
                autoComplete="off"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"
                value={clienteSenha}
                onChange={(e) => setClienteSenha(e.target.value)}
              />
            </div>

            <button
              onClick={handleLoginCliente}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold"
            >
              Entrar
            </button>

            <button
              onClick={() => setMode("cliente-register")}
              className="w-full text-sm text-primary mt-4 hover:underline"
            >
              Não tem conta? Registrar
            </button>
          </>
        )}

        {/* ------------------------------------------------------------- REGISTRO ------------------------------------------------------------- */}
        {mode === "cliente-register" && (
          <>
            <h1 className="text-3xl font-bold mb-1">Criar Conta</h1>
            <p className="text-muted-foreground mb-4">
              Registre-se para continuar
            </p>

            <button
              onClick={() => setMode("cliente-login")}
              className="text-sm mb-6 text-muted-foreground hover:text-primary"
            >
              ← Voltar
            </button>

            <div className="text-left mb-4">
              <label className="text-sm">Nome</label>
              <input
                type="text"
                autoComplete="off"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"
                value={clienteNome}
                onChange={(e) => setClienteNome(e.target.value)}
              />
            </div>

            <div className="text-left mb-4">
              <label className="text-sm">Email</label>
              <input
                type="email"
                autoComplete="off"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"
                value={clienteEmail}
                onChange={(e) => setClienteEmail(e.target.value)}
              />
            </div>

            <div className="text-left mb-6">
              <label className="text-sm">Senha</label>
              <input
                type="password"
                autoComplete="off"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"
                value={clienteSenha}
                onChange={(e) => setClienteSenha(e.target.value)}
              />
            </div>

            <button
              onClick={handleRegisterCliente}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold"
            >
              Registrar
            </button>
          </>
        )}

        {/* ------------------------------------------------------------- FUNCIONÁRIO ------------------------------------------------------------- */}
        {mode === "func-login" && (
          <>
            <h1 className="text-3xl font-bold mb-1">Login Funcionário</h1>
            <p className="text-muted-foreground mb-6">Acesso interno</p>

            <button
              onClick={() => setMode("select")}
              className="text-sm mb-6 text-muted-foreground hover:text-primary"
            >
              ← Voltar
            </button>

            <p className="text-sm font-semibold mb-2">
              Email: func@primecuts.com
            </p>
            <p className="text-sm font-semibold mb-4">Senha: 123456</p>

            <input
              type="email"
              autoComplete="off"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 mb-3"
              value={funcEmail}
              onChange={(e) => setFuncEmail(e.target.value)}
            />

            <input
              type="password"
              autoComplete="off"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 mb-6"
              value={funcSenha}
              onChange={(e) => setFuncSenha(e.target.value)}
            />

            <button
              onClick={handleLoginFuncionario}
              className="w-full py-3 bg-black text-white rounded-lg font-semibold"
            >
              Entrar
            </button>
          </>
        )}

        {/* ------------------------------------------------------------- ADMIN ------------------------------------------------------------- */}
        {mode === "admin-login" && (
          <>
            <h1 className="text-3xl font-bold mb-1">Login Administrador</h1>
            <p className="text-muted-foreground mb-6">Acesso restrito</p>

            <button
              onClick={() => setMode("select")}
              className="text-sm mb-6 text-muted-foreground hover:text-primary"
            >
              ← Voltar
            </button>

            <p className="text-sm font-semibold mb-2">
              Email: admin@primecuts.com
            </p>
            <p className="text-sm font-semibold mb-4">Senha: admin123</p>

            <input
              type="email"
              autoComplete="off"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 mb-3"
              value={admEmail}
              onChange={(e) => setAdmEmail(e.target.value)}
            />

            <input
              type="password"
              autoComplete="off"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 mb-6"
              value={admSenha}
              onChange={(e) => setAdmSenha(e.target.value)}
            />

            <button
              onClick={handleLoginAdmin}
              className="w-full py-3 bg-secondary text-black rounded-lg font-semibold"
            >
              Entrar
            </button>
          </>
        )}
      </Card>
    </div>
  );
}
