import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Work Journal App",
  description: "Start journalizing your life!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0b111e]`}>
        <Header />
        <main className="flex flex-col items-center justify-between max-w-4xl min-h-screen p-4 mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
