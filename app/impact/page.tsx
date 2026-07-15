import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { PageHero } from '@/components/site/page-hero'
import { ImpactContent } from '@/components/site/impact-content'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Impact | Green Eden Farms',
  description:
    'How Green Eden Farms empowers farmers, reduces food losses, drives sustainable agriculture, and strengthens food security across Africa.',
}

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        image="/images/aboutIMG.jpg"
        alt="Aerial view of farmland showing sustainable agriculture in practice"
        eyebrow="Our Impact"
        title="Creating Lasting Impact Across Agriculture"
        description="Our mission goes beyond growing crops — we're building resilient farming communities, strengthening food systems, and driving sustainable agricultural transformation."
      />
      <ImpactContent />
      <Footer />
    </main>
  )
}
