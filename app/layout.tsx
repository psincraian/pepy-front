"use client";
import "./globals.css";
import Footer from "@/components/footer";
import { UserProvider } from "@/app/user/UserContext";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Header withSearch={true} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </UserProvider>
    <Analytics />
    <SpeedInsights />
    </body>
    </html>
  );
}
