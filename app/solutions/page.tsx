import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { PageHero } from '@/components/site/page-hero'
import { SolutionsContent } from '@/components/site/solutions-content'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Solutions | Green Eden Farms',
  description:
    'Precision agriculture, ScareGrow AI, IoT farm monitoring, greenhouse farming, solar-powered cold storage and agricultural consultancy from Green Eden Farms.',
}

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        image="/images/product-greenhouse.png"
        alt="Automated greenhouse growing systems"
        eyebrow="Our Solutions"
        title="Innovative Solutions for Smarter Agriculture"
        description="Harnessing technology to improve productivity, sustainability, and profitability across the agricultural value chain."
      />
      <SolutionsContent />
      <Footer />
    </main>
  )
}
