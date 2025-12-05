export const API_URL = "http://localhost:8080";

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro na API");
  return res.json();
}

export async function apiPost(path: string, body: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erro ao enviar dados");
  }

  return res.json();
}
