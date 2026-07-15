'use client'

import { Handshake, Leaf, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from './reveal'

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We continuously develop practical technologies that solve real agricultural challenges.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'Every solution we build is designed to protect natural resources and support long-term food security.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    desc: 'We operate with transparency, accountability, and excellence in every partnership.',
  },
  {
    icon: Handshake,
    title: 'Collaboration',
    desc: 'We believe lasting agricultural transformation happens through partnerships with farmers, governments, NGOs, researchers, and the private sector.',
  },
  {
    icon: Sparkles,
    title: 'Impact',
    desc: 'Everything we do is measured by the positive difference it creates for farmers, communities, and the environment.',
  },
]

export function AboutContent() {
  return (
    <>
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal direction="right">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                About Green Eden Farms
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Where tradition meets innovation
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
                Green Eden Farms Ltd is a climate-smart agritech company committed to
                transforming agriculture through innovation, artificial intelligence,
                renewable energy, and data-driven farming solutions.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We believe the future of agriculture lies at the intersection of
                technology and sustainability. By integrating Precision Agriculture,
                Artificial Intelligence (AI), Internet of Things (IoT), greenhouse
                farming, and solar-powered cold storage, we empower farmers to make
                smarter decisions, increase productivity, reduce post-harvest losses,
                and improve profitability.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                From smallholder farmers to commercial agribusinesses, our solutions
                are designed to create resilient food systems that address climate
                change while improving food security across Africa.
              </p>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/greenhouse.jpg"
                  alt="Climate-controlled greenhouse rows at Green Eden Farms"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="up">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/monitoring.JPG"
                  alt="Farmer monitoring crops with a tablet in the field"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 rounded-3xl border border-border bg-background p-8">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  Our Vision
                </p>
                <p className="mt-3 text-xl font-semibold leading-snug text-balance">
                  To become Africa&apos;s leading climate-smart agriculture company,
                  transforming food production through innovation, technology, and
                  sustainability.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/coldroom.jpg"
                  alt="Solar-powered cold storage facility"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 rounded-3xl border border-border bg-background p-8">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  Our Mission
                </p>
                <p className="mt-3 text-xl font-semibold leading-snug text-balance">
                  To empower farmers with intelligent agricultural technologies that
                  increase productivity, reduce food losses, improve profitability,
                  and strengthen climate resilience.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                Our Core Values
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
                What drives us every day
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} direction="up" delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-border bg-secondary p-8">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <v.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal direction="right">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/aboutIMG.jpg"
                  alt="Agricultural drone flying over green crop rows"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                Why Green Eden?
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
                Bridging tradition and technology
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
                Agriculture is facing unprecedented challenges — from climate change
                and unpredictable weather to rising production costs and post-harvest
                losses. Green Eden Farms exists to bridge the gap between traditional
                farming and modern technology, enabling farmers to grow smarter,
                waste less, and achieve better harvests.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
