'use client'

import { useState } from 'react'
import { useCart } from '@/store/useCart'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { CheckoutForm } from '@/types'

type Step = 'shipping' | 'payment' | 'confirmation'

const EMPTY_FORM: CheckoutForm = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  cardName: '',
}

function formatCardNumber(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim()
}

function formatExpiry(v: string) {
  const clean = v.replace(/\D/g, '').slice(0, 4)
  if (clean.length >= 3) return `${clean.slice(0, 2)}/${clean.slice(2)}`
  return clean
}

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const total = totalPrice()

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM)
  const [step, setStep] = useState<Step>('shipping')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const update = (field: keyof CheckoutForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  const shippingValid =
    form.firstName && form.lastName && form.email && form.address && form.city && form.state && form.zip

  const paymentValid = form.cardNumber.replace(/\s/g, '').length === 16 && form.cardExpiry.length === 5 && form.cardCvc.length >= 3 && form.cardName

  const handleSubmit = async () => {
    if (!paymentValid) return
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((i) => ({
            id: i.id,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
            price: i.price,
          })),
          ...form,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to place order')

      setOrderId(data.orderId)
      clearCart()
      setStep('confirmation')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <main className="section-container text-center py-24">
        <p className="text-neutral-400 mb-4">Your cart is empty.</p>
        <Link href="/products" className="text-[11px] font-black uppercase tracking-[0.2em] bg-brand-accent text-black px-8 py-4">
          Shop Now
        </Link>
      </main>
    )
  }

  if (step === 'confirmation') {
    return (
      <main className="section-container max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Order Confirmed</h1>
        <p className="text-neutral-400 text-sm mb-1">Thanks, {form.firstName}! Your order is being processed.</p>
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Order ID</p>
        <p className="text-xs font-mono text-brand-accent mb-8">{orderId}</p>
        <p className="text-sm text-neutral-500 mb-8">
          A confirmation will be sent to <span className="text-white">{form.email}</span>
        </p>
        <Link
          href="/products"
          className="inline-block text-[11px] font-black uppercase tracking-[0.2em] bg-brand-accent text-black px-10 py-4 hover:bg-white transition-colors"
        >
          Keep Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
        {/* Left: Form */}
        <div>
          {/* Steps indicator */}
          <div className="flex items-center gap-3 mb-10">
            {['Shipping', 'Payment'].map((s, i) => {
              const active = (i === 0 && step === 'shipping') || (i === 1 && step === 'payment')
              const done = (i === 0 && step === 'payment')
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 ${active ? 'text-white' : done ? 'text-brand-accent' : 'text-neutral-600'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border ${active ? 'bg-brand-accent border-brand-accent text-black' : done ? 'bg-brand-accent border-brand-accent text-black' : 'border-neutral-800'}`}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider">{s}</span>
                  </div>
                  {i < 1 && <div className="w-8 h-px bg-neutral-800" />}
                </div>
              )
            })}
          </div>

          {/* Shipping Form */}
          {step === 'shipping' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-tight text-white">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">First Name</label>
                  <input
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                    placeholder="Alex"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Last Name</label>
                  <input
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                    placeholder="Johnson"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                  placeholder="alex@example.com"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Street Address</label>
                <input
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                    placeholder="Atlanta"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">State</label>
                  <input
                    value={form.state}
                    onChange={(e) => update('state', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                    placeholder="GA"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">ZIP</label>
                  <input
                    value={form.zip}
                    onChange={(e) => update('zip', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                    placeholder="30301"
                    maxLength={10}
                  />
                </div>
              </div>

              <button
                onClick={() => shippingValid && setStep('payment')}
                disabled={!shippingValid}
                className={`w-full py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                  shippingValid
                    ? 'bg-brand-accent text-black hover:bg-white'
                    : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                }`}
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment Form */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-tight text-white">Payment</h2>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-[9px] text-neutral-500 uppercase tracking-wider hover:text-white transition-colors"
                >
                  ← Edit shipping
                </button>
              </div>

              {/* Fake card notice */}
              <div className="bg-neutral-900 border border-neutral-800 px-4 py-3 flex items-center gap-3">
                <span className="text-brand-accent text-sm">⚡</span>
                <p className="text-[10px] text-neutral-400">Demo mode — use any card number (16 digits)</p>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Card Number</label>
                <input
                  value={form.cardNumber}
                  onChange={(e) => update('cardNumber', formatCardNumber(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors font-mono tracking-wider"
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Expiry</label>
                  <input
                    value={form.cardExpiry}
                    onChange={(e) => update('cardExpiry', formatExpiry(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors font-mono"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">CVC</label>
                  <input
                    value={form.cardCvc}
                    onChange={(e) => update('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors font-mono"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Name on Card</label>
                <input
                  value={form.cardName}
                  onChange={(e) => update('cardName', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white px-3 py-2.5 focus:outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Alex Johnson"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-4 py-3">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!paymentValid || submitting}
                className={`w-full py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                  !paymentValid || submitting
                    ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                    : 'bg-brand-accent text-black hover:bg-white'
                }`}
              >
                {submitting ? 'Processing...' : `Place Order — $${total.toFixed(2)}`}
              </button>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-neutral-950 border border-neutral-900 p-6 space-y-5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Order Summary</h3>
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="relative w-14 h-16 bg-neutral-900 shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-700 rounded-full flex items-center justify-center text-[9px] font-black text-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white line-clamp-1">{item.name}</p>
                    <p className="text-[9px] text-neutral-500 mt-0.5">{item.size} / {item.color}</p>
                    <p className="text-xs font-black text-white mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-900 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Shipping</span>
                <span className="text-brand-accent">{total >= 100 ? 'Free' : '$9.99'}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white border-t border-neutral-900 pt-2 mt-2">
                <span>Total</span>
                <span>${(total >= 100 ? total : total + 9.99).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
