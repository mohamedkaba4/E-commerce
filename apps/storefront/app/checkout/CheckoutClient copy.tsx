'use client'

import { useCart } from '@/store/useCart'
import { useState, useEffect } from 'react'
import AuthForm from './AuthForm'
import Image from 'next/image'

type User = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export default function CheckoutClient({ user }: { user: User | null }) {
  const { cart, totalPrice, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<'selection' | 'auth' | 'guest'>(
    user ? 'guest' : 'selection'
  )
  const [purchaseComplete, setPurchaseComplete] = useState(false)

  const total = typeof totalPrice === 'function' ? totalPrice() : 0

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (purchaseComplete) {
    return (
      <main className="max-w-[800px] mx-auto py-32 px-6 text-center">
        <h1 className="text-4xl font-black uppercase tracking-widest mb-6">
          Thank You For Your Purchase
        </h1>
        <p className="text-neutral-400 mb-8">Your order has been received.</p>
        {user && <p className="mb-8 text-sm text-neutral-500">Confirmation sent to {user.email}</p>}
        <button onClick={() => window.location.href = '/'} className="bg-white text-black px-8 py-3 font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-200 transition-colors">
          Return Home
        </button>
      </main>
    )
  }

  if (mode === 'auth') return <AuthForm onBack={() => setMode('selection')} />

  if (mode === 'selection') {
    return (
      <main className="max-w-[800px] mx-auto py-32 px-6 text-center">
        <h1 className="text-3xl font-black uppercase tracking-widest mb-16">Choose How To Check Out</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button onClick={() => setMode('auth')} className="border border-neutral-800 p-8 hover:bg-neutral-900 transition-colors">
            <h2 className="text-xl font-bold mb-2">Member</h2>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500">Log in / Sign up</p>
          </button>
          <button onClick={() => setMode('guest')} className="border border-neutral-800 p-8 hover:bg-neutral-900 transition-colors">
            <h2 className="text-xl font-bold mb-2">Guest</h2>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500">Checkout as Guest</p>
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-[600px] mx-auto px-6 py-16">
      <h1 className="text-2xl font-black uppercase tracking-widest mb-12">Complete Purchase</h1>

      {user && (
        <div className="mb-12 pb-8 border-b border-neutral-900">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4">Customer Info</h2>
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-neutral-400">{user.email}</p>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Order Summary</h2>
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 items-start">
            {item.imageUrl ? (
              <Image src={item.imageUrl} alt={item.name} width={100} height={100} className="rounded-sm object-cover bg-neutral-900" />
            ) : (
              <div className="w-[100px] h-[100px] bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-700">NO IMAGE</div>
            )}
            <div className="flex-1 py-1">
              <p className="font-bold text-sm">{item.name}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Size: {item.size} • Color: {item.color}</p>
              <p className="text-xs mt-2">Quantity: {item.quantity}</p>
            </div>
            <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="pt-6 border-t border-neutral-900 flex justify-between items-center text-lg font-black uppercase tracking-widest">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="w-full bg-white text-black py-4 font-black uppercase tracking-widest text-[10px] mt-12 hover:bg-neutral-200 transition-colors"
        onClick={() => {
          clearCart()
          setPurchaseComplete(true)
        }}
      >
        Finish Purchase
      </button>
    </main>
  )
}
