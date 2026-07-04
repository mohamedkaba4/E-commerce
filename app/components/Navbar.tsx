'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/store/useCart'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Men', href: '/products?category=men' },
  { label: 'Women', href: '/products?category=women' },
  { label: 'Kids', href: '/products?category=kids' },
  { label: 'Running', href: '/products?category=running' },
  { label: 'Nutrition', href: '/products?category=nutrition' },
  { label: 'Sale', href: '/products?sale=true', accent: true },
]

export default function Navbar() {
  const { data: session } = useSession()
  const { totalItems, toggleCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = totalItems()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-md border-b border-neutral-800' : 'bg-black'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-black text-xl italic tracking-tighter text-white hover:text-brand-accent transition-colors duration-200 select-none"
          >
            MAVENCREST
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link ${
                  link.accent ? 'text-red-500 hover:text-red-400' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Link
              href="/products"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* Account */}
            {session ? (
              <div className="relative group">
                <button className="text-neutral-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <div className="absolute right-0 top-8 w-44 bg-neutral-900 border border-neutral-800 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl">
                  <div className="px-3 py-2 border-b border-neutral-800">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Signed in as</p>
                    <p className="text-xs text-white truncate mt-0.5">{session.user?.email}</p>
                  </div>
                  <Link href="/orders" className="block px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                    My Orders
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] bg-brand-accent text-black px-4 py-2 hover:bg-white transition-colors duration-200"
              >
                Sign In
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative text-neutral-400 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden text-neutral-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-neutral-900 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`nav-link text-sm ${link.accent ? 'text-red-500' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {!session && (
              <Link
                href="/auth/signin"
                onClick={() => setMenuOpen(false)}
                className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-accent text-black px-4 py-2 text-center"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-[60px]" />
    </>
  )
}
