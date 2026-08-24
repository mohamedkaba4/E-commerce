'use client'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-32">
      <a href="/checkout" className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors mb-8 block">
        ← Return to Checkout
      </a>

      <div className="mb-16">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Authentication Interface</h2>
        <h1 className="text-5xl font-black uppercase tracking-tight italic text-white">Sign In</h1>
        <p className="text-neutral-500 mt-6 max-w-md">Sign in to your secure operational profile to manage gear manifests and delivery endpoints.</p>
      </div>

      <div className="max-w-md space-y-4">
        <button 
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-200 transition-colors"
        >
          Sign in with Google
        </button>
      </div>

      <div className="mt-32 flex gap-12 border-t border-neutral-900 pt-8">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-neutral-600">System Status</p>
          <p className="text-xs font-bold text-white">OPERATIONAL</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-neutral-600">Region Gated</p>
          <p className="text-xs font-bold text-white">GLOBAL DISPATCH</p>
        </div>
      </div>
    </main>
  )
}
