'use client'

import { useCart } from '@/store/useCart'
import { useState, useEffect } from 'react'
import AuthForm from './AuthForm'
import Image from 'next/image'

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart()
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<'selection' | 'auth' | 'guest'>('selection')
  
  const total = typeof totalPrice === 'function' ? totalPrice() : 0

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  if (mode === 'auth') return <AuthForm onBack={() => setMode('selection')} />

  if (mode === 'selection') {
    return (
      <main className="max-w-[800px] mx-auto py-32 px-6 text-center">
        <h1 className="text-3xl font-bold mb-16">Choose How You Would Like To Check out</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-xl font-bold mb-4">Check out as a member</h2>
            <button onClick={() => setMode('auth')} className="w-full bg-white text-black py-4 font-bold">Login / Sign Up</button>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Check out as a Guest</h2>
            <button onClick={() => setMode('guest')} className="w-full bg-white text-black py-4 font-bold">Guest Checkout</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
    </main>
  )
}
