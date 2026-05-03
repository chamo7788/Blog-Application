import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "A full-stack blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-white font-sans antialiased text-gray-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full mx-auto">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
