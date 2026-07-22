'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/60" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-[#0a0a0a] h-full shadow-2xl border-l border-neutral-800 flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 pb-4 flex justify-end">
          <button onClick={onClose} className="text-white text-xl">✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 pt-0">
          {session?.user ? (
            <div className="space-y-6">
              <h2 className="text-xl font-black uppercase tracking-widest">Account</h2>
              <div className="flex items-center gap-4">
                {session.user.image && <img src={session.user.image} className="w-12 h-12 rounded-full" alt="Profile" />}
                <div>
                  <p className="font-bold text-sm">{session.user.name}</p>
                  <p className="text-xs text-neutral-500">{session.user.email}</p>
                </div>
              </div>
              <div className="border-t border-neutral-800 pt-6 space-y-2">
                <a href="/account" className="block text-xs uppercase tracking-widest hover:text-white text-neutral-400">Pro Membership</a>
                <a href="/settings" className="block text-xs uppercase tracking-widest hover:text-white text-neutral-400">Settings</a>
                <button onClick={() => signOut()} className="w-full mt-4 border border-neutral-700 py-3 text-[10px] uppercase font-bold hover:bg-neutral-900 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black uppercase tracking-widest mb-8">Log in or sign up</h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button onClick={() => signIn('google')} className="border border-neutral-700 py-3 text-[10px] uppercase font-bold hover:bg-neutral-900 transition-colors">Google</button>
                <button onClick={() => signIn('github')} className="border border-neutral-700 py-3 text-[10px] uppercase font-bold hover:bg-neutral-900 transition-colors">Github</button>
              </div>
              <form className="space-y-4">
                <input type="email" placeholder="Email Address*" className="w-full bg-[#111] p-3 border border-neutral-800 text-sm outline-none focus:border-white" />
                <button className="w-full bg-white text-black py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-neutral-200 transition-colors">Continue</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
