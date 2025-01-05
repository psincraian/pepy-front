"use client";
import "./globals.css";
import Footer from "@/components/footer";
import { UserProvider } from "@/app/user/UserContext";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { NewsBanner } from "@/components/news-banner/news-banner";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { ToastProvider } from "@/components/ui/toast";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <UserProvider>
      <ToastProvider>
        <div className="flex flex-col min-h-screen">
          <Header withSearch={true} />
          <NewsBanner />
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
          <Footer />
        </div>
      </ToastProvider>
    </UserProvider>
    </body>
    </html>
  );
}
