'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function PageHero({
  image,
  alt,
  eyebrow,
  title,
  description,
}: {
  image: string
  alt: string
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-wide text-primary uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-white/80"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
