import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link"; // 1. Import Link
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mavencrest | Premium Gear",
  description: "Curated collection of professional athletic gear.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="p-6">
            <Link href="/" className="inline-block">
              {/* ONLY the img tag should be inside the Link */}
              <img 
                src="/logo.svg" 
                alt="Mavencrest Logo" 
                className="h-10 w-auto" 
              />
            </Link>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}