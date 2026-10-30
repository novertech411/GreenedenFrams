import { categories, products } from './mock-data'
import type { Category, Product } from './types'

// Data access for the marketplace. Every page and the orders API read through
// these functions, so swapping the mock arrays for the real inventory API only
// means changing the bodies below (keep them async).

/** Set to false once products come from the real inventory system. */
export const USING_SAMPLE_DATA = true

export async function getCategories(): Promise<Category[]> {
  return categories
}

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug)
}

export async function getProductsByIds(ids: string[]): Promise<Map<string, Product>> {
  return new Map(products.filter((p) => ids.includes(p.id)).map((p) => [p.id, p]))
}
