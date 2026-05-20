import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FinanceProvider } from "@/context/FinanceContext";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono-",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluxo Financeiro - Controle Financeiro Pessoal",
  description: "Controle suas finanças de forma simples e moderna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-900 min-h-screen`}>
        <FinanceProvider>
          <div 
            className="flex flex-col min-h-screen relative bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/background1.png')" }}
          >
            {/* Translucent overlay adjusted to 75% opacity to make background1 more visible while keeping text readable */}
            <div className="absolute inset-0 bg-slate-50/75 backdrop-blur-[1px] pointer-events-none z-0" />
            
            <div className="flex flex-col min-h-screen relative z-10">
              <Header />
              <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                {children}
              </main>
            </div>
          </div>
          <Toaster position="top-right" richColors />
        </FinanceProvider>
      </body>
    </html>
  );
}