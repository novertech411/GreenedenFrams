'use client'

import { ArrowRight, BrainCircuit, Cpu, Satellite, Sun } from 'lucide-react'
import { Reveal } from './reveal'

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Crop Intelligence',
    desc: 'Use AI to predict yields, detect diseases and optimise every farming decision.',
  },
  {
    icon: Satellite,
    title: 'Precision Farming',
    desc: 'Drone and satellite insights for accurate, resource-efficient field management.',
  },
  {
    icon: Cpu,
    title: 'IoT Sensors',
    desc: 'Real-time tracking of soil, crops and weather with connected smart sensors.',
  },
  {
    icon: Sun,
    title: 'Renewable Energy',
    desc: 'Solar-powered storage and logistics for cleaner, more resilient operations.',
  },
]

export function Technology() {
  return (
    <section id="technology" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Revolutionizing Agriculture Through Technology
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <div className="flex flex-col items-start gap-6 lg:pt-2">
              <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                Empowering farmers with cutting-edge agricultural innovations to increase
                productivity, improve efficiency, and create a sustainable future.
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <f.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left" delay={0.1}>
            <div className="h-full max-h-[600px] overflow-hidden rounded-3xl">
              <img
                src="/images/techIMG.JPG"
                alt="Farmer holding a tablet with a farm analytics dashboard in a field"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
