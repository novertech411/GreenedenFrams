'use client'

import {
  Apple,
  Carrot,
  Flame,
  LeafyGreen,
  Minus,
  Plus,
  Salad,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { stockLabel, stockStatus } from '@/lib/marketplace/format'
import type { Product } from '@/lib/marketplace/types'

const categoryIcons: Record<string, LucideIcon> = {
  vegetables: Salad,
  fruits: Apple,
  tubers: Carrot,
  peppers: Flame,
  'leafy-greens': LeafyGreen,
}

export function categoryIcon(categoryId: string): LucideIcon {
  return categoryIcons[categoryId] ?? Sprout
}

/**
 * Product photo, or a branded placeholder tile when no real photo exists yet.
 * The parent must be `relative` with a defined size or aspect ratio.
 */
export function ProductImage({
  product,
  sizes,
  priority,
  iconClassName = 'size-12',
}: {
  product: Pick<Product, 'name' | 'image' | 'categoryId'>
  sizes: string
  priority?: boolean
  iconClassName?: string
}) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    )
  }

  const Icon = categoryIcon(product.categoryId)
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-accent">
      <Icon aria-hidden className={cn('text-primary/70', iconClassName)} strokeWidth={1.5} />
    </div>
  )
}

export function StockBadge({
  product,
  className,
}: {
  product: Pick<Product, 'quantityAvailable'>
  className?: string
}) {
  const status = stockStatus(product)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        status === 'in_stock' && 'bg-primary/15 text-primary-foreground',
        status === 'low_stock' && 'bg-amber-100 text-amber-800',
        status === 'out_of_stock' && 'bg-muted text-muted-foreground',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-1.5 rounded-full',
          status === 'in_stock' && 'bg-primary',
          status === 'low_stock' && 'bg-amber-500',
          status === 'out_of_stock' && 'bg-muted-foreground/60',
        )}
      />
      {stockLabel[status]}
    </span>
  )
}

export function QuantityStepper({
  value,
  max,
  onChange,
  label,
  size = 'md',
}: {
  value: number
  max: number
  onChange: (value: number) => void
  label: string
  size?: 'sm' | 'md'
}) {
  const button = cn(
    'inline-flex items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40',
    size === 'sm' ? 'size-8' : 'size-10',
  )

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background p-1">
      <button
        type="button"
        className={button}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={`Decrease ${label}`}
      >
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value)
          if (Number.isFinite(next)) onChange(Math.max(1, Math.min(next, max)))
        }}
        aria-label={label}
        className={cn(
          'w-12 bg-transparent text-center font-semibold tabular-nums focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          size === 'sm' ? 'text-sm' : 'text-base',
        )}
      />
      <button
        type="button"
        className={button}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}
