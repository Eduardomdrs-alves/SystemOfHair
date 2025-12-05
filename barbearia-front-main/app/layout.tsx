import type React from "react";
// <CHANGE> Updated metadata for barbershop and added fonts styling
import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "System of Hair",
  description:
    "Reserve seu corte online na System of Hair. Escolha o serviço, barbeiro e horário que preferir.",
  icons: {
    icon: [
      {
        url: "/logo.png",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
