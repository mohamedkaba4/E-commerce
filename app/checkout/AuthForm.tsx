'use client'

import { signIn } from 'next-auth/react'

export default function AuthForm({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-neutral-900 border border-neutral-700">
      <button onClick={onBack} className="text-sm text-neutral-400 mb-4">← Back</button>
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>
      <p className="text-sm text-neutral-400 mb-6">Use your email address to continue with MavenCrest.</p>
      
      <input type="email" placeholder="Email Address*" className="w-full bg-neutral-800 p-3 mb-4 border border-neutral-700" />
      <button className="w-full bg-orange-700 text-white py-4 font-black uppercase mb-6">Continue</button>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-neutral-700 flex-1"></div>
        <span className="text-neutral-500">OR</span>
        <div className="h-px bg-neutral-700 flex-1"></div>
      </div>

      <button onClick={() => signIn('google')} className="w-full border border-neutral-600 p-3 mb-3">Continue with Google</button>
      <button onClick={() => signIn('github')} className="w-full border border-neutral-600 p-3">Continue with GitHub</button>
    </div>
  )
}