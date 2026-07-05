'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/store/useCart'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product & { image?: string } // Fallback tracking for mock singular data format
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0)
  const { addToCart } = useCart()

  const discount =
    product.compareAt
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : null

  // Safely extract whatever image source exists
  const productImages = product.images || (product.image ? [product.image] : [])
  const primaryImage = productImages[imgIdx] || productImages[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: productImages[0] || '',
      slug: product.slug || 'product-slug',
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0] || 'Black',
      quantity: 1,
    })
  }

  return (
    <Link
      href={`/products/${product.slug || ''}`}
      className="group block retail-card"
    >
      {/* Image Container */}
      <div
        className="relative aspect-[3/4] bg-neutral-900 overflow-hidden"
        onMouseEnter={() => productImages[1] && setImgIdx(1)}
        onMouseLeave={() => setImgIdx(0)}
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          unoptimized // Prevents domains hostname configuration restrictions during immediate development testing
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && (
            <span className="bg-brand-accent text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5">
              -{discount}%
            </span>
          )}
          {product.featured && !discount && (
            <span className="bg-white text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5">
              Featured
            </span>
          )}
        </div>

        {/* Quick Add Toggle */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-3 right-3 bg-black/90 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-brand-accent hover:text-black"
        >
          Quick Add
        </button>
      </div>

      {/* Info Blocks */}
      <div className="p-3 space-y-1">
        <p className="text-[9px] text-neutral-600 uppercase tracking-[0.2em]">
          {typeof product.category === 'string' ? product.category : product.category?.name}
        </p>
        <h3 className="text-xs font-bold text-white group-hover:text-brand-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-white">${product.price.toFixed(2)}</span>
          {product.compareAt && (
            <span className="text-xs text-neutral-600 line-through">${product.compareAt.toFixed(2)}</span>
          )}
        </div>

        {/* Available Variant Indicators */}
        {product.colors?.length > 0 && (
          <div className="flex gap-1 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="text-[8px] text-neutral-600 border border-neutral-800 px-1.5 py-0.5 uppercase tracking-wider"
              >
                {color}
              </span>
            ))}
            {product.colors.length > 4 && (
              <span className="text-[8px] text-neutral-600">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}