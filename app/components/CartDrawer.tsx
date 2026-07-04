'use client'

import { useCart } from '@/store/useCart'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice } = useCart()
  const total = totalPrice()

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-[#0a0a0a] border-l border-neutral-900 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-900">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Your Cart</h2>
            <p className="text-[10px] text-neutral-500 mt-0.5">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={closeCart}
            className="text-neutral-500 hover:text-white transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
                <svg className="w-7 h-7 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Nothing here yet</p>
                <p className="text-xs text-neutral-500 mt-1">Add some gear to get started.</p>
              </div>
              <button
                onClick={closeCart}
                className="text-[10px] font-black uppercase tracking-[0.2em] border border-neutral-700 text-neutral-300 px-6 py-2.5 hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                Shop Now
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-4 py-4 border-b border-neutral-900 last:border-0"
              >
                {/* Image */}
                <div className="relative w-20 h-24 bg-neutral-900 shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="text-xs font-bold text-white hover:text-brand-accent transition-colors line-clamp-2 leading-tight"
                  >
                    {item.name}
                  </Link>
                  <div className="flex gap-2 mt-1">
                    {item.size && (
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.size}</span>
                    )}
                    {item.color && (
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.color}</span>
                    )}
                  </div>
                  <p className="text-sm font-black text-white mt-1.5">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity + Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-neutral-800">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="text-[10px] text-neutral-600 hover:text-red-400 uppercase tracking-wider transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-neutral-900 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 uppercase tracking-widest">Subtotal</span>
              <span className="text-lg font-black text-white">${total.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-neutral-600">Shipping calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center text-[11px] font-black uppercase tracking-[0.2em] bg-brand-accent text-black py-4 hover:bg-white transition-colors duration-200"
            >
              Checkout — ${total.toFixed(2)}
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
