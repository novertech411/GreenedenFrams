'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const slides = [
  {
    image: '/images/veg-basket.webp',
    alt: 'A basket of fresh vegetables and greens',
    eyebrow: 'Green Eden Marketplace',
    title: 'Fresh produce from our solar cold rooms',
    desc: 'Vegetables, fruits, tubers and greens — order online for delivery or pickup.',
    cta: { label: 'Shop produce', href: '#products' },
  },
  {
    image: '/images/coldroom.jpg',
    alt: 'Green Eden Farms solar-powered cold storage container',
    eyebrow: 'Solar cold storage',
    title: 'Kept cool until it reaches you',
    desc: 'Our off-grid cold rooms hold produce at the right temperature to cut post-harvest losses.',
    cta: { label: 'How it works', href: '/solutions' },
  },
  {
    image: '/images/greenhouse.jpg',
    alt: 'Green Eden team tending pepper plants in a greenhouse',
    eyebrow: 'Delivery or pickup',
    title: 'Collect in Jos or Abuja, or have it delivered',
    desc: 'Choose how you want your order at checkout. Our team confirms every order by phone.',
    cta: { label: 'Browse categories', href: '#categories' },
  },
]

export function MarketBanner() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const slide = slides[index]

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(id)
  }, [paused, reduceMotion])

  return (
    <section className="bg-background pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-4xl bg-footer text-footer-foreground">
            {/* soft brand glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/25 blur-3xl"
            />
            <div className="relative grid items-center gap-8 p-6 pb-14 sm:p-10 sm:pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-14 lg:pb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="order-2 lg:order-1"
                >
                  <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-md leading-relaxed text-pretty text-footer-muted">
                    {slide.desc}
                  </p>
                  <Link
                    href={slide.cta.href}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {slide.cta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="relative order-1 aspect-4/3 lg:order-2 lg:aspect-5/4">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={slide.image}
                    initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: -2 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/10"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* notch holding the slide dots */}
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-t-2xl bg-background px-5 pt-2.5 pb-2">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}: ${s.title}`}
                aria-current={i === index}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  i === index ? 'w-7 bg-primary' : 'w-2.5 bg-border hover:bg-muted-foreground/40',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
