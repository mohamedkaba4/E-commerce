'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-1 hover:text-brand-accent transition-colors"
        aria-label="Account Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-neutral-800 p-2 shadow-xl z-50">
          <Link href="/account/orders" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-[10px] uppercase tracking-wider hover:bg-neutral-900 transition-colors">Orders</Link>
          <Link href="/account/settings" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-[10px] uppercase tracking-wider hover:bg-neutral-900 transition-colors">Settings</Link>
          <button className="block w-full text-left px-4 py-2 text-[10px] uppercase tracking-wider text-red-500 hover:bg-neutral-900 transition-colors">Logout</button>
        </div>
      )}
    </div>
  )
}
