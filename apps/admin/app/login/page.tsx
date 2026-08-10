'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Mavencrest Admin</h1>

        <p className="mt-3 text-neutral-400">
          Sign in to access the administration portal.
        </p>

        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="mt-6 rounded-lg bg-white px-5 py-3 font-medium text-black"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  )
}
