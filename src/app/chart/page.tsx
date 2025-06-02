import { BirthChartForm } from '@/components/chart/birth-chart-form'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function ChartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header />
      <main className="container py-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create Your Birth Chart
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Enter your birth details to generate an accurate astrological birth chart
              with professional-grade calculations.
            </p>
          </div>
          
          <BirthChartForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}