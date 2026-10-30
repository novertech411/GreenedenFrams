'use client'

import { ArrowRight, ShoppingBasket, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { formatNaira } from '@/lib/marketplace/format'
import { useCart } from './cart-provider'
import { OrderSummary } from './order-summary'
import { ProductImage, QuantityStepper } from './product-parts'

export function CartView() {
  const { items, ready, subtotal, setQuantity, remove } = useCart()

  if (!ready) return <div className="min-h-[40vh]" />

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border px-6 py-20 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <ShoppingBasket className="size-6" />
        </span>
        <p className="mt-5 text-lg font-semibold">Your cart is empty</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse the marketplace to add fresh produce.
        </p>
        <Link
          href="/marketplace"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
        >
          Browse produce
          <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      <ul className="divide-y divide-border rounded-3xl border border-border">
        {items.map((item) => (
          <li key={item.productId} className="flex gap-4 p-4 sm:p-5">
            <Link
              href={`/marketplace/${item.slug}`}
              className="relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24"
            >
              <ProductImage
                product={item}
                sizes="96px"
                iconClassName="size-8"
              />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/marketplace/${item.slug}`} className="font-semibold hover:text-primary">
                  {item.name}
                </Link>
                <p className="text-sm text-muted-foreground tabular-nums">
                  {formatNaira(item.price)} / {item.unit}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <QuantityStepper
                  size="sm"
                  value={item.quantity}
                  max={item.maxQuantity}
                  onChange={(q) => setQuantity(item.productId, q)}
                  label={`${item.name} quantity`}
                />
                <p className="w-24 text-right font-semibold tabular-nums">
                  {formatNaira(item.price * item.quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => remove(item.productId)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="lg:sticky lg:top-24">
        <OrderSummary subtotal={subtotal}>
          <Link
            href="/marketplace/checkout"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
          >
            Proceed to checkout
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/marketplace"
            className="mt-3 block text-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Continue shopping
          </Link>
        </OrderSummary>
      </div>
    </div>
  )
}
