'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import HeaderActions from './HeaderActions'

const navLinks = [
  {
    label: 'New',
    href: '/products',
  },
  {
    label: 'Men',
    href: '/products?category=men',
  },
  {
    label: 'Women',
    href: '/products?category=women',
  },
  {
    label: 'Kids',
    href: '/products?category=kids',
  },
  {
    label: 'Running',
    href: '/products?category=running',
  },
  {
    label: 'Nutrition',
    href: '/products?category=nutrition',
  },
  {
    label: 'Sale',
    href: '/products?sale=true',
  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility Bar */}
      <div className="relative hidden h-8 bg-black text-white md:block">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-end px-8 xl:px-12">
          <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-wide">
            FREE SHIPPING ON ORDERS $75+
          </p>

          <div className="flex items-center gap-6 text-[11px] text-neutral-300">
            <Link
              href="/support"
              className="transition-colors hover:text-white"
            >
              Help
            </Link>

            <span>US</span>

            <Link
              href="/auth/login"
              className="transition-colors hover:text-white"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-neutral-200 bg-white text-black">
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="mr-8 flex flex-shrink-0 items-center"
            aria-label="Mavencrest Home"
          >
            <img
              src="/logo.svg"
              alt="Mavencrest"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden h-full flex-1 items-center lg:flex">
            <div className="flex h-full items-center gap-7 xl:gap-9">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative flex h-full items-center text-[14px] font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-black after:transition-all hover:after:w-full ${
                    link.label === 'Sale'
                      ? 'text-red-600'
                      : 'text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-1 xl:gap-3">
            {/* Desktop Search */}
            <form
              action="/products"
              method="GET"
              className="relative hidden xl:block"
            >
              <input
                type="search"
                name="q"
                placeholder="Search"
                className="h-10 w-[220px] border-b border-neutral-500 bg-transparent pl-1 pr-9 text-sm text-black outline-none placeholder:text-neutral-500 transition-colors focus:border-black"
              />

              <Search
                className="pointer-events-none absolute right-2 top-1/2 h-[19px] w-[19px] -translate-y-1/2"
                strokeWidth={1.7}
              />
            </form>

            {/* Tablet Search Icon */}
            <Link
              href="/products"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 md:flex xl:hidden"
              aria-label="Search products"
            >
              <Search
                className="h-[21px] w-[21px]"
                strokeWidth={1.7}
              />
            </Link>

            <HeaderActions />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 lg:hidden"
              aria-label="Toggle navigation"
            >
              {menuOpen ? (
                <X
                  className="h-6 w-6"
                  strokeWidth={1.7}
                />
              ) : (
                <Menu
                  className="h-6 w-6"
                  strokeWidth={1.7}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-neutral-200 bg-white lg:hidden">
            {/* Mobile Search */}
            <form
              action="/products"
              method="GET"
              className="border-b border-neutral-200 p-4"
            >
              <div className="relative">
                <input
                  type="search"
                  name="q"
                  placeholder="Search Mavencrest"
                  className="h-12 w-full bg-neutral-100 px-4 pr-11 text-sm outline-none placeholder:text-neutral-500"
                />

                <Search
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  strokeWidth={1.7}
                />
              </div>
            </form>

            {/* Mobile Links */}
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-[54px] items-center border-b border-neutral-100 px-5 text-base font-semibold ${
                    link.label === 'Sale'
                      ? 'text-red-600'
                      : 'text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex gap-6 px-5 py-5 text-sm text-neutral-600">
              <Link
                href="/support"
                onClick={() => setMenuOpen(false)}
              >
                Help
              </Link>

              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
