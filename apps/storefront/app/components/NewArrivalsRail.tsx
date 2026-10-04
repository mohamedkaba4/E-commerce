'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/app/components/ProductCard'
import type { Product } from '@/types'

interface NewArrivalsRailProps {
  products: Product[]
}

export default function NewArrivalsRail({
  products,
}: NewArrivalsRailProps) {
  const railRef = useRef<HTMLDivElement>(null)

  const scrollNext = () => {
    const rail = railRef.current
    if (!rail) return

    const atEnd =
      rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 20

    if (atEnd) {
      rail.scrollTo({
        left: 0,
        behavior: 'smooth',
      })
      return
    }

    rail.scrollBy({
      left: rail.clientWidth * 0.9,
      behavior: 'smooth',
    })
  }

  const scrollPrevious = () => {
    const rail = railRef.current
    if (!rail) return

    if (rail.scrollLeft <= 20) {
      rail.scrollTo({
        left: rail.scrollWidth,
        behavior: 'smooth',
      })
      return
    }

    rail.scrollBy({
      left: -(rail.clientWidth * 0.9),
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-[#1d1f1f] py-14 md:py-16">
      <div className="mb-8 flex items-center justify-between px-6 md:px-10">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          New Arrivals
        </h2>

        <div className="flex items-center gap-5">
          <Link
            href="/products"
            className="text-sm font-medium text-neutral-300 underline underline-offset-4 transition hover:text-white md:text-base"
          >
            View all
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={scrollPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600 text-white transition hover:bg-white hover:text-black"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600 text-white transition hover:bg-white hover:text-black"
              aria-label="Next products"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4 md:px-10"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[82%] snap-start sm:min-w-[47%] md:min-w-[32%] lg:min-w-[24%] xl:min-w-[23%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
