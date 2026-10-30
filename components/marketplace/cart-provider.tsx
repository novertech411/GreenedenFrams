'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, Product } from '@/lib/marketplace/types'

const STORAGE_KEY = 'ge-cart-v1'

type CartContextValue = {
  items: CartItem[]
  /** False until the saved cart has been read from storage. */
  ready: boolean
  count: number
  subtotal: number
  add: (product: Product, quantity: number) => void
  setQuantity: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {
      // Storage unavailable or corrupt — start with an empty cart.
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore — the cart still works for this visit.
    }
  }, [items, ready])

  const value = useMemo<CartContextValue>(() => {
    const clamp = (quantity: number, max: number) =>
      Math.max(1, Math.min(Math.floor(quantity), max))

    return {
      items,
      ready,
      count: items.length,
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      add: (product, quantity) =>
        setItems((current) => {
          const max = product.quantityAvailable
          if (max <= 0) return current
          const existing = current.find((i) => i.productId === product.id)
          if (existing) {
            return current.map((i) =>
              i.productId === product.id
                ? { ...i, maxQuantity: max, quantity: clamp(i.quantity + quantity, max) }
                : i,
            )
          }
          return [
            ...current,
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              categoryId: product.categoryId,
              image: product.image,
              price: product.price,
              unit: product.unit,
              quantity: clamp(quantity, max),
              maxQuantity: max,
            },
          ]
        }),
      setQuantity: (productId, quantity) =>
        setItems((current) =>
          current.map((i) =>
            i.productId === productId ? { ...i, quantity: clamp(quantity, i.maxQuantity) } : i,
          ),
        ),
      remove: (productId) =>
        setItems((current) => current.filter((i) => i.productId !== productId)),
      clear: () => setItems([]),
    }
  }, [items, ready])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
