'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Heart,
  ShoppingBag,
  User,
} from 'lucide-react'

import { useCart } from '@/store/useCart'
import { useFavorites } from '@/store/useFavorites'
import AuthDrawer from './AuthDrawer'

export default function HeaderActions() {
  const { cart = [], toggleCart } = useCart()
  const favorites = useFavorites(
    (state) => state.favorites
  )

  const [isAuthOpen, setIsAuthOpen] =
    useState(false)

  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  const favoriteCount =
    mounted ? favorites.length : 0

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Account */}
      <button
        type="button"
        onClick={() =>
          setIsAuthOpen(true)
        }
        className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        aria-label="Account"
        title="Account"
      >
        <User
          className="h-[21px] w-[21px]"
          strokeWidth={1.7}
        />
      </button>

      <AuthDrawer
        isOpen={isAuthOpen}
        onClose={() =>
          setIsAuthOpen(false)
        }
      />

      {/* Favorites */}
      <Link
        href="/favorites"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        aria-label="Favorites"
        title="Favorites"
      >
        <Heart
          className="h-[21px] w-[21px]"
          strokeWidth={1.7}
        />

        {favoriteCount > 0 && (
          <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold leading-none text-black">
            {favoriteCount > 9
              ? '9+'
              : favoriteCount}
          </span>
        )}
      </Link>

      {/* Shopping Bag */}
      <button
        type="button"
        onClick={toggleCart}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        aria-label="Shopping bag"
        title="Shopping Bag"
      >
        <ShoppingBag
          className="h-[21px] w-[21px]"
          strokeWidth={1.7}
        />

        {mounted && itemCount > 0 && (
          <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold leading-none text-black">
            {itemCount > 9
              ? '9+'
              : itemCount}
          </span>
        )}
      </button>
    </div>
  )
}
