'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BirthChartDisplayProps {
  chartData?: any
}

export function BirthChartDisplay({ chartData }: BirthChartDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Birth Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
          <p className="text-muted-foreground">Chart visualization coming soon...</p>
        </div>
      </CardContent>
    </Card>
  )
}