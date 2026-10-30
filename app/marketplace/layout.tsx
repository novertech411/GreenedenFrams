import type { ReactNode } from 'react'
import { CartButton } from '@/components/marketplace/cart-button'
import { CartProvider } from '@/components/marketplace/cart-provider'

export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartButton />
    </CartProvider>
  )
}
