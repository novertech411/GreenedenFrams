import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { PageHero } from '@/components/site/page-hero'
import { ContactContent } from '@/components/site/contact-content'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Contact | Green Eden Farms',
  description:
    'Get in touch with Green Eden Farms — partnerships, investment, and project inquiries welcome.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        image="/images/coldroom.jpg"
        alt="Solar-powered cold storage facility"
        eyebrow="Contact Us"
        title="Let's Build the Future of Agriculture Together"
        description="Whether you're a farmer, agribusiness, investor, government agency, NGO, or development partner, Green Eden Farms is ready to help transform agriculture through innovation."
      />
      <ContactContent />
      <Footer />
    </main>
  )
}
