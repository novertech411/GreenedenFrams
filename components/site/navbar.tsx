'use client'

import { useEffect, useState } from 'react'
import { Menu, ShoppingBasket, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
const links = [
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Impact', href: '/impact' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Pages without a dark hero image pass `solid` so the nav is readable at the top.
  const opaque = scrolled || solid

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        opaque
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 text-lg font-bold tracking-tight transition-colors',
            opaque ? 'text-foreground' : 'text-white',
          )}
        >
          <span className="flex size-9 items-center justify-center rounded-full ">
            <Image src="/images/logogreen.png" alt="logo" width={90} height={90} />
          </span>
          Green Eden Farms Ltd
        </Link>

        <div
          className={cn(
            'hidden items-center gap-1 rounded-full px-2 py-1 lg:flex',
            opaque ? '' : 'bg-white/10 backdrop-blur-md',
          )}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                opaque
                  ? 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  : 'text-white/80 hover:bg-white/15 hover:text-white',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/marketplace"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
          >
            <ShoppingBasket className="size-4" />
            Marketplace
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full lg:hidden',
              opaque ? 'bg-secondary text-foreground' : 'bg-white/15 text-white',
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/marketplace"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <ShoppingBasket className="size-4" />
              Marketplace
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
