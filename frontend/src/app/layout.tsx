import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Geladaria & Hamburgeria KENDIS | O Melhor Sabor da Cidade",
  description: "Peça online os melhores gelados, hambúrgueres e combos da Kendis. Delivery rápido e sabor inigualável em Luanda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${outfit.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
