'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { 
  StarIcon,
  MoonIcon,
  SunIcon,
  SparklesIcon,
  HeartIcon,
  ZapIcon,
  GemIcon,
  BrainIcon,
  CalculatorIcon,
  EyeIcon,
  LayoutDashboardIcon,
  UsersIcon,
  BookOpenIcon,
  TrendingUpIcon,
  ShieldIcon,
  AwardIcon,
  InfinityIcon
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Custom Logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 rounded-full flex items-center justify-center">
                  <InfinityIcon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <SparklesIcon className="h-2 w-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                  Cosmic Wisdom Platform
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your Complete Spiritual Journey Companion
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/chakras">
                <Button variant="outline" size="sm">
                  <ZapIcon className="h-4 w-4 mr-2" />
                  Chakras
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="cosmic" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                8 Spiritual Tools
              </Badge>
              <Badge variant="outline">
                Professional Grade
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Animated Icons */}
            <div className="flex justify-center space-x-6 mb-8">
              <div className="relative">
                <SunIcon className="h-16 w-16 text-yellow-500 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
              </div>
              <div className="relative">
                <MoonIcon className="h-16 w-16 text-blue-400 animate-bounce" />
                <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <div className="relative">
                <StarIcon className="h-16 w-16 text-purple-500 animate-pulse" />
                <div className="absolute inset-0 bg-purple-400 rounded-full opacity-20 animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="relative">
                <SparklesIcon className="h-16 w-16 text-pink-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-0 bg-pink-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 via-blue-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Your Spiritual
                <br />
                Journey Awaits
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover the ultimate spiritual platform combining ancient wisdom with modern technology. 
                Explore astrology, tarot, numerology, chakras, crystals, meditation, and find your spiritual community.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg">
                  <LayoutDashboardIcon className="h-5 w-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/chakras">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  <StarIcon className="h-5 w-5 mr-2" />
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Tools Grid */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Complete Spiritual Toolkit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Eight powerful spiritual tools integrated into one comprehensive platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Chakra Assessment */}
            <Link href="/chakras">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-purple-200">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ZapIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Chakra Assessment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Comprehensive energy center analysis with personalized recommendations and balancing techniques.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    7 Energy Centers
                  </Badge>
                </CardContent>
              </Card>
            </Link>

            {/* Community */}
            <Link href="/community">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-purple-200">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HeartIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Spiritual Community</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Connect with like-minded souls, find spiritual partners, and join study groups.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Soul Connections
                  </Badge>
                </CardContent>
              </Card>
            </Link>

            {/* Dashboard */}
            <Link href="/dashboard">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-purple-200">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <SunIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Daily Guidance</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Personalized daily insights combining all spiritual tools for comprehensive guidance.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    All Tools Combined
                  </Badge>
                </CardContent>
              </Card>
            </Link>

            {/* Coming Soon */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-purple-200 opacity-75">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">More Tools</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Astrology, Tarot, Numerology, Crystals, and Meditation tools coming soon.
                </p>
                <Badge variant="outline" className="text-xs">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <InfinityIcon className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Cosmic Wisdom
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Cosmic Wisdom Platform. Your complete spiritual journey companion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}