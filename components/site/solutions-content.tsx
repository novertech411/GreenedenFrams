'use client'

import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from './reveal'

const sections = [
  {
    image: '/images/product-drone.png',
    eyebrow: 'Precision Agriculture',
    title: 'Maximize yield, minimize waste',
    desc: 'Use intelligent farming technologies to maximize crop productivity while minimizing resource waste. Our precision agriculture solutions combine data, automation, and smart decision-making to optimize irrigation, fertilization, and crop management.',
    features: [
      'Smart Irrigation',
      'Soil Monitoring',
      'Weather Intelligence',
      'Crop Health Monitoring',
      'Precision Fertilizer Management',
      'Farm Analytics Dashboard',
    ],
    reverse: false,
  },
  {
    image: '/images/product-analytics.png',
    eyebrow: 'ScareGrow AI',
    title: 'Your intelligent farm assistant',
    desc: 'ScareGrow AI is our AI-powered agricultural platform that helps farmers monitor crops, identify diseases, detect pests, and receive instant agronomic recommendations.',
    features: [
      'AI Crop Diagnosis',
      'Disease Identification',
      'Pest Detection',
      'Real-Time Alerts',
      'AI Agronomist',
      'Satellite Monitoring',
      'Crop Recommendations',
      'Farm Records',
      'Market Insights',
    ],
    reverse: true,
  },
  {
    image: '/images/tech-tablet.png',
    eyebrow: 'IoT Farm Monitoring',
    title: 'Stay connected to your farm, anywhere',
    desc: 'Our IoT monitoring systems collect real-time environmental data that helps farmers make informed decisions every day.',
    features: [
      'Soil Moisture',
      'Soil Temperature',
      'Air Temperature',
      'Humidity',
      'Water Levels',
      'Greenhouse Conditions',
      'Live Camera Monitoring',
    ],
    reverse: false,
  },
  {
    image: '/images/greenhouse1.jpg',
    eyebrow: 'Greenhouse Farming',
    title: 'High-quality crops, all year round',
    desc: 'Grow high-quality crops all year round using climate-controlled greenhouse systems. Our greenhouse solutions improve yields while reducing water usage, pest infestations, and weather-related risks.',
    features: ['Tomatoes', 'Bell Peppers', 'Cucumbers', 'Lettuce', 'Spinach', 'Herbs'],
    reverse: true,
  },
  {
    image: '/images/coldroom1.jpg',
    eyebrow: 'Solar-Powered Cold Storage',
    title: 'Preserve more. Waste less.',
    desc: 'Millions of tonnes of food are lost every year due to inadequate storage. Our solar-powered cold storage systems extend the shelf life of fresh produce using clean, renewable energy — even in off-grid communities.',
    features: [
      'Reduced Food Waste',
      'Increased Farmer Income',
      'Better Food Quality',
      'Lower Carbon Emissions',
      'Community Cold Storage',
      'Commercial Cold Rooms',
    ],
    reverse: false,
  },
  {
    image: '/images/product-tractor.png',
    eyebrow: 'Agricultural Consultancy',
    title: 'Helping farms embrace modern agriculture',
    desc: 'We provide expert advisory services, technology deployment, greenhouse design, irrigation planning, precision agriculture implementation, research, and farmer capacity development.',
    features: [
      'Technology Deployment',
      'Greenhouse Design',
      'Irrigation Planning',
      'Precision Ag Implementation',
      'Applied Research',
      'Farmer Capacity Development',
    ],
    reverse: true,
  },
]

export function SolutionsContent() {
  return (
    <>
      {sections.map((s, i) => (
        <section
          key={s.eyebrow}
          className={i % 2 === 0 ? 'bg-background py-20 sm:py-28' : 'bg-secondary py-20 sm:py-28'}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 ${
                s.reverse ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Reveal direction={s.reverse ? 'left' : 'right'}>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal direction={s.reverse ? 'right' : 'left'} delay={0.1}>
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  {s.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
                  {s.desc}
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="size-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-background pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="scale">
            <div className="flex flex-col items-center gap-6 rounded-4xl bg-primary px-6 py-16 text-center sm:py-20">
              <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-balance text-primary-foreground sm:text-4xl">
                Ready to bring these solutions to your farm?
              </h2>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                Talk to Our Team
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
