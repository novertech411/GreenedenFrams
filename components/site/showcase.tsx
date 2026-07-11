'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

const slides = [


  {
    image: '/images/greenhouse.jpg',
    thumbs: ['/images/greenhouse1.jpg', '/images/greenhouse2.jpg'],
    title: 'Greenhouse Farming',
    desc: 'Grow premium produce in our state-of-the-art greenhouses that provide optimal temperature, humidity, and nutrient control.',
  },
  {
    image: '/images/coldroom.jpg',
    thumbs: ['/images/coldroom1.jpg', '/images/coldroom2.jpg'],
    title: 'Coldroom Storage',
    desc: 'Our advanced coldroom storage technology keeps harvests fresh for longer, slashing post-harvest losses and protecting farmer income.',
  },

  {
    image: '/images/product-irrigation.png',
    thumbs: ['/images/product-solar.png', '/images/about.png'],
    title: 'Smart Irrigation & Water Intelligence',
    desc: 'Sensor-driven irrigation delivers the exact amount of water each crop needs, cutting usage by up to 40% while keeping fields perfectly hydrated.',
  },

  {
    image: '/images/product-solar.png',
    thumbs: ['/images/product-analytics.png', '/images/product-drone.png'],
    title: 'Solar Cold Storage',
    desc: 'Off-grid, solar-powered cold rooms keep harvests fresh for longer, slashing post-harvest losses and protecting farmer income.',
  },
  {
    image: '/images/product-analytics.png',
    thumbs: ['/images/tech-tablet.png', '/images/about.png'],
    title: 'AI Farm Analytics',
    desc: 'Satellite imagery and machine learning turn raw field data into clear, actionable recommendations delivered straight to your device.',
  },
]

export function Showcase() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const total = slides.length

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  return (
    <section id="industries" className="bg-background pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <div className="relative h-[520px] w-full overflow-hidden rounded-3xl sm:h-[560px]">
            <AnimatePresence mode="sync">
              <motion.img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            <div className="relative flex h-full flex-col justify-end gap-6 p-6 sm:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-end gap-4">
                  <div className="hidden gap-3 sm:flex">
                    {slide.thumbs.map((thumb) => (
                      <img
                        key={thumb}
                        src={thumb || '/placeholder.svg'}
                        alt=""
                        aria-hidden
                        className="size-24 rounded-2xl border border-white/20 object-cover lg:size-28"
                      />
                    ))}
                  </div>
                  <div className="max-w-xl">
                    <motion.h3
                      key={slide.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl lg:text-4xl"
                    >
                      {slide.title}
                    </motion.h3>
                    <p className="mt-3 leading-relaxed text-pretty text-white/80">
                      {slide.desc}
                    </p>
                    <p className="mt-4 text-sm font-medium text-white/70">
                      {index + 1} / {total}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous slide"
                    className="inline-flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                  >
                    <ArrowLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next slide"
                    className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
