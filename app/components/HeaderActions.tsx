'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/store/useCart'
import { User, Heart, ShoppingBag } from 'lucide-react'

export default function HeaderActions() {
  const { data: session } = useSession()
  const { totalItems, toggleCart } = useCart()
  const itemCount = totalItems()

  return (
    <div className="flex items-center gap-4">
      {/* Account / Profile Icon */}
      {session ? (
        <div className="relative group">
          <button className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <User className="w-5 h-5" />
          </button>
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-6 w-44 bg-zinc-950 border border-zinc-800 rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="px-3 py-2 border-b border-zinc-900">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Signed in as</p>
              <p className="text-xs text-white truncate mt-0.5">{session.user?.email}</p>
            </div>
            <Link href="/orders" className="block px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
              My Orders
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <Link href="/auth/signin" className="relative group" title="Sign In">
          <User className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
        </Link>
      )}

      {/* Heart / Favorites Link */}
      <Link href="/wishlist" title="Favorites">
        <Heart className="w-5 h-5 text-zinc-400 hover:text-white transition-colors cursor-pointer" />
      </Link>

      {/* Shopping Bag / Toggle Cart */}
      <button 
        onClick={toggleCart} 
        className="relative text-zinc-400 hover:text-white transition-colors cursor-pointer"
        title="Shopping Cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>
    </div>
  )
}
