import { BirthChartDisplay } from '@/components/chart/birth-chart-display'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { notFound } from 'next/navigation'

// Mock data - in production this would come from your database
const getMockChart = (id: string) => {
  return {
    id,
    name: 'Sample Birth Chart',
    birthData: {
      date: new Date('1990-06-15T14:30:00Z'),
      time: '14:30',
      location: {
        city: 'New York',
        country: 'United States',
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: 'America/New_York',
      },
      timezone: 'America/New_York',
    },
    planets: [
      {
        name: 'Sun' as const,
        longitude: 84.5,
        latitude: 0.0,
        distance: 1.0,
        speed: 1.0,
        retrograde: false,
        house: 5,
        sign: 'Gemini' as const,
        degree: 24,
        minute: 30,
        second: 0,
      },
      {
        name: 'Moon' as const,
        longitude: 45.2,
        latitude: 5.2,
        distance: 0.002,
        speed: 13.2,
        retrograde: false,
        house: 2,
        sign: 'Taurus' as const,
        degree: 15,
        minute: 12,
        second: 0,
      },
      {
        name: 'Mercury' as const,
        longitude: 72.8,
        latitude: 1.2,
        distance: 0.8,
        speed: 1.5,
        retrograde: false,
        house: 4,
        sign: 'Gemini' as const,
        degree: 12,
        minute: 48,
        second: 0,
      },
      {
        name: 'Venus' as const,
        longitude: 105.3,
        latitude: -1.1,
        distance: 0.7,
        speed: 1.2,
        retrograde: false,
        house: 6,
        sign: 'Cancer' as const,
        degree: 15,
        minute: 18,
        second: 0,
      },
      {
        name: 'Mars' as const,
        longitude: 315.7,
        latitude: 0.8,
        distance: 1.5,
        speed: 0.5,
        retrograde: false,
        house: 12,
        sign: 'Aquarius' as const,
        degree: 15,
        minute: 42,
        second: 0,
      },
    ],
    houses: [
      { number: 1, cusp: 15.2, sign: 'Virgo' as const, ruler: 'Mercury' as const },
      { number: 2, cusp: 45.8, sign: 'Libra' as const, ruler: 'Venus' as const },
      { number: 3, cusp: 76.4, sign: 'Scorpio' as const, ruler: 'Mars' as const },
      { number: 4, cusp: 107.0, sign: 'Sagittarius' as const, ruler: 'Jupiter' as const },
      { number: 5, cusp: 137.6, sign: 'Capricorn' as const, ruler: 'Saturn' as const },
      { number: 6, cusp: 168.2, sign: 'Aquarius' as const, ruler: 'Saturn' as const },
      { number: 7, cusp: 195.2, sign: 'Pisces' as const, ruler: 'Jupiter' as const },
      { number: 8, cusp: 225.8, sign: 'Aries' as const, ruler: 'Mars' as const },
      { number: 9, cusp: 256.4, sign: 'Taurus' as const, ruler: 'Venus' as const },
      { number: 10, cusp: 287.0, sign: 'Gemini' as const, ruler: 'Mercury' as const },
      { number: 11, cusp: 317.6, sign: 'Cancer' as const, ruler: 'Moon' as const },
      { number: 12, cusp: 348.2, sign: 'Leo' as const, ruler: 'Sun' as const },
    ],
    aspects: [
      {
        planet1: 'Sun' as const,
        planet2: 'Moon' as const,
        type: 'trine' as const,
        orb: 2.5,
        exactOrb: 120,
        applying: false,
        separating: true,
        strength: 'strong' as const,
      },
      {
        planet1: 'Venus' as const,
        planet2: 'Mars' as const,
        type: 'opposition' as const,
        orb: 3.2,
        exactOrb: 180,
        applying: true,
        separating: false,
        strength: 'moderate' as const,
      },
    ],
    houseSystem: 'placidus' as const,
    zodiacSystem: 'tropical' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

interface ChartPageProps {
  params: {
    id: string
  }
}

export default function ChartPage({ params }: ChartPageProps) {
  // In production, you would fetch the chart from your database
  // const chart = await getChartById(params.id)
  // if (!chart) notFound()
  
  const chart = getMockChart(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header />
      <main className="container py-8">
        <BirthChartDisplay chart={chart} />
      </main>
      <Footer />
    </div>
  )
}

export function generateMetadata({ params }: ChartPageProps) {
  return {
    title: `Birth Chart ${params.id} - AstroWisdom`,
    description: 'View detailed birth chart analysis with planetary positions, houses, and aspects.',
  }
}