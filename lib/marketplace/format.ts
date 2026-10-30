import type { PricingUnit, Product, StockStatus } from './types'

// Display helpers shared by server and client components. Keep this file free
// of data access so it stays safe to bundle on the client.

export const pickupLocations = [
  {
    id: 'jos',
    name: 'Jos',
    address: 'Haske Quarters Road 8b, Jos, Plateau State, Nigeria',
  },
  {
    id: 'abuja',
    name: 'Abuja',
    address: 'Plot 609 Jemibewon Crescent, Zone E, Gudu, Abuja, Nigeria',
  },
]

const LOW_STOCK_THRESHOLD = 10

export function stockStatus(product: Pick<Product, 'quantityAvailable'>): StockStatus {
  if (product.quantityAvailable <= 0) return 'out_of_stock'
  if (product.quantityAvailable <= LOW_STOCK_THRESHOLD) return 'low_stock'
  return 'in_stock'
}

export const stockLabel: Record<StockStatus, string> = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  out_of_stock: 'Out of stock',
}

const unitPlural: Record<PricingUnit, string> = {
  kg: 'kg',
  crate: 'crates',
  basket: 'baskets',
  bag: 'bags',
  bunch: 'bunches',
  piece: 'pieces',
}

export function formatQuantity(quantity: number, unit: PricingUnit) {
  return `${quantity.toLocaleString('en-NG')} ${quantity === 1 ? unit : unitPlural[unit]}`
}

const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

export function formatNaira(amount: number) {
  return naira.format(amount)
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
