'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/store/useCart'
import { Heart, ShoppingBag, User } from 'lucide-react'
import AuthDrawer from './AuthDrawer'

export default function HeaderActions() {
  const { cart = [], toggleCart } = useCart()
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setIsAuthOpen(true)} className="p-1.5" title="Account">
        <User className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
      </button>
      <AuthDrawer isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <a title="Favorites" href="/favorites">
        <Heart className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
      </a>

      <button onClick={toggleCart} className="relative p-1.5" title="Shopping Cart">
        <ShoppingBag className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
        {mounted && itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>
    </div>
  )
}
