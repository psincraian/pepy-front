"use client";
import "./globals.css";
import Footer from "@/components/footer";
import { UserProvider } from "@/app/user/UserContext";
import { Inter } from "next/font/google";
import AppBar from "@/components/app_bar";


export const runtime = "edge";

type ReactNode = {
  children: React.ReactNode;
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: ReactNode) {


  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="min-h-screen flex flex-col">
      <UserProvider>
        <AppBar withSearch={true} />
        <main>
          {children}
        </main>
      </UserProvider>
    </div>
    <Footer />
    </body>
    </html>
  );
}
