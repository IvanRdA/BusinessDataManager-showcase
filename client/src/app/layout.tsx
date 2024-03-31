import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "La Poma - Data manager",
  description: "Schedule and employee manager for La Poma Restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="w-[100%] h-[100vh] font-playfair overflow-auto bg-gradient-to-br from-mainRed-800 to-mainRed-800">
        {children}
      </body>
    </html>
  );
}
