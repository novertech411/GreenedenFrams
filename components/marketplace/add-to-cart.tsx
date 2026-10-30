'use client'

import { useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { formatNaira, formatQuantity, stockStatus } from '@/lib/marketplace/format'
import type { Product } from '@/lib/marketplace/types'
import { useCart } from './cart-provider'
import { QuantityStepper } from './product-parts'

export function AddToCart({ product }: { product: Product }) {
  const { add, items } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (stockStatus(product) === 'out_of_stock') {
    return (
      <div className="rounded-2xl border border-border bg-secondary/60 p-5">
        <p className="font-semibold">Currently out of stock</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Check back soon, or{' '}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            contact us
          </Link>{' '}
          to ask when it&apos;s next available.
        </p>
      </div>
    )
  }

  const inCart = items.find((i) => i.productId === product.id)?.quantity ?? 0
  const remaining = Math.max(product.quantityAvailable - inCart, 0)

  return (
    <div className="rounded-2xl border border-border bg-secondary/60 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Quantity ({product.unit})</p>
          <p className="text-xs text-muted-foreground">
            {formatQuantity(product.quantityAvailable, product.unit)} available
            {inCart > 0 && ` · ${formatQuantity(inCart, product.unit)} in your cart`}
          </p>
        </div>
        <QuantityStepper
          value={Math.min(quantity, Math.max(remaining, 1))}
          max={Math.max(remaining, 1)}
          onChange={setQuantity}
          label={`${product.name} quantity`}
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-5">
        <p className="text-sm text-muted-foreground">
          Total{' '}
          <span className="block text-xl font-bold text-foreground tabular-nums">
            {formatNaira(product.price * Math.min(quantity, Math.max(remaining, 1)))}
          </span>
        </p>
        <button
          type="button"
          disabled={remaining === 0}
          onClick={() => {
            add(product, Math.min(quantity, remaining))
            setQuantity(1)
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-50"
        >
          {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
          {added ? 'Added to cart' : remaining === 0 ? 'All stock in cart' : 'Add to cart'}
        </button>
      </div>
    </div>
  )
}
