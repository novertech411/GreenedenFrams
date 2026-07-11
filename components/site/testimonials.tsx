'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

const testimonials = [
  {
    name: 'Samuel Okafor',
    role: 'Maize Farmer',
    image: '/images/farmer-1.png',
    quote:
      "With Green Eden Farms' smart farming solutions, we've increased our crop yield by 35% while reducing water usage by 40%. The IoT monitoring and AI analytics completely transformed the way we manage our farm.",
  },
  {
    name: 'Amara Bello',
    role: 'Vegetable Grower',
    image: '/images/farmer-2.png',
    quote:
      'The greenhouse automation means I can grow premium produce all year round. My income has doubled and I finally have data I can actually trust to make decisions.',
  },
  {
    name: 'Joseph Mensah',
    role: 'Grain Farmer',
    image: '/images/farmer-3.png',
    quote:
      'Solar cold storage has been a game changer. We used to lose so much to spoilage — now our harvests stay fresh for weeks and we sell at far better prices.',
  },
  {
    name: 'Daniel Achieng',
    role: 'Agronomist',
    image: '/images/farmer-4.png',
    quote:
      'The drone imagery catches problems weeks before the eye can. Precision agriculture with Green Eden Farms has made our whole cooperative dramatically more productive.',
  },
  {
    name: 'Grace Adeyemi',
    role: 'Horticulture Farmer',
    image: '/images/farmer-5.png',
    quote:
      'Smart irrigation cut our water bills in half and our vegetables have never looked healthier. The support team feels like part of our own farm family.',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = testimonials.length
  const active = testimonials[index]

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  return (
    <section id="impact" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Quote className="size-6" />
            </span>
            <div className="mt-8 min-h-44 sm:min-h-40">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-balance text-2xl font-medium leading-relaxed text-foreground sm:text-3xl"
                >
                  &ldquo;{active.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                'flex items-center gap-3 rounded-2xl border p-2 pr-4 text-left transition-all',
                i === index
                  ? 'border-primary bg-background shadow-md'
                  : 'border-transparent bg-background/50 opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={t.image || '/placeholder.svg'}
                alt={t.name}
                className={cn(
                  'size-12 rounded-xl object-cover grayscale transition-all',
                  i === index && 'grayscale-0',
                )}
              />
              <span className="hidden sm:block">
                <span className="block text-sm font-semibold text-foreground">
                  {t.name}
                </span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
