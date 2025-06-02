import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculateBirthChart } from '@/lib/astrology/calculations'
import { BirthData, HouseSystem } from '@/types/astrology'

const calculateChartSchema = z.object({
  name: z.string().min(1),
  birthData: z.object({
    date: z.string().transform((str) => new Date(str)),
    time: z.string(),
    location: z.object({
      city: z.string(),
      country: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      timezone: z.string(),
    }),
    timezone: z.string(),
  }),
  houseSystem: z.enum(['placidus', 'koch', 'equal', 'whole-sign', 'campanus', 'regiomontanus']),
  isPublic: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = calculateChartSchema.parse(body)

    // Calculate the birth chart
    const chartData = await calculateBirthChart(
      validatedData.birthData,
      validatedData.houseSystem
    )

    // In a real application, you would save this to the database
    // For now, we'll return the calculated data with a mock ID
    const chart = {
      id: `chart_${Date.now()}`,
      userId: null, // Would be set from authentication
      name: validatedData.name,
      ...chartData,
      isPublic: validatedData.isPublic,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      chart,
    })
  } catch (error) {
    console.error('Error calculating birth chart:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input data',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate birth chart',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Birth chart calculation API',
    endpoints: {
      POST: '/api/charts/calculate - Calculate a new birth chart',
    },
  })
}