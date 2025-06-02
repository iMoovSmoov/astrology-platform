'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ChakraAssessment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chakra Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Interactive chakra assessment coming soon...</p>
          <Button>Start Assessment</Button>
        </div>
      </CardContent>
    </Card>
  )
}