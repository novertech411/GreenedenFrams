'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { formatNaira } from '@/lib/marketplace/format'
import { useCart } from './cart-provider'

/** Floating cart shortcut shown on marketplace pages once the cart has items. */
export function CartButton() {
  const { count, subtotal, ready } = useCart()
  const pathname = usePathname()
  const hidden =
    !ready || count === 0 || pathname.startsWith('/marketplace/cart') || pathname.startsWith('/marketplace/checkout')

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
        >
          <Link
            href="/marketplace/cart"
            className="flex items-center gap-3 rounded-full bg-footer py-2 pr-5 pl-2 text-sm font-semibold text-footer-foreground shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <span className="relative flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ShoppingCart className="size-5" />
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-background text-[11px] font-bold text-foreground tabular-nums">
                {count}
              </span>
            </span>
            <span>
              View cart
              <span className="ml-2 font-normal text-footer-muted tabular-nums">
                {formatNaira(subtotal)}
              </span>
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
