'use client'

import {
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  Search,
  SlidersHorizontal,
} from 'lucide-react'

import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import ProductCard from '@/app/components/ProductCard'
import type { Product } from '@/types'

const CATEGORIES = [
  'All',
  'Men',
  'Women',
  'Kids',
  'Running',
  'Nutrition',
]

const SORT_OPTIONS = [
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Price: Low to High',
    value: 'price-asc',
  },
  {
    label: 'Price: High to Low',
    value: 'price-desc',
  },
]

function CatalogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState(
    searchParams.get('q') || ''
  )

  const category =
    searchParams.get('category')?.toLowerCase() || 'all'

  const sort =
    searchParams.get('sort') || 'newest'

  const q =
    searchParams.get('q') || ''

  const fetchProducts = useCallback(async () => {
    setLoading(true)

    try {
      const params = new URLSearchParams()

      if (category !== 'all') {
        params.set('category', category)
      }

      if (sort) {
        params.set('sort', sort)
      }

      if (q) {
        params.set('q', q)
      }

      params.set('limit', '24')

      const response = await fetch(
        `/api/products?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error(
          `Products request failed: ${response.status}`
        )
      }

      const data = await response.json()

      setProducts(data.products || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error('Unable to load products:', error)

      setProducts([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [category, sort, q])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    setSearchValue(q)
  }, [q])

  const setParam = (
    key: string,
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    if (
      !value ||
      (key === 'category' && value === 'all')
    ) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    const query = params.toString()

    router.push(
      query
        ? `/products?${query}`
        : '/products'
    )
  }

  const submitSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setParam(
      'q',
      searchValue.trim()
    )
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-10 md:px-10">
      {/* Compact Catalog Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Shop
          </h1>

          {!loading && (
            <p className="mt-2 text-sm text-neutral-500">
              {total}{' '}
              {total === 1
                ? 'product'
                : 'products'}
            </p>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="mb-8 border-b border-neutral-800">
        <div className="scrollbar-hide flex overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const value =
              cat === 'All'
                ? 'all'
                : cat.toLowerCase()

            const active =
              category === value

            return (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setParam(
                    'category',
                    value
                  )
                }
                className={`relative flex-shrink-0 px-5 py-4 text-sm font-semibold transition-colors ${
                  active
                    ? 'text-white'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {cat}

                {active && (
                  <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-white" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Search + Sort */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <form
          onSubmit={submitSearch}
          className="relative w-full sm:max-w-[320px]"
        >
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
            strokeWidth={1.8}
          />

          <input
            type="search"
            value={searchValue}
            onChange={(event) =>
              setSearchValue(
                event.target.value
              )
            }
            placeholder="Search products"
            className="h-11 w-full border border-neutral-700 bg-[#171717] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-neutral-400"
          />
        </form>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            className="h-4 w-4 text-neutral-500"
            strokeWidth={1.8}
          />

          <select
            value={sort}
            onChange={(event) =>
              setParam(
                'sort',
                event.target.value
              )
            }
            className="h-11 min-w-[180px] cursor-pointer border border-neutral-700 bg-[#171717] px-4 text-sm text-neutral-300 outline-none transition focus:border-neutral-400"
          >
            {SORT_OPTIONS.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse"
            >
              <div className="aspect-[4/5] bg-neutral-900" />

              <div className="space-y-2 pt-4">
                <div className="h-3 w-16 rounded bg-neutral-900" />
                <div className="h-4 w-3/4 rounded bg-neutral-900" />
                <div className="h-4 w-16 rounded bg-neutral-900" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-28 text-center">
          <h2 className="text-xl font-semibold text-white">
            No products found
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Try another category or search term.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push('/products')
            }
            className="mt-6 border-b border-white pb-1 text-sm font-medium text-white"
          >
            View all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      )}
    </main>
  )
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10">
          <div className="mb-8 h-10 w-28 animate-pulse bg-neutral-900" />

          <div className="mb-8 h-14 w-full animate-pulse bg-neutral-900" />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/5] animate-pulse bg-neutral-900"
              />
            ))}
          </div>
        </main>
      }
    >
      <CatalogContent />
    </Suspense>
  )
}
