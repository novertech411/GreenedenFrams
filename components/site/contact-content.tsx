'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import {
  Building2,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Sprout,
  Tractor,
  Users,
} from 'lucide-react'
import { Reveal } from './reveal'

const partners = [
  { icon: Landmark, label: 'Government Agencies' },
  { icon: Users, label: 'Development Partners' },
  { icon: Building2, label: 'NGOs' },
  { icon: GraduationCap, label: 'Research Institutions & Universities' },
  { icon: Tractor, label: 'Commercial Farms' },
  { icon: Sprout, label: 'Agricultural Cooperatives' },
  { icon: Landmark, label: 'Investors' },
  { icon: Building2, label: 'Agribusinesses' },
]

export function ContactContent() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <>
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal direction="right">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                Get in Touch
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
                We&apos;d love to hear from you
              </h2>
              <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
                Whether you have a project, partnership opportunity, or simply want
                to learn more about our solutions, our team is here to help.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Headquarters</p>
                    <p className="text-sm text-muted-foreground">
                      Haske Quarters Road 8b, Jos, Plateau State, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <a
                      href="mailto:info@greenedenfarms.org"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      info@greenedenfarms.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <a
                      href="tel:+2348036233898"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      +234 803 623 3898
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="rounded-3xl border border-border bg-secondary/60 p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold">Send Us a Message</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="name"
                      required
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="organization" className="text-sm font-medium">
                      Organization
                    </label>
                    <input
                      id="organization"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  {sent ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                Partnership Opportunities
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
                We welcome collaboration
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Together, we can create innovative, sustainable, and scalable
                agricultural solutions that improve livelihoods and strengthen food
                security across Africa.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, i) => (
              <Reveal key={p.label} direction="up" delay={i * 0.04}>
                <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-background p-5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <p.icon className="size-5" />
                  </span>
                  <span className="font-medium leading-snug">{p.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
