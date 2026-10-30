import { NextResponse } from 'next/server'
import { getProductsByIds } from '@/lib/marketplace/catalog'
import { formatQuantity, pickupLocations } from '@/lib/marketplace/format'
import type { Fulfilment, Order, OrderLine, OrderRequest } from '@/lib/marketplace/types'

// Creates an order request. Prices and stock are re-read from the catalog here,
// never trusted from the client.
//
// TODO before taking real orders:
//  - persist the order (database / inventory system) and reserve stock
//  - notify the sales team (email, WhatsApp, dashboard) so someone follows up
//  - integrate a payment provider; orders stay `unpaid` until then

const text = (v: unknown, max: number) =>
  typeof v === 'string' && v.trim().length > 0 && v.trim().length <= max ? v.trim() : null

function parse(body: unknown): { data: OrderRequest } | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid request.' }
  const b = body as Record<string, any>

  const name = text(b.customer?.name, 100)
  const phone = text(b.customer?.phone, 20)
  if (!name) return { error: 'Please enter your name.' }
  if (!phone || !/^\+?[\d\s()-]{7,20}$/.test(phone)) return { error: 'Please enter a valid phone number.' }
  const email = b.customer?.email ? text(b.customer.email, 200) : undefined
  if (email === null || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
    return { error: 'Please enter a valid email address.' }

  let fulfilment: Fulfilment
  if (b.fulfilment?.method === 'pickup') {
    const locationId = b.fulfilment.locationId
    if (!pickupLocations.some((l) => l.id === locationId)) return { error: 'Please choose a pickup location.' }
    fulfilment = { method: 'pickup', locationId }
  } else if (b.fulfilment?.method === 'delivery') {
    const address = text(b.fulfilment.address, 300)
    const city = text(b.fulfilment.city, 100)
    const state = text(b.fulfilment.state, 100)
    if (!address || !city || !state) return { error: 'Please complete your delivery address.' }
    fulfilment = { method: 'delivery', address, city, state }
  } else {
    return { error: 'Please choose delivery or pickup.' }
  }

  if (!Array.isArray(b.items) || b.items.length === 0 || b.items.length > 50)
    return { error: 'Your cart is empty.' }
  const items: OrderRequest['items'] = []
  for (const item of b.items) {
    if (typeof item?.productId !== 'string' || !Number.isInteger(item.quantity) || item.quantity < 1)
      return { error: 'Your cart contains an invalid item.' }
    items.push({ productId: item.productId, quantity: item.quantity })
  }

  const notes = b.notes ? (text(b.notes, 1000) ?? undefined) : undefined
  return { data: { customer: { name, phone, email }, fulfilment, notes, items } }
}

function reference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  return 'GE-' + Array.from(bytes, (b) => chars[b % chars.length]).join('')
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = parse(body)
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 })
  const req = parsed.data

  const products = await getProductsByIds(req.items.map((i) => i.productId))
  const lines: OrderLine[] = []
  for (const item of req.items) {
    const product = products.get(item.productId)
    if (!product) {
      return NextResponse.json(
        { error: 'An item in your cart is no longer available. Please review your cart.' },
        { status: 409 },
      )
    }
    if (item.quantity > product.quantityAvailable) {
      return NextResponse.json(
        {
          error:
            product.quantityAvailable > 0
              ? `Only ${formatQuantity(product.quantityAvailable, product.unit)} of ${product.name} available. Please update your cart.`
              : `${product.name} is out of stock. Please remove it from your cart.`,
        },
        { status: 409 },
      )
    }
    lines.push({
      productId: product.id,
      name: product.name,
      unit: product.unit,
      price: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    })
  }

  const order: Order = {
    reference: reference(),
    createdAt: new Date().toISOString(),
    status: 'awaiting_confirmation',
    paymentStatus: 'unpaid',
    customer: req.customer,
    fulfilment: req.fulfilment,
    notes: req.notes,
    lines,
    subtotal: lines.reduce((sum, l) => sum + l.lineTotal, 0),
  }

  return NextResponse.json({ order }, { status: 201 })
}
