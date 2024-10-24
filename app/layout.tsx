"use client";
import "./globals.css";
import Footer from "@/components/footer";
import { UserProvider } from "@/app/user/UserContext";


export const runtime = "edge";

type ReactNode = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: ReactNode) {


  return (
    <html lang="en">
    <body>
    <UserProvider>
      {children}
    </UserProvider>
    <Footer />
    </body>
    </html>
  );
}
