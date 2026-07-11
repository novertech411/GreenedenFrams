'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from './reveal'

function Counter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const duration = 1600
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}

const stats = [
  {
    value: <Counter target={100} suffix="%" />,
    title: 'Client Satisfaction',
    desc: 'Farmers consistently rate our smart farming solutions as transformative for their operations and yields.',
  },
  {
    value: <Counter target={500} suffix="K+" />,
    title: 'Farmers Impact Potential',
    desc: 'Our technology is built to scale across smallholder and commercial farms alike, reaching communities everywhere.',
  },
  {
    value: <Counter target={20} suffix="+" />,
    title: 'Technology Solutions',
    desc: 'From drones to IoT sensors and solar cold storage, one connected platform for the modern farm.',
  },
  {
    value: <Counter target={50} suffix="%" />,
    title: 'Reduced Post-Harvest Losses',
    desc: 'Smart storage and analytics dramatically cut waste, protecting income and food security.',
  },
]

export function About() {
  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Innovating the Future of Agriculture
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground lg:pt-2">
              Green Eden Farms, where tradition meets innovation, is dedicated to
              transforming agriculture through sustainable practices and cutting-edge
              technology. Our mission is to empower farmers with advanced tools and
              resources that enhance productivity while protecting the environment.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal direction="up" className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/images/aboutIMG.jpg"
                alt="Agricultural drone flying over green crop rows"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="flex flex-col divide-y divide-border">
            {stats.map((stat, i) => (
              <Reveal key={stat.title} direction="up" delay={i * 0.08}>
                <div className="py-6 first:pt-0">
                  <p className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    {/* {stat.value} */}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {stat.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg leading-relaxed text-muted-foreground">
                    {stat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
