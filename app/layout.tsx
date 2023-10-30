import "./globals.css";
import Footer from "@/app/components/footer";

export const metadata = {
  title: "pepy.tech - Python Packages Download Stats",
  description: "View download stats for more than 490k python packages. Stats are updated daily",
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
