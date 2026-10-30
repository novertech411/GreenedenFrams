'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { ArrowLeft, CircleCheck, CreditCard, Info, Loader2, Store, Truck } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatNaira, formatQuantity, pickupLocations } from '@/lib/marketplace/format'
import type { Order, OrderRequest } from '@/lib/marketplace/types'
import { useCart } from './cart-provider'
import { OrderSummary } from './order-summary'

const input =
  'mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none'

export function CheckoutView({ sampleData }: { sampleData: boolean }) {
  const { items, ready, subtotal, clear } = useCart()
  const [method, setMethod] = useState<'delivery' | 'pickup'>('delivery')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<Order | null>(null)

  if (order) return <Confirmation order={order} sampleData={sampleData} />
  if (!ready) return <div className="min-h-[40vh]" />

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border px-6 py-20 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <Link
          href="/marketplace"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Browse produce
        </Link>
      </div>
    )
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (key: string) => String(f.get(key) ?? '').trim()

    const payload: OrderRequest = {
      customer: { name: get('name'), phone: get('phone'), email: get('email') || undefined },
      fulfilment:
        method === 'delivery'
          ? { method, address: get('address'), city: get('city'), state: get('state') }
          : { method, locationId: get('location') },
      notes: get('notes') || undefined,
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    }

    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      setOrder(data.order)
      clear()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const methodOption = (value: 'delivery' | 'pickup', Icon: typeof Truck, title: string, desc: string) => (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-2xl border bg-background p-4 transition-colors',
        method === value ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50',
      )}
    >
      <input
        type="radio"
        name="method"
        value={value}
        checked={method === value}
        onChange={() => setMethod(value)}
        className="sr-only"
      />
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Icon className="size-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
    </label>
  )

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="space-y-6">
        <fieldset className="rounded-3xl border border-border bg-secondary/60 p-6 sm:p-8">
          <legend className="sr-only">Contact details</legend>
          <h2 className="text-xl font-semibold">Contact details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="text-sm font-medium">Full name</label>
              <input id="name" name="name" required maxLength={100} autoComplete="name" className={input} />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium">Phone number</label>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+234" className={input} />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input id="email" name="email" type="email" autoComplete="email" className={input} />
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-3xl border border-border bg-secondary/60 p-6 sm:p-8">
          <legend className="sr-only">Delivery or pickup</legend>
          <h2 className="text-xl font-semibold">Delivery or pickup</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {methodOption('delivery', Truck, 'Delivery', 'Fee confirmed when we call you')}
            {methodOption('pickup', Store, 'Pickup', 'Collect from Jos or Abuja')}
          </div>

          {method === 'delivery' ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="address" className="text-sm font-medium">Street address</label>
                <input id="address" name="address" required autoComplete="street-address" className={input} />
              </div>
              <div>
                <label htmlFor="city" className="text-sm font-medium">City</label>
                <input id="city" name="city" required autoComplete="address-level2" className={input} />
              </div>
              <div>
                <label htmlFor="state" className="text-sm font-medium">State</label>
                <input id="state" name="state" required autoComplete="address-level1" className={input} />
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {pickupLocations.map((loc, i) => (
                <label
                  key={loc.id}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background p-4 has-[:checked]:border-primary"
                >
                  <input
                    type="radio"
                    name="location"
                    value={loc.id}
                    defaultChecked={i === 0}
                    className="mt-1 accent-primary"
                  />
                  <span>
                    <span className="block text-sm font-semibold">{loc.name}</span>
                    <span className="block text-xs text-muted-foreground">{loc.address}</span>
                  </span>
                </label>
              ))}
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="notes" className="text-sm font-medium">
              Order notes <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <textarea id="notes" name="notes" rows={3} maxLength={1000} className={cn(input, 'resize-none')} />
          </div>
        </fieldset>

        <div className="flex items-start gap-3 rounded-3xl border border-border p-6">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <CreditCard className="size-4" />
          </span>
          <div>
            <h2 className="font-semibold">Payment</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Online payment isn&apos;t available yet, and you won&apos;t be charged now. After you
              place your order, our team confirms availability and delivery, then arranges
              payment with you.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <OrderSummary subtotal={subtotal}>
          <ul className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  {i.name} <span className="whitespace-nowrap">× {formatQuantity(i.quantity, i.unit)}</span>
                </span>
                <span className="font-medium tabular-nums">{formatNaira(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>

          {error && (
            <p role="alert" className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-60"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {submitting ? 'Placing order…' : 'Place order'}
          </button>
          <Link
            href="/marketplace/cart"
            className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to cart
          </Link>
        </OrderSummary>
      </div>
    </form>
  )
}

function Confirmation({ order, sampleData }: { order: Order; sampleData: boolean }) {
  const pickup =
    order.fulfilment.method === 'pickup'
      ? pickupLocations.find((l) => l.id === (order.fulfilment as { locationId: string }).locationId)
      : undefined

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-border bg-secondary/60 p-6 text-center sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CircleCheck className="size-7" />
        </span>
        <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">Order received</h2>
        <p className="mt-2 text-muted-foreground">
          Reference <span className="font-semibold text-foreground">{order.reference}</span>
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Awaiting confirmation</span>
          <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">Not paid</span>
        </div>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
          We&apos;ll contact you on <span className="font-medium text-foreground">{order.customer.phone}</span> to
          confirm availability{order.fulfilment.method === 'delivery' ? ', the delivery fee' : ''} and payment.
          Nothing has been charged.
        </p>

        {sampleData && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>Preview mode: this order was not sent to our team. Ordering opens once the marketplace goes live.</p>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-3xl border border-border p-6">
        <ul className="space-y-2 text-sm">
          {order.lines.map((l) => (
            <li key={l.productId} className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                {l.name} × {formatQuantity(l.quantity, l.unit)}
              </span>
              <span className="font-medium tabular-nums">{formatNaira(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold">
          <span>Total (excl. delivery)</span>
          <span className="tabular-nums">{formatNaira(order.subtotal)}</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {order.fulfilment.method === 'delivery'
            ? `Delivery to ${order.fulfilment.address}, ${order.fulfilment.city}, ${order.fulfilment.state}`
            : `Pickup at ${pickup?.name ?? 'our store'} — ${pickup?.address ?? ''}`}
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
        >
          Back to marketplace
        </Link>
      </div>
    </div>
  )
}
