import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  MapPin,
  Snowflake,
  Thermometer,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { AddToCart } from '@/components/marketplace/add-to-cart'
import { ProductImage, StockBadge } from '@/components/marketplace/product-parts'
import { getCategories, getProductBySlug, getProducts } from '@/lib/marketplace/catalog'
import { formatDate, formatNaira } from '@/lib/marketplace/format'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug)
  if (!product) return { title: 'Product not found | Green Eden Farms' }
  return {
    title: `${product.name} | Green Eden Marketplace`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const [product, categories] = await Promise.all([getProductBySlug(slug), getCategories()])
  if (!product) notFound()

  const category = categories.find((c) => c.id === product.categoryId)

  // Only facts present in the product record are listed.
  const details: { icon: LucideIcon; label: string; value: string }[] = []
  if (product.harvestDate)
    details.push({ icon: CalendarDays, label: 'Harvested', value: formatDate(product.harvestDate) })
  if (product.storedOn)
    details.push({ icon: Snowflake, label: 'Placed in cold storage', value: formatDate(product.storedOn) })
  if (product.storageLocation)
    details.push({ icon: Warehouse, label: 'Cold room', value: product.storageLocation })
  if (product.storageTempC)
    details.push({
      icon: Thermometer,
      label: 'Recommended storage',
      value: `${product.storageTempC.min}–${product.storageTempC.max}°C`,
    })
  if (product.origin) details.push({ icon: MapPin, label: 'Origin', value: product.origin })
  if (product.qualityNote)
    details.push({ icon: BadgeCheck, label: 'Quality', value: product.qualityNote })

  return (
    <main className="min-h-screen bg-background">
      <Navbar solid />
      <section className="pt-28 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to marketplace
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div
              className={`relative aspect-4/3 overflow-hidden rounded-4xl ${product.image ? 'lg:aspect-4/5' : ''}`}
            >
              <ProductImage
                product={product}
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority
                iconClassName="size-24"
              />
            </div>

            <div className="lg:py-4">
              {category && (
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  {category.name}
                </p>
              )}
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <p className="text-2xl font-bold tabular-nums">
                  {formatNaira(product.price)}
                  <span className="text-base font-medium text-muted-foreground"> / {product.unit}</span>
                </p>
                <StockBadge product={product} />
              </div>
              <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-8">
                <AddToCart product={product} />
              </div>

              {details.length > 0 && (
                <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                  {details.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 rounded-2xl border border-border p-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <dt className="text-xs text-muted-foreground">{label}</dt>
                        <dd className="text-sm font-semibold">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
