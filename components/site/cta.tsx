'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from './reveal'

export function CTA() {
  return (
    <section className="bg-background pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-4xl">
            <Image
              src="/images/cta.png"
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center sm:py-20">
              <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-balance text-primary-foreground sm:text-4xl lg:text-5xl">
                Ready to Modernize Your Farm?
              </h2>
              <p className="max-w-xl leading-relaxed text-pretty text-primary-foreground/80">
                Join thousands of farmers growing smarter with Green Eden Farms. Book a
                free consultation and see what climate-smart agriculture can do for you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                >
                  Book Consultation
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur-md transition-colors hover:bg-primary-foreground/20"
                >
                  Talk to Experts
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
