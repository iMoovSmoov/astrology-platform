'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CommunityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Community feed coming soon...</p>
        </div>
      </CardContent>
    </Card>
  )
}