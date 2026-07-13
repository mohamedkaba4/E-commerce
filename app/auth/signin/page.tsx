'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { Product } from '@/types'
import ProductCard from '@/app/components/ProductCard';

const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'Running', 'Nutrition']
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low–High', value: 'price-asc' },
  { label: 'Price: High–Low', value: 'price-desc' },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'newest'
  const q = searchParams.get('q') || ''

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (category && category !== 'all') params.set('category', category)
    if (sort) params.set('sort', sort)
    if (q) params.set('q', q)
    params.set('limit', '24')

    const res = await fetch(`/api/products?${params}`)
    const data = await res.json()
    setProducts(data.products || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [category, sort, q])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params}`)
  }

  const activeCategory = category || 'all'

  return (
    <main className="section-container">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mb-2">Catalog</p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
          {activeCategory === 'all'
            ? 'All Gear'
            : CATEGORIES.find((c) => c.toLowerCase() === activeCategory) || activeCategory}
        </h1>
        {!loading && (
          <p className="text-xs text-neutral-500 mt-2">{total} product{total !== 1 ? 's' : ''}</p>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-900">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const val = cat === 'All' ? 'all' : cat.toLowerCase()
            const active = activeCategory === val
            return (
              <button
                key={cat}
                onClick={() => setParam('category', val)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 transition-all duration-200 ${
                  active
                    ? 'bg-brand-accent text-black'
                    : 'border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Sort + Search */}
        <div className="flex items-center gap-3">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              defaultValue={q}
              placeholder="Search gear..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setParam('q', (e.target as HTMLInputElement).value)
                }
              }}
              className="bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 px-3 py-2 pl-8 w-40 focus:outline-none focus:border-neutral-600 transition-colors"
            />
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Sort select */}
          <select
            value={sort}
            onChange={(e) => setParam('sort', e.target.value)}
            className="bg-neutral-900 border border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-2 focus:outline-none focus:border-neutral-600 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="retail-card animate-pulse">
              <div className="aspect-[3/4] bg-neutral-900" />
              <div className="p-3 space-y-2">
                <div className="h-2 bg-neutral-900 w-16 rounded" />
                <div className="h-3 bg-neutral-900 w-full rounded" />
                <div className="h-3 bg-neutral-900 w-12 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-neutral-600 text-sm">No products found.</p>
          <button
            onClick={() => router.push('/products')}
            className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent hover:text-white transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}

// Wrap the content component inside Suspense to handle useSearchParams() safely during build
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="section-container animate-pulse">
        <div className="h-8 bg-neutral-900 w-48 rounded mb-4" />
        <div className="h-4 bg-neutral-900 w-24 rounded mb-10" />
        <div className="h-12 bg-neutral-900 w-full rounded" />
      </main>
    }>
      <ProductsContent />
    </Suspense>
  )
}