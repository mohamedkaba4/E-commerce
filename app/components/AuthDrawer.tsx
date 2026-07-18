'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { signIn } from 'next-auth/react'

export default function AuthDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/60" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-[#0a0a0a] h-full shadow-2xl border-l border-neutral-800 flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header container with fixed height to keep the X at the top */}
        <div className="p-8 pb-4 flex justify-end">
          <button onClick={onClose} className="text-white text-xl">✕</button>
        </div>
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-8 pt-0">
          <h2 className="text-xl font-black uppercase tracking-widest mb-8">Log in or sign up</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button onClick={() => signIn('google')} className="border border-neutral-700 py-3 text-[10px] uppercase font-bold hover:bg-neutral-900 transition-colors">Google</button>
            <button onClick={() => signIn('github')} className="border border-neutral-700 py-3 text-[10px] uppercase font-bold hover:bg-neutral-900 transition-colors">Github</button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-800"></div></div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest text-neutral-500"><span className="bg-[#0a0a0a] px-2">or</span></div>
          </div>

          <form className="space-y-4">
            <input type="email" placeholder="Email Address*" className="w-full bg-[#111] p-3 border border-neutral-800 text-sm outline-none focus:border-white" />
            <button className="w-full bg-white text-black py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-neutral-200 transition-colors">Continue</button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}
