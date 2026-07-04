'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // Auto sign-in after registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) throw new Error(result.error)

      router.push('/')
      router.refresh()
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="text-2xl font-black italic tracking-tighter text-white hover:text-brand-accent transition-colors">
            MAVENCREST
          </Link>
          <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mt-3">Create Account</p>
        </div>

        <div className="bg-neutral-950 border border-neutral-900 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="Alex Johnson"
              />
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="Min 8 characters"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                loading
                  ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                  : 'bg-brand-accent text-black hover:bg-white'
              }`}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-neutral-600 mt-5">
          Already a member?{' '}
          <Link href="/auth/signin" className="text-white hover:text-brand-accent transition-colors font-bold uppercase tracking-wider">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}
