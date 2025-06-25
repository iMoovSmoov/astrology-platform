import { DailyHoroscope } from '@/components/horoscope/DailyHoroscope'
import Link from 'next/link'
import { ArrowLeftIcon, StarIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function HoroscopePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Platform</span>
            </Link>
            <div className="flex items-center space-x-2">
              <StarIcon className="h-6 w-6 text-yellow-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Daily Horoscope
              </h1>
            </div>
            <Badge variant="outline">Zodiac Wisdom</Badge>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">
        <DailyHoroscope />
      </main>
    </div>
  )
}
