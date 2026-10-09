import React from 'react'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import ProductCard from '@/app/components/ProductCard'
import NewArrivalsRail from '@/app/components/NewArrivalsRail'
import HeroCarousel from '@/app/components/HeroCarousel'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const categories = [
    {
      name: 'Men',
      slug: 'men',
      img: 'https://assets.mavencrest.site/mansurf.avif',
    },
    {
      name: 'Women',
      slug: 'women',
      img: 'https://assets.mavencrest.site/wsoccer.png',
    },
    {
      name: 'Kids',
      slug: 'kids',
      img: '/madrid.jpeg',
    },
    {
      name: 'Running',
      slug: 'running',
      img: 'https://assets.mavencrest.site/trackpic.png',
    },
    {
      name: 'Nutrition',
      slug: 'nutrition',
      img: 'https://assets.mavencrest.site/nutrition.png',
    },
  ]

  /*
   * HERO SLIDES
   *
   * Slide 1 keeps your current poster.
   * Slides 2-4 use existing Mavencrest images temporarily.
   *
   * Later, replacing a slide is as simple as changing its
   * "image" URL below.
   */
  const heroSlides = [
    {
      image: 'https://assets.mavencrest.site/kidhome.png',
      eyebrow: 'Seasonal essentials for every training day.',
      title: 'FALL READY ENERGY',
      links: [
        {
          label: 'Shop All',
          href: '/products',
        },
        {
          label: 'Shop Men',
          href: '/products?category=men',
        },
        {
          label: 'Shop Women',
          href: '/products?category=women',
        },
        {
          label: 'Shop Kids',
          href: '/products?category=kids',
        },
      ],
    },
    {
      image: 'https://assets.mavencrest.site/trackpic.png',
      eyebrow: 'Built for every mile.',
      title: 'RUN WITHOUT LIMITS',
      links: [
        {
          label: 'Shop Running',
          href: '/products?category=running',
        },
        {
          label: 'Shop New',
          href: '/products',
        },
      ],
    },
    {
      image: 'https://assets.mavencrest.site/wsoccer.png',
      eyebrow: 'Made to move.',
      title: 'OWN THE MOMENT',
      links: [
        {
          label: 'Shop Women',
          href: '/products?category=women',
        },
        {
          label: 'Shop New Arrivals',
          href: '/products',
        },
      ],
    },
    {
      image: 'https://assets.mavencrest.site/nutrition.png',
      eyebrow: 'Fuel the work.',
      title: 'TRAIN, RECOVER, REPEAT.',
      links: [
        {
          label: 'Shop Nutrition',
          href: '/products?category=nutrition',
        },
        {
          label: 'Shop All',
          href: '/products',
        },
      ],
    },
    {
      image: 'https://assets.mavencrest.site/mansurf.avif',
      eyebrow: 'In constant motion.',
      title: 'WORK HARD, PLAY HARD.',
      links: [
        {
          label: 'Shop Men',
          href: '/products?category=men',
        },
        {
          label: 'Shop All',
          href: '/products',
        },
      ],
    },
  ]

  const newArrivals =
    await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    })

  const featuredProducts =
    await prisma.product.findMany({
      where: {
        featured: true,
      },
      include: {
        category: true,
      },
    })

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* New Arrivals */}
      <NewArrivalsRail
        products={newArrivals}
      />

      {/* Mavencrest Edit */}
      <section className="bg-[#1d1f1f] px-6 pb-16 pt-6 md:px-10 md:pb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            The Mavencrest Edit
          </h2>

          <Link
            href="/products"
            className="text-sm underline underline-offset-4 transition hover:text-neutral-300 md:text-base"
          >
            Shop All
          </Link>
        </div>

        <div className="mb-10 overflow-x-auto">
          <div className="flex min-w-max border-b border-neutral-600">
            <Link
              href="/products"
              className="border-b-2 border-white px-6 py-4 text-base font-medium text-white md:px-8"
            >
              All
            </Link>

            <Link
              href="/products?category=men"
              className="px-6 py-4 text-base font-medium text-neutral-300 transition hover:text-white md:px-8"
            >
              Men's
            </Link>

            <Link
              href="/products?category=women"
              className="px-6 py-4 text-base font-medium text-neutral-300 transition hover:text-white md:px-8"
            >
              Women's
            </Link>

            <Link
              href="/products?category=kids"
              className="px-6 py-4 text-base font-medium text-neutral-300 transition hover:text-white md:px-8"
            >
              Kids'
            </Link>

            <Link
              href="/products?category=running"
              className="px-6 py-4 text-base font-medium text-neutral-300 transition hover:text-white md:px-8"
            >
              Running
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts
            .slice(0, 8)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
        </div>
      </section>

      {/* Training Disciplines */}
      <section className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-10">
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
            Explore Training Disciplines
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Gear built for the way you train.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map(
            (category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative block h-72 overflow-hidden bg-zinc-900"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/35 to-transparent" />

                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${category.img}')`,
                  }}
                />

                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-lg font-black uppercase tracking-tight">
                    {category.name}
                  </h3>

                  <span className="mt-1 block text-[10px] uppercase tracking-widest text-zinc-300">
                    Explore Gear →
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#0a0a0a] py-16 text-xs text-zinc-400">
        <div className="mx-auto mb-16 grid max-w-[1600px] grid-cols-2 gap-x-8 gap-y-12 px-6 md:grid-cols-4 md:px-10">
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-white">
              Company
            </h4>

            <ul className="space-y-3 text-xs font-medium text-zinc-500">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/careers"
                  className="hover:text-white"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  href="/sustainability"
                  className="hover:text-white"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-white">
              Services
            </h4>

            <ul className="space-y-3 text-xs font-medium text-zinc-500">
              <li>
                <Link
                  href="/account"
                  className="hover:text-white"
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="/orders"
                  className="hover:text-white"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  href="/support"
                  className="hover:text-white"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-white">
              Shop
            </h4>

            <ul className="space-y-3 text-xs font-medium text-zinc-500">
              <li>
                <Link
                  href="/products?category=men"
                  className="hover:text-white"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=women"
                  className="hover:text-white"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=running"
                  className="hover:text-white"
                >
                  Running
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-white">
              Mavencrest
            </h4>

            <p className="max-w-xs leading-6 text-zinc-500">
              Performance gear for training, running and everyday movement.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[1600px] border-t border-zinc-900 px-6 pt-10 text-center md:px-10">
          <span className="text-xl font-black italic tracking-tighter text-white">
            MAVENCREST
          </span>

          <p className="mt-3 text-[10px] uppercase tracking-widest text-zinc-600">
            © 2026 MAVENCREST Sporting Goods Co. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
