import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { CheckoutView } from '@/components/marketplace/checkout-view'
import { USING_SAMPLE_DATA } from '@/lib/marketplace/catalog'

export const metadata: Metadata = {
  title: 'Checkout | Green Eden Marketplace',
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar solid />
      <section className="pt-28 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Marketplace</p>
          <h1 className="mt-3 mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>
          <CheckoutView sampleData={USING_SAMPLE_DATA} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
