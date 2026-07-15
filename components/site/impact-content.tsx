'use client'

import {
  ArrowRight,
  CloudSun,
  Droplets,
  Leaf,
  ShieldCheck,
  Sprout,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from './reveal'

const pillars = [
  {
    image: '/images/farmer-1.png',
    title: 'Empowering Farmers',
    desc: 'We equip farmers with innovative technologies that improve productivity, reduce operational costs, and enable data-driven decision-making.',
  },
  {
    image: '/images/coldroom2.jpg',
    title: 'Reducing Food Losses',
    desc: 'By integrating solar-powered cold storage and modern preservation systems, we help farmers protect harvests, reduce waste, and increase profitability.',
  },
  {
    image: '/images/greenhouse2.jpg',
    title: 'Driving Sustainable Agriculture',
    desc: 'Through precision farming, renewable energy, and smart irrigation, we promote responsible resource management that benefits both people and the planet.',
  },
  {
    image: '/images/monitoring.JPG',
    title: 'Building Climate Resilience',
    desc: 'Our climate-smart technologies help farmers adapt to changing weather conditions, reduce environmental risks, and improve long-term agricultural sustainability.',
  },
  {
    image: '/images/farmer-4.png',
    title: 'Supporting Food Security',
    desc: 'By increasing yields and reducing post-harvest losses, we contribute to stronger food systems and improved nutrition across communities.',
  },
]

const areas = [
  { icon: CloudSun, label: 'Climate-Smart Agriculture' },
  { icon: Sprout, label: 'Artificial Intelligence' },
  { icon: Leaf, label: 'Precision Agriculture' },
  { icon: CloudSun, label: 'Renewable Energy' },
  { icon: Droplets, label: 'Water Conservation' },
  { icon: ShieldCheck, label: 'Food Security' },
  { icon: Users, label: 'Farmer Empowerment' },
  { icon: Sprout, label: 'Sustainable Development' },
  { icon: Leaf, label: 'Rural Economic Growth' },
]

export function ImpactContent() {
  return (
    <>
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {pillars.map((p, i) => (
              <Reveal key={p.title} direction="up" delay={i * 0.05}>
                <div
                  className={`grid items-center gap-8 rounded-3xl border border-border bg-secondary/60 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 ${
                    i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold leading-tight tracking-tight text-balance">
                      {p.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                Our Impact Areas
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
                Where we focus our efforts
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a, i) => (
              <Reveal key={a.label} direction="up" delay={i * 0.04}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <a.icon className="size-5" />
                  </span>
                  <span className="font-medium">{a.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="scale">
            <div className="relative overflow-hidden rounded-4xl">
              <Image
                src="/images/greenhouse.jpg"
                alt="Green Eden Farms greenhouse at sunrise"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
              <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center sm:py-20">
                <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-balance text-primary-foreground sm:text-4xl lg:text-5xl">
                  Together, we can build a future where every harvest is protected
                </h2>
                <p className="max-w-xl leading-relaxed text-pretty text-primary-foreground/80">
                  Technology empowers every farmer, and agriculture becomes more
                  resilient for generations to come.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                >
                  Partner With Us
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
