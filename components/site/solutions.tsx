'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from './reveal'

const solutions = [
  {
    image: '/images/product-drone.png',
    title: 'Precision Agriculture',
    desc: 'High-resolution drone and satellite monitoring for mapping, scouting and real-time crop analysis.',
  },
  {
    image: '/images/product-analytics.png',
    title: 'ScareGrow AI',
    desc: 'AI models that predict yields, detect diseases early and optimise every input on the farm.',
  },
  {
    image: '/images/tech-tablet.png',
    title: 'IoT Farm Monitoring',
    desc: 'Real-time tracking of soil, crops and weather through a connected network of smart sensors.',
  },
  {
    image: '/images/product-greenhouse.png',
    title: 'Greenhouse Farming',
    desc: 'Fully automated, climate-controlled greenhouses for premium year-round production.',
  },
  {
    image: '/images/product-solar.png',
    title: 'Solar Cold Storage',
    desc: 'Off-grid solar cold rooms that keep harvests fresh and cut post-harvest losses.',
  },
  {
    image: '/images/product-hydroponics.png',
    title: 'Smart Irrigation',
    desc: 'Sensor-driven drip systems delivering the exact water each crop needs, saving up to 40%.',
  },
  {
    image: '/images/product-tractor.png',
    title: 'Farm Digitization',
    desc: 'GPS-guided machinery and digital records that streamline land prep, seeding and operations.',
  },
  {
    image: '/images/veg-basket.png',
    title: 'Agricultural Consultancy',
    desc: 'Expert agronomists guiding you from soil analysis to harvest and market-ready produce.',
  },
]

export function Solutions() {
  const scroller = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

  return (
    <section id="solutions" className="relative overflow-hidden bg-secondary py-20 sm:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 text-center text-[18vw] font-bold leading-none tracking-tight text-foreground/[0.03]"
      >
        Solutions
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                Our Solutions
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Smart farming solutions, end to end
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-muted-foreground">
              Explore the full suite of technologies powering the modern, climate-smart
              farm — swipe through to see what fits yours.
            </p>
          </div>
        </Reveal>

        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {solutions.map((item, i) => (
            <Reveal
              key={item.title}
              direction="up"
              delay={(i % 4) * 0.06}
              className="shrink-0 snap-start"
            >
              <article className="group relative h-96 w-80 overflow-hidden rounded-3xl">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            View More
            <ArrowRight className="size-4" />
          </a>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
