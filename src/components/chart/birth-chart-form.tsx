'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LocationSearch } from '@/components/chart/location-search'
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { BirthData, HouseSystem } from '@/types/astrology'

const birthChartSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  birthTime: z.string().min(1, 'Birth time is required'),
  location: z.object({
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    latitude: z.number(),
    longitude: z.number(),
    timezone: z.string(),
  }),
  houseSystem: z.enum(['placidus', 'koch', 'equal', 'whole-sign', 'campanus', 'regiomontanus']),
  isPublic: z.boolean().default(false),
})

type BirthChartFormData = z.infer<typeof birthChartSchema>

export function BirthChartForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BirthChartFormData>({
    resolver: zodResolver(birthChartSchema),
    defaultValues: {
      houseSystem: 'placidus',
      isPublic: false,
    },
  })

  const selectedLocation = watch('location')

  const onSubmit = async (data: BirthChartFormData) => {
    setIsLoading(true)
    
    try {
      // Combine date and time
      const birthDateTime = new Date(`${data.birthDate}T${data.birthTime}`)
      
      const birthData: BirthData = {
        date: birthDateTime,
        time: data.birthTime,
        location: data.location,
        timezone: data.location.timezone,
      }

      // Call API to calculate birth chart
      const response = await fetch('/api/charts/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          birthData,
          houseSystem: data.houseSystem,
          isPublic: data.isPublic,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to calculate birth chart')
      }

      const result = await response.json()
      
      toast.success('Birth chart calculated successfully!')
      router.push(`/chart/${result.chart.id}`)
      
    } catch (error) {
      console.error('Error calculating birth chart:', error)
      toast.error('Failed to calculate birth chart. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Birth Information
        </CardTitle>
        <CardDescription>
          Enter your birth details for accurate astrological calculations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Chart Name</Label>
            <Input
              id="name"
              placeholder="e.g., John's Birth Chart"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Birth Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Birth Date
              </Label>
              <Input
                id="birthDate"
                type="date"
                {...register('birthDate')}
                className={errors.birthDate ? 'border-red-500' : ''}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500">{errors.birthDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthTime" className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                Birth Time
              </Label>
              <Input
                id="birthTime"
                type="time"
                step="60"
                {...register('birthTime')}
                className={errors.birthTime ? 'border-red-500' : ''}
              />
              {errors.birthTime && (
                <p className="text-sm text-red-500">{errors.birthTime.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Use 24-hour format. If unknown, use 12:00 (noon)
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              Birth Location
            </Label>
            <LocationSearch
              onLocationSelect={(location) => {
                setValue('location', location, { shouldValidate: true })
              }}
              selectedLocation={selectedLocation}
            />
            {errors.location && (
              <p className="text-sm text-red-500">
                {errors.location.city?.message || 
                 errors.location.country?.message || 
                 'Location is required'}
              </p>
            )}
          </div>

          {/* House System */}
          <div className="space-y-2">
            <Label htmlFor="houseSystem">House System</Label>
            <Select
              value={watch('houseSystem')}
              onValueChange={(value: HouseSystem) => setValue('houseSystem', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select house system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placidus">Placidus (Most Popular)</SelectItem>
                <SelectItem value="koch">Koch</SelectItem>
                <SelectItem value="equal">Equal House</SelectItem>
                <SelectItem value="whole-sign">Whole Sign</SelectItem>
                <SelectItem value="campanus">Campanus</SelectItem>
                <SelectItem value="regiomontanus">Regiomontanus</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Placidus is the most commonly used house system in modern astrology
            </p>
          </div>

          {/* Privacy Setting */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublic"
              {...register('isPublic')}
              className="rounded border-gray-300"
            />
            <Label htmlFor="isPublic" className="text-sm">
              Make this chart public (others can view but not edit)
            </Label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Calculating Chart...
              </>
            ) : (
              'Calculate Birth Chart'
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your birth chart will be calculated using Swiss Ephemeris for maximum accuracy
          </p>
        </form>
      </CardContent>
    </Card>
  )
}