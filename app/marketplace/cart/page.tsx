import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { CartView } from '@/components/marketplace/cart-view'

export const metadata: Metadata = {
  title: 'Your Cart | Green Eden Marketplace',
}

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar solid />
      <section className="pt-28 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Marketplace</p>
          <h1 className="mt-3 mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Your cart</h1>
          <CartView />
        </div>
      </section>
      <Footer />
    </main>
  )
}
