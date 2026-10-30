import type { ReactNode } from 'react'
import { formatNaira } from '@/lib/marketplace/format'

/** Totals card shared by the cart and checkout pages. */
export function OrderSummary({
  subtotal,
  children,
}: {
  subtotal: number
  children?: ReactNode
}) {
  return (
    <div className="rounded-3xl border border-border bg-secondary/60 p-6">
      <h2 className="text-lg font-semibold">Order summary</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-semibold tabular-nums">{formatNaira(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Delivery</dt>
          <dd className="text-right text-muted-foreground">Confirmed by our team</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-border pt-3 text-base">
          <dt className="font-semibold">Total (excl. delivery)</dt>
          <dd className="font-bold tabular-nums">{formatNaira(subtotal)}</dd>
        </div>
      </dl>
      {children}
    </div>
  )
}
