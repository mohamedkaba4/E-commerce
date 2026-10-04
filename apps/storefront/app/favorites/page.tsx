'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Heart,
  Trash2,
} from 'lucide-react'

import { useFavorites } from '@/store/useFavorites'

export default function FavoritesPage() {
  const favorites = useFavorites(
    (state) => state.favorites
  )

  const removeFavorite =
    useFavorites(
      (state) =>
        state.removeFavorite
    )

  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-[1600px] px-6 py-12 md:px-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Favorites
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          {favorites.length}{' '}
          {favorites.length === 1
            ? 'saved item'
            : 'saved items'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <Heart
            className="mb-5 h-10 w-10 text-neutral-600"
            strokeWidth={1.4}
          />

          <h2 className="text-xl font-semibold">
            Nothing saved yet
          </h2>

          <p className="mt-2 max-w-sm text-sm text-neutral-500">
            Select the heart on a product to save it here.
          </p>

          <Link
            href="/products"
            className="mt-7 bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            Shop Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map(
            (product) => (
              <div key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f4f4]">
                    {product.imageUrl && (
                      <Image
                        src={
                          product.imageUrl
                        }
                        alt={
                          product.name
                        }
                        fill
                        className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                        unoptimized
                      />
                    )}

                    <button
                      type="button"
                      onClick={(
                        event
                      ) => {
                        event.preventDefault()
                        event.stopPropagation()

                        removeFavorite(
                          product.id
                        )
                      }}
                      className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm transition hover:bg-neutral-100"
                      aria-label="Remove favorite"
                    >
                      <Trash2
                        className="h-4 w-4"
                        strokeWidth={
                          1.8
                        }
                      />
                    </button>
                  </div>

                  <div className="pt-4">
                    {product.category && (
                      <p className="mb-1 text-xs text-neutral-500">
                        {
                          product.category
                        }
                      </p>
                    )}

                    <h2 className="text-sm font-semibold">
                      {product.name}
                    </h2>

                    <div className="mt-2 flex gap-2">
                      <span className="text-sm font-semibold">
                        $
                        {product.price.toFixed(
                          2
                        )}
                      </span>

                      {product.compareAt && (
                        <span className="text-sm text-neutral-500 line-through">
                          $
                          {product.compareAt.toFixed(
                            2
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </main>
  )
}
