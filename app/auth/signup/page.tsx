'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'

function SignUpContent() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      router.push('/auth/signin?success=Account created successfully')
    } catch (err: any) {
      setError(err.message || 'Failed to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="section-container min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-900 p-8 space-y-6">
        <div>
          <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mb-2">Join Us</p>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">Create Account</h1>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-900 text-red-400 text-xs p-3 font-medium uppercase tracking-wider">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-accent text-black font-black uppercase text-[10px] tracking-[0.2em] py-3 mt-2 transition-all hover:bg-white disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => router.push('/auth/signin')}
            className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors"
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </main>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <main className="section-container min-h-[80vh] flex items-center justify-center animate-pulse">
        <div className="w-full max-w-md bg-neutral-950 border border-neutral-900 p-8 space-y-6 h-[450px]" />
      </main>
    }>
      <SignUpContent />
    </Suspense>
  )
}