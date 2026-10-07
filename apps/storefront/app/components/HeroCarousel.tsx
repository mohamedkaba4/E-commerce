'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react'

export interface HeroSlide {
  image: string
  eyebrow?: string
  title: string
  links: {
    label: string
    href: string
  }[]
}

interface HeroCarouselProps {
  slides: HeroSlide[]
}

const INTERVAL = 6000

export default function HeroCarousel({
  slides,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = slides.length

  useEffect(() => {
    if (paused || total <= 1) return

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % total)
    }, INTERVAL)

    return () => window.clearInterval(timer)
  }, [paused, total])

  const previous = () => {
    setCurrent((index) =>
      index === 0 ? total - 1 : index - 1
    )
  }

  const next = () => {
    setCurrent((index) =>
      (index + 1) % total
    )
  }

  if (!slides.length) return null

  return (
    <section
      className="relative overflow-hidden bg-black"
      aria-label="Featured collections"
    >
      {/* Slides */}
      <div className="relative h-[500px] sm:h-[560px] md:h-[650px] lg:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={`${slide.image}-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current
                ? 'z-10 opacity-100'
                : 'pointer-events-none z-0 opacity-0'
            }`}
            aria-hidden={index !== current}
          >
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

            <div className="relative z-10 flex h-full items-center">
              <div className="w-full max-w-[1600px] px-6 md:px-10 lg:px-14">
                <div className="max-w-[680px]">
                  {slide.eyebrow && (
                    <p className="mb-4 text-sm font-medium tracking-wide text-white/90 md:text-base">
                      {slide.eyebrow}
                    </p>
                  )}

                  <h1 className="max-w-[680px] text-3xl font-black leading-[0.95] tracking-tight text-white md:text-5xl lg:text-[64px]">
                    {slide.title}
                  </h1>

                  <div className="mt-8 flex max-w-xl flex-wrap gap-3">
                    {slide.links.map((link) => (
                      <Link
                        key={`${index}-${link.label}`}
                        href={link.href}
                        className="inline-flex min-h-[44px] items-center bg-black/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                        tabIndex={index === current ? 0 : -1}
                      >
                        {link.label}
                        <span
                          aria-hidden="true"
                          className="ml-2 text-lg leading-none"
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        {total > 1 && (
          <div className="absolute bottom-6 right-5 z-30 flex items-center gap-3 md:bottom-8 md:right-10">
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/80"
              aria-label={
                paused
                  ? 'Play slideshow'
                  : 'Pause slideshow'
              }
            >
              {paused ? (
                <Play
                  className="h-5 w-5 fill-current"
                  strokeWidth={1.8}
                />
              ) : (
                <Pause
                  className="h-5 w-5 fill-current"
                  strokeWidth={1.8}
                />
              )}
            </button>

            <button
              type="button"
              onClick={previous}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/80"
              aria-label="Previous slide"
            >
              <ChevronLeft
                className="h-6 w-6"
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/80"
              aria-label="Next slide"
            >
              <ChevronRight
                className="h-6 w-6"
                strokeWidth={1.8}
              />
            </button>
          </div>
        )}

        {/* Slide Progress */}
        {total > 1 && (
          <div className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 sm:flex md:bottom-9">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-[4px] w-16 transition-all duration-300 lg:w-24 ${
                  index === current
                    ? 'bg-white'
                    : 'bg-white/35 hover:bg-white/60'
                }`}
                aria-label={`Show slide ${index + 1}`}
                aria-current={
                  index === current ? 'true' : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
