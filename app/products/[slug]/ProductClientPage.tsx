'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/store/useCart'

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

export default function ProductClientPage({ product }: ProductClientProps) {
  const { addToCart } = useCart()

  // Safely fallback to beautiful placeholders if images/sizes are empty in DB
  const images = product.images?.length > 0 ? product.images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000']
  const sizes = product.sizes?.length > 0 ? product.sizes : ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  const colors = product.colors?.length > 0 ? product.colors : ['Default']

  // Core interactive UI states
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>(colors[0])
  const [added, setAdded] = useState(false)

  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
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
      image: images[0],
      slug: product.slug,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-white min-h-screen bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* LEFT PANEL: INTERACTIVE GALLERY */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] w-full bg-neutral-900 border border-neutral-800 overflow-hidden rounded">
            <Image
              src={images[activeImageIdx]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-all duration-300"
              unoptimized
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-[#E0FF00] text-black text-xs font-black uppercase tracking-wider px-3 py-1">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails list that switches the active main image on click */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-[4/5] bg-neutral-900 border overflow-hidden rounded transition-all ${
                    activeImageIdx === idx 
                      ? 'border-[#E0FF00] scale-[0.98]' 
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

        {/* RIGHT PANEL: ACTIONS & PRODUCT DETAILS */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
          <div>
            <span className="text-xs text-[#E0FF00] uppercase tracking-[0.3em] font-bold font-mono">
              {product.category?.name || 'TRAINING'}
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1 leading-none">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mt-4">
              <span className="text-2xl font-black text-white">${product.price.toFixed(2)}</span>
              {product.compareAt && (
                <span className="text-lg text-neutral-600 line-through">${product.compareAt.toFixed(2)}</span>
              )}
            </div>
          </div>

          <p className="text-neutral-400 text-sm leading-relaxed">
            {product.description || "Premium athletic footwear built for responsive lateral stability, cushioning, and elite workout performance."}
          </p>

          {/* SIZES SELECTOR (DYNAMIC) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                Select Size: <span className="text-[#E0FF00]">{selectedSize || 'Choose size'}</span>
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-xs py-3.5 font-black uppercase transition-all rounded border ${
                    selectedSize === size
                      ? 'bg-[#E0FF00] text-black border-[#E0FF00]'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO BAG ACTION */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 uppercase font-black tracking-[0.2em] text-xs transition-all duration-300 ${
              added 
                ? 'bg-emerald-500 text-black scale-[0.99]' 
                : 'bg-[#E0FF00] text-black hover:bg-white hover:scale-[1.01]'
            }`}
          >
            {added ? '✓ Added to Training Bag!' : 'Add to Training Bag'}
          </button>
        </div>

      </div>
    </main>
  )
}