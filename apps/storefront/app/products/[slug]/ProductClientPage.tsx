'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { useFavorites } from '@/store/useFavorites'

interface ProductClientProps {
  product: {
    id: string
    slug: string
    name: string
    description: string
    price: number
    compareAt?: number | null
    images: string[]
    sizes: string[]
    colors: string[]
    category?: { name: string } | null
  }
}

export default function ProductClientPage({
  product,
}: ProductClientProps) {
  const { addToCart } = useCart()

  const favorites = useFavorites(
    (state) => state.favorites
  )
  const toggleFavorite = useFavorites(
    (state) => state.toggleFavorite
  )

  const images =
    product.images?.length > 0
      ? product.images
      : [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000',
        ]

  const sizes =
    product.sizes?.length > 0
      ? product.sizes
      : ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']

  const colors =
    product.colors?.length > 0
      ? product.colors
      : ['Default']

  const [activeImageIdx, setActiveImageIdx] =
    useState(0)

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null)

  const [selectedColor] =
    useState<string>(colors[0])

  const [added, setAdded] = useState(false)

  const favorite = favorites.some(
    (item) => item.id === product.id
  )

  const discount = product.compareAt
    ? Math.round(
        ((product.compareAt - product.price) /
          product.compareAt) *
          100
      )
    : null

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first!')
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: images[0],
      slug: product.slug,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    })

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  const handleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      compareAt: product.compareAt,
      imageUrl: images[0],
      category: product.category?.name,
    })
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-black px-4 py-12 text-white md:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">

        {/* LEFT PANEL */}
        <div className="space-y-4 lg:col-span-7">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded border border-neutral-800 bg-neutral-900">
            <Image
              src={images[activeImageIdx]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-all duration-300"
              unoptimized
            />

            {discount && (
              <span className="absolute left-4 top-4 bg-[#E0FF00] px-3 py-1 text-xs font-black uppercase tracking-wider text-black">
                -{discount}% OFF
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setActiveImageIdx(idx)
                  }
                  className={`relative aspect-[4/5] overflow-hidden rounded border bg-neutral-900 transition-all ${
                    activeImageIdx === idx
                      ? 'scale-[0.98] border-[#E0FF00]'
                      : 'border-neutral-900 hover:border-neutral-700'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} gallery image ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col justify-center space-y-8 lg:col-span-5">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#E0FF00]">
              {product.category?.name ||
                'TRAINING'}
            </span>

            <h1 className="mt-1 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-black text-white">
                ${product.price.toFixed(2)}
              </span>

              {product.compareAt && (
                <span className="text-lg text-neutral-600 line-through">
                  ${product.compareAt.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-neutral-400">
            {product.description ||
              'Premium athletic footwear built for responsive lateral stability, cushioning, and elite workout performance.'}
          </p>

          {/* SIZE SELECTOR */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Select Size:{' '}
                <span className="text-[#E0FF00]">
                  {selectedSize ||
                    'Choose size'}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`rounded border py-3.5 text-xs font-black uppercase transition-all ${
                    selectedSize === size
                      ? 'border-[#E0FF00] bg-[#E0FF00] text-black'
                      : 'border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                added
                  ? 'scale-[0.99] bg-emerald-500 text-black'
                  : 'bg-[#E0FF00] text-black hover:scale-[1.01] hover:bg-white'
              }`}
            >
              {added
                ? '✓ Added to Training Bag!'
                : 'Add to Training Bag'}
            </button>

            <button
              type="button"
              onClick={handleFavorite}
              className="flex w-full items-center justify-center gap-2 border border-neutral-700 bg-transparent py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              <Heart
                className={`h-4 w-4 ${
                  favorite
                    ? 'fill-current'
                    : ''
                }`}
                strokeWidth={1.8}
              />

              {favorite
                ? 'Added to Wishlist'
                : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
