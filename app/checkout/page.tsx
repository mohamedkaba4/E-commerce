'use client'

import { useCart } from '@/store/useCart'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function CheckoutPage() {
  const { items = [], totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by waiting until mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="max-w-[1600px] mx-auto px-6 md:px-10 py-32 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-900 w-48 mx-auto rounded mb-4" />
          <div className="h-4 bg-neutral-900 w-24 mx-auto rounded" />
        </div>
      </main>
    )
  }

  const safeItems = items || []
  const total = typeof totalPrice === 'function' ? totalPrice() : 0

  if (safeItems.length === 0) {
    return (
      <main className="max-w-[1600px] mx-auto px-6 md:px-10 py-32 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter italic text-neutral-800">Your Cart is Empty</h1>
        <p className="text-xs text-neutral-500 uppercase tracking-widest mt-2">Add gear to your cart to checkout</p>
        <Link 
          href="/products" 
          className="inline-block mt-8 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black px-6 py-3 hover:bg-zinc-200 transition-colors"
        >
          Browse Gear
        </Link>
      </main>
    )
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Order placed successfully! (Demo)')
    clearCart()
    router.push('/')
  }

  return (
    <main className="max-w-[1600px] mx-auto px-6 md:px-10 py-16">
      <div className="mb-12">
        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mb-2">Secure Gateway</p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white italic">
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form: Delivery/Payment Details */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-white border-b border-neutral-900 pb-3 mb-6">
              1. Delivery Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                required 
                type="text" 
                placeholder="First Name" 
                className="bg-neutral-950 border border-neutral-800 text-xs text-white p-3 focus:outline-none focus:border-neutral-600"
              />
              <input 
                required 
                type="text" 
                placeholder="Last Name" 
                className="bg-neutral-950 border border-neutral-800 text-xs text-white p-3 focus:outline-none focus:border-neutral-600"
              />
              <input 
                required 
                type="text" 
                placeholder="Street Address" 
                className="sm:col-span-2 bg-neutral-950 border border-neutral-800 text-xs text-white p-3 focus:outline-none focus:border-neutral-600"
              />
              <input 
                required 
                type="text" 
                placeholder="City" 
                className="bg-neutral-950 border border-neutral-800 text-xs text-white p-3 focus:outline-none focus:border-neutral-600"
              />
              <input 
                required 
                type="text" 
                placeholder="ZIP / Postal Code" 
                className="bg-neutral-950 border border-neutral-800 text-xs text-white p-3 focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-white border-b border-neutral-900 pb-3 mb-6">
              2. Payment details
            </h2>
            <div className="space-y-4">
              <input 
                required 
                type="text" 
                placeholder="Card Number" 
                className="w-full bg-neutral-950 border border-neutral-800 text-xs text-white p-3 focus:outline-none focus:border-neutral-600"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  required 
                  type="text" 
                  placeholder="MM / YY" 
                  className="bg-neutral-950 border border-neutral-800 text-xs text-white p-3 focus:outline-none focus:border-neutral-600"
                />
                <input 
                  required 
                  type="text" 
                  placeholder="CVV" 
                  className="bg-neutral-950 border border-neutral-800 text-xs text-white p-3 focus:outline-none focus:border-neutral-600"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black py-4 hover:bg-neutral-200 transition-colors duration-200 cursor-pointer"
          >
            Authorize Payment — ${total.toFixed(2)}
          </button>
        </form>

        {/* Right Summary: Cart Items Panel */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 p-6 self-start space-y-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-white">
            Order Summary
          </h2>

          <div className="divide-y divide-neutral-900 max-h-[400px] overflow-y-auto pr-2">
            {safeItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} className="py-4 flex gap-4">
                <div className="w-16 h-20 bg-neutral-900 flex-shrink-0 relative">
                  {item.images?.[0] && (
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-xs font-bold text-white truncate">{item.name}</h3>
                  <p className="text-[10px] text-neutral-500 uppercase mt-1">
                    Qty: {item.quantity} {item.selectedSize && `| Size: ${item.selectedSize}`}
                  </p>
                  <p className="text-xs font-semibold text-white mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-900 pt-6 space-y-2">
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Shipping</span>
              <span className="uppercase text-[10px] font-bold text-green-500">Free</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-4 border-t border-neutral-900">
              <span>Total due</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
