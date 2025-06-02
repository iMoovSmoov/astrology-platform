'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BirthChartDisplayProps {
  chart?: any
  chartData?: any
}

export function BirthChartDisplay({ chart, chartData }: BirthChartDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Birth Chart {chart?.id ? `- ${chart.id}` : ''}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
          <p className="text-muted-foreground">Chart visualization coming soon...</p>
        </div>
        {chart && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Name:</strong> {chart.name}
            </p>
            {chart.birthData && (
              <p className="text-sm text-muted-foreground">
                <strong>Location:</strong> {chart.birthData.location?.city}, {chart.birthData.location?.country}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}