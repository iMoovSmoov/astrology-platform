import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Astrology Platform - Ancient Wisdom Meets Modern Technology',
  description: 'Comprehensive astrology platform with accurate birth charts, personalized horoscopes, compatibility analysis, and spiritual guidance.',
  keywords: ['astrology', 'birth chart', 'horoscope', 'zodiac', 'planets', 'natal chart'],
  authors: [{ name: 'iMoovSmoov' }],
  openGraph: {
    title: 'Astrology Platform',
    description: 'Discover your cosmic blueprint with accurate birth charts and personalized astrological insights.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}