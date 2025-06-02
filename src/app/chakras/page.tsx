'use client'

import React from 'react'
import { ChakraAssessment } from '@/components/chakras/ChakraAssessment'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ZapIcon,
  ArrowLeftIcon,
  CircleIcon,
  HeartIcon,
  EyeIcon,
  StarIcon,
  SunIcon
} from 'lucide-react'
import Link from 'next/link'

export default function ChakrasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back to Platform</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ZapIcon className="h-8 w-8 text-purple-600" />
                <StarIcon className="absolute -top-1 -right-1 h-4 w-4 text-indigo-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Chakra Assessment
                </h1>
                <p className="text-sm text-muted-foreground">
                  Balance your energy centers for optimal well-being
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="cosmic">Energy Centers</Badge>
              <Badge variant="outline">Balance & Healing</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <CircleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '0.2s' }}>
              <CircleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '0.4s' }}>
              <SunIcon className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '0.6s' }}>
              <HeartIcon className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '0.8s' }}>
              <CircleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
              <EyeIcon className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '1.2s' }}>
              <StarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Discover Your Chakra Balance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Assess the balance of your seven energy centers and receive personalized recommendations 
            for chakra healing, crystal therapy, and energy alignment practices.
          </p>
        </div>

        {/* Main Assessment Component */}
        <ChakraAssessment />
      </main>
    </div>
  )
}