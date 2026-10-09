'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { useCart } from '@/store/useCart'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product & {
    image?: string
  }
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0)

  const { addToCart } = useCart()

  const discount =
    product.compareAt
      ? Math.round(
          ((product.compareAt - product.price) /
            product.compareAt) *
            100
        )
      : null

  const productImages =
    product.images ||
    (product.image
      ? [product.image]
      : [])

  const primaryImage =
    productImages[imgIdx] ||
    productImages[0] ||
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=85'

  const categoryName =
    typeof product.category === 'string'
      ? product.category
      : product.category?.name

  const handleQuickAdd = (
    event: React.MouseEvent
  ) => {
    event.preventDefault()
    event.stopPropagation()

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl:
        productImages[0] || '',
      slug:
        product.slug ||
        'product-slug',
      size:
        product.sizes?.[0] ||
        'M',
      color:
        product.colors?.[0] ||
        'Black',
      quantity: 1,
    })
  }

  return (
    <Link
      href={`/products/${product.slug || ''}`}
      className="group block"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden bg-[#242626]"
        onMouseEnter={() =>
          productImages[1] &&
          setImgIdx(1)
        }
        onMouseLeave={() =>
          setImgIdx(0)
        }
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 25vw"
          unoptimized
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {discount && (
            <span className="bg-brand-accent px-2 py-1 text-[10px] font-black uppercase tracking-wide text-black">
              -{discount}%
            </span>
          )}

          {product.featured &&
            !discount && (
              <span className="bg-black px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                Featured
              </span>
            )}
        </div>

        {/* Quick Add */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-4 left-4 right-4 translate-y-2 bg-black px-4 py-3 text-xs font-semibold text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-neutral-800"
        >
          Quick Add
        </button>
      </div>

      <div className="pt-4">
        {categoryName && (
          <p className="mb-1 text-xs text-neutral-500">
            {categoryName}
          </p>
        )}

        <h3 className="text-sm font-semibold text-white transition group-hover:text-neutral-300">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            ${product.price.toFixed(2)}
          </span>

          {product.compareAt && (
            <span className="text-sm text-neutral-600 line-through">
              ${product.compareAt.toFixed(2)}
            </span>
          )}
        </div>

        {product.colors &&
          product.colors.length > 0 && (
            <p className="mt-2 text-xs text-neutral-600">
              {product.colors.length}{' '}
              {product.colors.length === 1
                ? 'Color'
                : 'Colors'}
            </p>
          )}
      </div>
    </Link>
  )
}
