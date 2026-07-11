'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'

const offset: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.92 },
  none: {},
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  once?: boolean
}) {
  const o = offset[direction]
  const variants: Variants = {
    hidden: { opacity: 0, x: o.x ?? 0, y: o.y ?? 0, scale: o.scale ?? 1 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
    >
      {children}
    </motion.div>
  )
}
