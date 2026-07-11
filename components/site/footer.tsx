'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Leaf } from 'lucide-react'
import Image from 'next/image'
const columns = [
  {
    heading: 'Company',
    links: ['Home', 'About', 'Technology', 'Solutions', 'Impact'],
  },
  {
    heading: 'Solutions',
    links: [
      'Precision Agriculture',
      'IoT Monitoring',
      'Greenhouse Farming',
      'Solar Cold Storage',
      'Farm Digitization',
    ],
  },
  {
    heading: 'Legal',
    links: ['Privacy Policy', 'Terms & Conditions', 'License'],
  },
]

const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/green-eden-farms/' },
  { name: 'Instagram', href: 'https://www.instagram.com/green_edens?igsh=ZGZpeTU3YzE0MTdp' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <footer id="contact" className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#home" className="flex items-center gap-2 text-xl font-bold">
              <span className="flex size-9 items-center justify-center ">
                <Image src="/images/logogreen.png" alt="logo" width={90} height={90} />
              </span>
              Green Eden Farms
            </a>
            <p className="mt-4 max-w-sm leading-relaxed text-footer-muted">
              Climate-smart agriculture powered by AI, IoT and renewable energy. Growing
              a more productive, sustainable future for farmers everywhere.
            </p>

            <form onSubmit={onSubmit} className="mt-6 max-w-sm">
              <label htmlFor="newsletter" className="text-sm font-semibold">
                Newsletter
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-footer-foreground placeholder:text-footer-muted focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  {sent ? 'Thanks!' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-semibold">{col.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-footer-muted transition-colors hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="mb-6 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-footer-muted transition-colors hover:border-primary hover:text-primary"
              >
                {s.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-2 text-sm text-footer-muted sm:flex-row sm:items-center">
            <p>350 Innovation Way, Lagos, Nigeria</p>
            <a href="tel:+2348036233898" className="transition-colors hover:text-primary">
              +234 803 623 3898
            </a>
            <p>© 2026 Green Eden Farms. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
