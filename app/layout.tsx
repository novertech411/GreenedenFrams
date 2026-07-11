import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Green Eden Farms | Smart Agritech for a Sustainable Future',
  description:
    'Green Eden Farms delivers climate-smart agriculture powered by AI, IoT, precision farming and renewable energy — helping farmers grow more with less.',
  generator: 'v0.app',
  keywords: [
    'agritech',
    'precision agriculture',
    'IoT farming',
    'smart irrigation',
    'greenhouse farming',
    'climate smart agriculture',
    'AI agriculture',
  ],
  openGraph: {
    title: 'Green Eden Farms | Smart Agritech for a Sustainable Future',
    images: '/images/logogreen.png',

    description:
      'Climate-Smart Agriculture powered by Artificial Intelligence, IoT and Renewable Energy.',
    type: 'website',
  },
  icons: {
    icon: '/images/logogreen.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#75C535',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${jakarta.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
