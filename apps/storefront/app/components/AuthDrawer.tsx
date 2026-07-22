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
            <div className="space-y-8">
              <h2 className="text-xl font-black uppercase tracking-widest">Account</h2>
              <div className="flex items-center gap-4">
                {session.user.image ? (
                  <img src={session.user.image} className="w-12 h-12 rounded-full border border-neutral-800" alt="Profile" />
                ) : (
                  <div className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                )}
                <div>
                  <p className="font-bold text-sm">{session.user.name}</p>
                  <p className="text-xs text-neutral-500">{session.user.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-y border-neutral-900 py-6">
                {[
                  { label: 'Order History', href: '/orders' },
                  { label: 'Subscriptions', href: '/subscriptions' },
                  { label: 'Account Settings', href: '/settings' },
                  { label: 'Help & Support', href: '/support' }
                ].map((item) => (
                  <a key={item.href} href={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">
                    {item.label}
                  </a>
                ))}
              </div>

              <button onClick={() => signOut()} className="w-full border border-neutral-700 py-3 text-[10px] uppercase font-bold hover:bg-neutral-900 transition-colors">
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black uppercase tracking-widest mb-8">Log in or sign up</h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button onClick={() => signIn('google')} className="border border-neutral-700 py-3 text-[10px] uppercase font-bold hover:bg-neutral-900 transition-colors">Google</button>
                <button onClick={() => signIn('github')} className="border border-neutral-700 py-3 text-[10px] uppercase font-bold hover:bg-neutral-900 transition-colors">Github</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
