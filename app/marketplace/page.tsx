import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { CatalogBrowser } from '@/components/marketplace/catalog-browser'
import { MarketBanner } from '@/components/marketplace/market-banner'
import { getCategories, getProducts, USING_SAMPLE_DATA } from '@/lib/marketplace/catalog'

export const metadata: Metadata = {
  title: 'Marketplace | Green Eden Farms',
  description:
    'Buy fresh produce straight from Green Eden Farms cold storage — vegetables, fruits, tubers, peppers and leafy greens, with delivery or pickup in Jos and Abuja.',
}

export default async function MarketplacePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <main className="min-h-screen bg-background">
      <Navbar solid />
      <MarketBanner />
      <CatalogBrowser products={products} categories={categories} sampleData={USING_SAMPLE_DATA} />
      <Footer />
    </main>
  )
}
