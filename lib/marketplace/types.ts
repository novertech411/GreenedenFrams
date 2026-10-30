export type Category = {
  id: string
  name: string
  description?: string
}

export type PricingUnit = 'kg' | 'crate' | 'basket' | 'bag' | 'bunch' | 'piece'

export type Product = {
  id: string
  slug: string
  name: string
  categoryId: string
  /** Path under /public. Omit when there is no real photo of this product. */
  image?: string
  /** Price in NGN per `unit`, whole naira. */
  price: number
  unit: PricingUnit
  /** Units currently available to order. */
  quantityAvailable: number
  description: string
  /** Show in the featured band on the marketplace landing page. */
  featured?: boolean

  // Optional details — only rendered when present. Never fill these with
  // placeholder values; leave them undefined until verified.
  harvestDate?: string // ISO date
  storedOn?: string // ISO date
  storageLocation?: string
  storageTempC?: { min: number; max: number }
  origin?: string
  qualityNote?: string
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export type CartItem = {
  productId: string
  slug: string
  name: string
  categoryId: string
  image?: string
  price: number
  unit: PricingUnit
  quantity: number
  /** Stock at the time the item was added, used to cap the quantity selector. */
  maxQuantity: number
}

export type Fulfilment =
  | {
      method: 'delivery'
      address: string
      city: string
      state: string
    }
  | {
      method: 'pickup'
      locationId: string
    }

export type OrderRequest = {
  customer: {
    name: string
    phone: string
    email?: string
  }
  fulfilment: Fulfilment
  notes?: string
  items: { productId: string; quantity: number }[]
}

export type OrderLine = {
  productId: string
  name: string
  unit: PricingUnit
  price: number
  quantity: number
  lineTotal: number
}

export type Order = {
  reference: string
  createdAt: string
  status: 'awaiting_confirmation'
  paymentStatus: 'unpaid'
  customer: OrderRequest['customer']
  fulfilment: Fulfilment
  notes?: string
  lines: OrderLine[]
  subtotal: number
}
