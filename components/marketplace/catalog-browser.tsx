'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Info, LayoutGrid, Plus, Search, Snowflake, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatNaira, formatQuantity, stockStatus } from '@/lib/marketplace/format'
import type { Category, Product } from '@/lib/marketplace/types'
import { Reveal } from '@/components/site/reveal'
import { useCart } from './cart-provider'
import { categoryIcon, ProductImage, StockBadge } from './product-parts'

export function CatalogBrowser({
  products,
  categories,
  sampleData,
}: {
  products: Product[]
  categories: Category[]
  sampleData: boolean
}) {
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  const categoryName = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories],
  )

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of products) map.set(p.categoryId, (map.get(p.categoryId) ?? 0) + 1)
    return map
  }, [products])

  // Only offer categories that currently have products.
  const activeCategories = categories.filter((c) => counts.has(c.id))
  const featured = products.filter((p) => p.featured && p.quantityAvailable > 0)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products
      .filter((p) => !categoryId || p.categoryId === categoryId)
      .filter((p) => !q || p.name.toLowerCase().includes(q))
      .sort((a, b) => Number(a.quantityAvailable <= 0) - Number(b.quantityAvailable <= 0))
  }, [products, query, categoryId])

  const pickCategory = (id: string | null) => {
    setCategoryId(id)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const chip = (active: boolean) =>
    cn(
      'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
    )

  return (
    <>
      {sampleData && (
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>
              Preview: listings, prices and quantities shown here are sample data while we
              connect the marketplace to our live cold-room inventory.
            </p>
          </div>
        </div>
      )}

      {/* Categories */}
      <section id="categories" className="scroll-mt-24 bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">What we stock</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Shop by category
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-x-4 gap-y-12 sm:grid-cols-4 lg:grid-cols-7">
            {[{ id: null as string | null, name: 'All produce' }, ...activeCategories].map((c, i) => {
              const Icon = c.id ? categoryIcon(c.id) : LayoutGrid
              const active = categoryId === c.id
              const count = c.id ? (counts.get(c.id) ?? 0) : products.length
              return (
                <Reveal key={c.id ?? 'all'} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => pickCategory(c.id)}
                    aria-pressed={active}
                    className="group flex w-full flex-col items-center text-center"
                  >
                    <span
                      className={cn(
                        'relative h-20 w-full rounded-3xl transition-colors sm:h-24',
                        active ? 'bg-primary/30' : 'bg-secondary group-hover:bg-accent',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute -top-7 left-1/2 flex size-18 -translate-x-1/2 items-center justify-center rounded-full bg-background shadow-md ring-4 transition-transform duration-300 group-hover:-translate-y-1 sm:size-20',
                          active ? 'ring-primary' : 'ring-background',
                        )}
                      >
                        <Icon className="size-8 text-primary sm:size-9" strokeWidth={1.75} />
                      </span>
                    </span>
                    <span className="mt-3 text-sm font-semibold leading-tight">{c.name}</span>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      {count} {count === 1 ? 'item' : 'items'}
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {featured.length > 0 && <FeaturedBand products={featured} />}

      {/* All products */}
      <section id="products" className="scroll-mt-24 bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">Full catalogue</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {categoryId ? categoryName.get(categoryId) : 'All produce'}
              </h2>
            </div>
            <label className="relative block">
              <span className="sr-only">Search produce</span>
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search produce, e.g. tomatoes"
                className="w-full rounded-full border border-border bg-secondary/60 py-3 pr-4 pl-11 text-sm focus:border-primary focus:bg-background focus:outline-none"
              />
            </label>
          </div>

          <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <button type="button" onClick={() => setCategoryId(null)} className={chip(!categoryId)}>
              All produce
            </button>
            {activeCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryId(c.id)}
                className={chip(categoryId === c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'product' : 'products'}
          </p>

          {visible.length > 0 ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={categoryName.get(product.categoryId)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-3xl border border-dashed border-border px-6 py-16 text-center">
              <p className="font-semibold">No produce matches your search</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different name or browse all categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategoryId(null)
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
              >
                <X className="size-4" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function FeaturedBand({ products }: { products: Product[] }) {
  const rail = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-4xl bg-primary text-primary-foreground">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-white/20 blur-3xl"
            />
            <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.75fr_2.25fr] lg:items-center lg:gap-10">
              <div className="flex flex-col">
                <p className="text-sm font-semibold tracking-wide uppercase opacity-80">Featured</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
                  Picks from the cold room
                </h2>
                <p className="mt-3 leading-relaxed text-pretty opacity-80">
                  Popular produce we have in stock right now.
                </p>
                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => scroll(-1)}
                    aria-label="Scroll featured products left"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-white/20"
                  >
                    <ArrowLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scroll(1)}
                    aria-label="Scroll featured products right"
                    className="inline-flex size-11 items-center justify-center rounded-full bg-footer text-footer-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <ArrowRight className="size-5" />
                  </button>
                </div>
                <div className="relative mt-8 hidden size-40 overflow-hidden rounded-full ring-8 ring-white/25 lg:block">
                  <Image src="/images/veg-basket.webp" alt="" aria-hidden fill sizes="160px" className="object-cover" />
                </div>
              </div>

              <div
                ref={rail}
                className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
              >
                {products.map((p) => (
                  <FeaturedCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FeaturedCard({ product }: { product: Product }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const href = `/marketplace/${product.slug}`

  return (
    <article className="flex w-56 shrink-0 snap-start flex-col rounded-3xl bg-card p-3 text-card-foreground shadow-sm sm:w-60">
      <Link href={href} tabIndex={-1} className="relative block aspect-square overflow-hidden rounded-2xl">
        <ProductImage product={product} sizes="240px" />
        <StockBadge product={product} className="absolute top-2.5 left-2.5 bg-background/90 backdrop-blur" />
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-3 pb-1">
        <h3 className="font-semibold leading-snug">
          <Link href={href} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="font-bold tabular-nums">
            {formatNaira(product.price)}
            <span className="text-xs font-medium text-muted-foreground"> / {product.unit}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              add(product, 1)
              setAdded(true)
              setTimeout(() => setAdded(false), 1500)
            }}
            aria-label={`Add 1 ${product.unit} of ${product.name} to cart`}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
          </button>
        </div>
      </div>
    </article>
  )
}

function ProductCard({ product, categoryName }: { product: Product; categoryName?: string }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const soldOut = stockStatus(product) === 'out_of_stock'
  const href = `/marketplace/${product.slug}`

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link href={href} className="relative block aspect-4/3 overflow-hidden" tabIndex={-1}>
        <div
          className={cn(
            'absolute inset-0 transition-transform duration-500 group-hover:scale-105',
            soldOut && 'opacity-60 grayscale',
          )}
        >
          <ProductImage
            product={product}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <StockBadge product={product} className="absolute top-3 left-3 bg-background/90 backdrop-blur" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {categoryName && (
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">{categoryName}</p>
        )}
        <h3 className="mt-1.5 text-lg font-semibold leading-snug">
          <Link href={href} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {product.storageTempC && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Snowflake className="size-3.5 text-primary" />
            Best kept at {product.storageTempC.min}–{product.storageTempC.max}°C
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-lg font-bold tabular-nums">
              {formatNaira(product.price)}
              <span className="text-sm font-medium text-muted-foreground"> / {product.unit}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {soldOut ? 'Currently unavailable' : `${formatQuantity(product.quantityAvailable, product.unit)} available`}
            </p>
          </div>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => {
              add(product, 1)
              setAdded(true)
              setTimeout(() => setAdded(false), 1500)
            }}
            aria-label={`Add 1 ${product.unit} of ${product.name} to cart`}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
          >
            {added ? <Check className="size-5" /> : <Plus className="size-5" />}
          </button>
        </div>
      </div>
    </article>
  )
}
