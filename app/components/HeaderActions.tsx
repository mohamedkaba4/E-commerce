'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/store/useCart'
import { User, Heart, ShoppingBag } from 'lucide-react'

export default function HeaderActions() {
  const { items = [], toggleCart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Wait for client-side mount to safely render dynamic cart state
  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="flex items-center gap-4">
      {/* Account */}
      <a className="relative g-6" title="Sign In" href="/account">
        <User className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
      </a>

      {/* Favorites */}
      <a title="Favorites" href="/favorites">
        <Heart className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
      </a>

      {/* Shopping Cart Trigger */}
      <button 
        onClick={toggleCart} 
        className="relative p-1.5" 
        title="Shopping Cart"
      >
        <ShoppingBag className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
        
        {/* Render badge only after client-side mount to eliminate hydration mismatches */}
        {mounted && itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>
    </div>
  )
}
