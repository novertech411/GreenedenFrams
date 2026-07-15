import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { PageHero } from '@/components/site/page-hero'
import { AboutContent } from '@/components/site/about-content'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'About | Green Eden Farms',
  description:
    'Green Eden Farms is a climate-smart agritech company transforming agriculture through AI, IoT, renewable energy and data-driven farming solutions.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        image="/images/techIMG.JPG"
        alt="Farmer using technology to monitor crops in the field"
        eyebrow="About Us"
        title="Building the Future of Climate-Smart Agriculture"
        description="We are transforming agriculture through technology, helping farmers produce more food, reduce waste, and build resilient farming systems for generations to come."
      />
      <AboutContent />
      <Footer />
    </main>
  )
}
