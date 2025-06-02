'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CommunityFeed } from '@/components/community/CommunityFeed'
import { cn } from '@/lib/utils'
import { 
  UsersIcon,
  TrendingUpIcon,
  StarIcon,
  MessageCircleIcon,
  HeartIcon,
  ArrowLeftIcon,
  SparklesIcon,
  BookOpenIcon,
  HelpCircleIcon,
  ChartBarIcon,
  GlobeIcon,
  UserPlusIcon,
  SearchIcon,
  FilterIcon
} from 'lucide-react'
import Link from 'next/link'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('feed')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock data for community stats
  const communityStats = {
    totalMembers: 12847,
    activeToday: 1234,
    postsToday: 89,
    questionsAnswered: 156
  }

  const trendingTopics = [
    { tag: 'mercury-retrograde', posts: 234, trend: '+12%' },
    { tag: 'full-moon', posts: 189, trend: '+8%' },
    { tag: 'synastry', posts: 156, trend: '+15%' },
    { tag: 'birth-chart', posts: 143, trend: '+5%' },
    { tag: 'transits', posts: 98, trend: '+22%' }
  ]

  const featuredMembers = [
    {
      id: '1',
      name: 'Luna Starweaver',
      username: 'lunastar',
      level: 'professional',
      specialties: ['Synastry', 'Transits'],
      followers: 2341,
      avatar: null
    },
    {
      id: '2', 
      name: 'Marcus Celestial',
      username: 'marcuscel',
      level: 'advanced',
      specialties: ['Horary', 'Electional'],
      followers: 1876,
      avatar: null
    },
    {
      id: '3',
      name: 'Aria Moonchild',
      username: 'ariamoon',
      level: 'intermediate',
      specialties: ['Tarot', 'Intuitive'],
      followers: 987,
      avatar: null
    }
  ]

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'professional': return 'default'
      case 'advanced': return 'secondary'
      case 'intermediate': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-violet-900 dark:to-purple-900">
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
                <UsersIcon className="h-8 w-8 text-purple-600" />
                <SparklesIcon className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Astrology Community
                </h1>
                <p className="text-sm text-muted-foreground">
                  Connect, learn, and share with fellow astrology enthusiasts
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="cosmic">12.8K Members</Badge>
              <Badge variant="outline">Active Community</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUpIcon className="h-5 w-5 text-green-600" />
                  <span>Community Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {communityStats.totalMembers.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {communityStats.activeToday.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Active Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="questions">Q&A</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                <CommunityFeed />
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <TrendingUpIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Trending Posts</h3>
                      <p className="text-muted-foreground">Discover the most popular content in the community</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <HelpCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Questions & Answers</h3>
                      <p className="text-muted-foreground">Get help from the community and share your knowledge</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="charts" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <ChartBarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold">Shared Charts</h3>
                      <p className="text-muted-foreground">Explore birth charts shared by community members</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageCircleIcon className="h-4 w-4 mr-2" />
                  Ask a Question
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ChartBarIcon className="h-4 w-4 mr-2" />
                  Share Chart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}