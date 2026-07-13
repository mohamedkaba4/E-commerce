"use client";

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { Providers } from "@/app/components/Providers";
import ProductCard from '@/app/components/ProductCard';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const categories = [
    { name: "MEN", href: "/categories/men" },
    { name: "WOMEN", href: "/categories/women" },
    { name: "KIDS", href: "/categories/kids" },
    { name: "RUNNING", href: "/categories/running" },
    { name: "NUTRITION", href: "/categories/nutrition" },
    { name: "SALE", href: "/categories/sale" },
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased min-h-screen flex flex-col`}>
        <Providers>
          {/* Global Mega Header Navigation */}
          <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-white/5 px-6 md:px-10 h-16 flex items-center justify-between">
            
            {/* Left: Brand Identity Logo */}
            <div className="flex items-center gap-10">
              <Link href="/" className="inline-block flex-shrink-0">
                <img 
                  src="/logo.svg" 
                  alt="Mavencrest Logo" 
                  className="h-7 w-auto invert brightness-200" 
                />
              </Link>

              {/* Middle: Text Navigation Category Links (HIDDEN ONLY ON HOMEPAGE) */}
              {!isHomePage && (
                <nav className="hidden md:flex items-center gap-6 font-black text-xs tracking-wider">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.name} 
                      href={cat.href} 
                      className="text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </nav>
              )}
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

              {/* Action Interactive Utility Links */}
              <div className="flex items-center gap-4">
                <div className="relative cursor-pointer group">
                  <User className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="absolute -top-1.5 -right-1.5 bg-zinc-700 text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold text-white border border-black">
                    1
                  </span>
                </div>
                
                <Heart className="w-5 h-5 text-zinc-400 hover:text-white transition-colors cursor-pointer" />
                <ShoppingBag className="w-5 h-5 text-zinc-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>

          </header>

          {/* Dynamic Core Body Page Slot Injection */}
          <main className="flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
