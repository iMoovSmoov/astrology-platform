'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Platform</span>
          </Link>
          <h1 className="text-xl font-bold">Cosmic Wisdom Platform</h1>
        </div>
      </div>
    </header>
  )
}