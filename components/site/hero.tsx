'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Headphones, Star } from 'lucide-react'

const avatars = [
  '/images/farmer-1.png',
  '/images/farmer-2.png',
  '/images/farmer-3.png',
]

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/images/hero.png"
        alt="Farmer overlooking lush farmland at sunrise with an agricultural drone in the sky"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-2xl">
            {/* <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
            >
              <span className="size-2 rounded-full bg-primary" />
              Climate-Smart Agritech
            </motion.span> */}

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
            >
              Growing the Future of Agriculture with Intelligence, Innovation &amp; Sustainability
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-white/80"
            >
              Climate-Smart Agriculture powered by Artificial Intelligence, IoT and
              Renewable Energy  helping farmers grow more while protecting the land.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#solutions"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#technology"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Explore Solutions
              </a>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {avatars.map((src) => (
                  <img
                    key={src}
                    src={src || '/placeholder.svg'}
                    alt="Farmer using Green Eden Farms"
                    className="size-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="text-sm text-white/80">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                Trusted by 12,000+ farmers
              </div>
            </motion.div> */}
          </div>

          <div className="relative hidden lg:block">
            {/* <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="ml-auto w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/images/veg-basket.png"
                  alt="Fresh harvested vegetables"
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-2 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">Fresh Harvest</p>
                  <p className="text-xs text-white/70">Yield up by 35%</p>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Live
                </span>
              </div>
            </motion.div> */}

            {/* <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              className="absolute -left-6 top-8 w-52 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur-md"
            >
              <p className="text-xs font-medium text-muted-foreground">Soil Moisture</p>
              <p className="mt-1 text-2xl font-bold text-foreground">68%</p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                <div className="h-full w-2/3 rounded-full bg-primary" />
              </div>
            </motion.div> */}

            {/* <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              className="absolute -bottom-6 right-2 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Headphones className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground">24/7 Support</p>
                <p className="text-[11px] text-muted-foreground">Agronomist on call</p>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
