import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { LogoMarquee } from '@/components/site/logo-marquee'
import { About } from '@/components/site/about'
import { Showcase } from '@/components/site/showcase'
import { Solutions } from '@/components/site/solutions'
import { Technology } from '@/components/site/technology'
import { Testimonials } from '@/components/site/testimonials'
import { CTA } from '@/components/site/cta'
import { Footer } from '@/components/site/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <About />
      <Showcase />
      <Solutions />
      <Technology />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
