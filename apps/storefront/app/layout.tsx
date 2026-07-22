import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Search } from "lucide-react";
import { Providers } from "@/app/components/Providers";
import HeaderActions from "@/app/components/HeaderActions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MAVENCREST",
  description: "Curated collection of high-performance goods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-black text-zinc-100">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased selection:bg-white selection:text-black`}>
        <Providers>
          {/* Main Layout Header Navigation */}
          <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/90 backdrop-blur-xl px-6 md:px-10 h-16 flex items-center justify-between">
            
            {/* Left: Brand Identity Logo */}
            <div className="flex items-center gap-10">
              <Link href="/" className="inline-block flex-shrink-0">
                <img 
                  src="/e-logo.svg" 
                  alt="Mavencrest Logo" 
                  className="h-14 w-auto invert brightness-200" 
                />
              </Link>
            </div>

            {/* Right: Interface Actions (Search, Profile, Likes, Cart) */}
            <div className="flex items-center gap-6">
              {/* Dynamic Native Input Search Wrapper */}
              <div className="relative hidden sm:flex items-center">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-zinc-900/80 text-xs px-3 py-1.5 pr-9 border border-zinc-800 rounded focus:outline-none focus:border-zinc-700 w-48 text-zinc-200 font-medium"
                />
                <Search className="absolute right-3 w-3.5 h-3.5 text-zinc-500" />
              </div>

              {/* State-driven client actions (User Auth, Favorites, Cart) */}
              <HeaderActions />
            </div>

          </header>

          <main className="flex-1">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
