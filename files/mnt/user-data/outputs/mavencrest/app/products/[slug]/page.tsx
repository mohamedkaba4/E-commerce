'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import ProductCard from '../../components/ui/ProductCard'
import type { Product } from '@/types'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then(({ product, related }) => {
        setProduct(product)
        setRelated(related)
        setSelectedSize(product?.sizes?.[0] || '')
        setSelectedColor(product?.colors?.[0] || '')
        setLoading(false)
      })
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-[3/4] bg-neutral-900" />
          <div className="space-y-4 pt-8">
            <div className="h-3 bg-neutral-900 w-24 rounded" />
            <div className="h-8 bg-neutral-900 w-3/4 rounded" />
            <div className="h-6 bg-neutral-900 w-20 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="section-container text-center py-24">
        <p className="text-neutral-400">Product not found.</p>
        <Link href="/products" className="text-brand-accent text-sm mt-4 block">← Back to catalog</Link>
      </div>
    )
  }

  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : null

  return (
    <main className="section-container">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] text-neutral-600 uppercase tracking-widest mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Catalog</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-white transition-colors">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-neutral-400">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {discount && (
              <div className="absolute top-4 left-4">
                <span className="bg-brand-accent text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1">
                  -{discount}%
                </span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 aspect-square bg-neutral-900 overflow-hidden transition-all ${
                    selectedImage === i ? 'ring-1 ring-brand-accent' : 'ring-1 ring-transparent hover:ring-neutral-700'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-7">
          <div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mb-2">
              {product.category.name}
            </p>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-black text-white">${product.price.toFixed(2)}</span>
              {product.compareAt && (
                <span className="text-base text-neutral-600 line-through">${product.compareAt.toFixed(2)}</span>
              )}
            </div>
          </div>

          {/* Color */}
          {product.colors.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2.5">
                Color: <span className="text-white">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-4 py-2 transition-all duration-150 ${
                      selectedColor === color
                        ? 'bg-white text-black'
                        : 'border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                  Size: <span className="text-white">{selectedSize}</span>
                </p>
                <button className="text-[9px] text-neutral-600 uppercase tracking-wider hover:text-white transition-colors underline underline-offset-2">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-4 py-2 min-w-[52px] text-center transition-all duration-150 ${
                      selectedSize === size
                        ? 'bg-brand-accent text-black'
                        : 'border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 ${
              !product.inStock
                ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                : added
                ? 'bg-white text-black'
                : 'bg-brand-accent text-black hover:bg-white'
            }`}
          >
            {!product.inStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>

          {/* Description */}
          <div className="pt-2 border-t border-neutral-900">
            <p className="text-sm text-neutral-400 leading-relaxed">{product.description}</p>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[9px] text-neutral-600 border border-neutral-900 px-2 py-0.5 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-900">
            {[
              { icon: '🚚', label: 'Free shipping', sub: 'On orders over $100' },
              { icon: '↩️', label: 'Free returns', sub: '30-day window' },
              { icon: '🔒', label: 'Secure checkout', sub: 'SSL encrypted' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-lg mb-1">{item.icon}</div>
                <p className="text-[9px] font-bold text-white uppercase tracking-wider">{item.label}</p>
                <p className="text-[8px] text-neutral-600 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400">
              You May Also Like
            </h2>
            <Link href={`/products?category=${product.category.slug}`} className="text-[9px] font-black uppercase tracking-widest text-neutral-600 hover:text-brand-accent transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </main>
  )
}
