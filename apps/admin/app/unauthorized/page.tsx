'use client'

import { signOut } from 'next-auth/react'

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Access Denied
        </h1>

        <p className="mt-3 text-neutral-400">
          You are not authorized to access the Mavencrest Admin portal.
        </p>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="mt-6 rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-neutral-200"
        >
          Try a different account
        </button>
      </div>
    </main>
  )
}
