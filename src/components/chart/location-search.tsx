'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MapPinIcon, SearchIcon, CheckIcon } from 'lucide-react'
import { Location } from '@/types/astrology'

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void
  selectedLocation?: Location
}

interface LocationResult {
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  display_name: string
}

export function LocationSearch({ onLocationSelect, selectedLocation }: LocationSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Mock location search - replace with real geocoding API
  const searchLocations = async (searchQuery: string): Promise<LocationResult[]> => {
    // This is a mock implementation
    // In production, you would use a geocoding service like:
    // - OpenStreetMap Nominatim (free)
    // - Google Geocoding API
    // - Mapbox Geocoding API
    
    const mockResults: LocationResult[] = [
      {
        name: 'New York',
        country: 'United States',
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: 'America/New_York',
        display_name: 'New York, NY, United States',
      },
      {
        name: 'London',
        country: 'United Kingdom',
        latitude: 51.5074,
        longitude: -0.1278,
        timezone: 'Europe/London',
        display_name: 'London, United Kingdom',
      },
      {
        name: 'Paris',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
        timezone: 'Europe/Paris',
        display_name: 'Paris, France',
      },
      {
        name: 'Tokyo',
        country: 'Japan',
        latitude: 35.6762,
        longitude: 139.6503,
        timezone: 'Asia/Tokyo',
        display_name: 'Tokyo, Japan',
      },
      {
        name: 'Sydney',
        country: 'Australia',
        latitude: -33.8688,
        longitude: 151.2093,
        timezone: 'Australia/Sydney',
        display_name: 'Sydney, NSW, Australia',
      },
    ]

    // Filter results based on query
    return mockResults.filter(location =>
      location.display_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true)
        try {
          const searchResults = await searchLocations(query)
          setResults(searchResults)
          setShowResults(true)
        } catch (error) {
          console.error('Error searching locations:', error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query])

  const handleLocationSelect = (result: LocationResult) => {
    const location: Location = {
      city: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone,
    }
    
    onLocationSelect(location)
    setQuery(result.display_name)
    setShowResults(false)
  }

  const handleCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          // In production, you would reverse geocode these coordinates
          // to get the city name and timezone
          const location: Location = {
            city: 'Current Location',
            country: 'Unknown',
            latitude,
            longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
          
          onLocationSelect(location)
          setQuery(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
          setIsLoading(false)
        },
        (error) => {
          console.error('Error getting current location:', error)
          setIsLoading(false)
        }
      )
    }
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleCurrentLocation}
          disabled={isLoading}
          title="Use current location"
        >
          <MapPinIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Results */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-auto rounded-md border bg-background shadow-lg">
          {results.map((result, index) => (
            <button
              key={index}
              type="button"
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted"
              onClick={() => handleLocationSelect(result)}
            >
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">{result.name}</div>
                <div className="text-sm text-muted-foreground">{result.country}</div>
              </div>
              <div className="text-xs text-muted-foreground">
                {result.latitude.toFixed(2)}, {result.longitude.toFixed(2)}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="mt-2 flex items-center gap-2 rounded-md bg-muted p-3">
          <CheckIcon className="h-4 w-4 text-green-600" />
          <div className="flex-1">
            <div className="font-medium">{selectedLocation.city}</div>
            <div className="text-sm text-muted-foreground">
              {selectedLocation.country} • {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
            </div>
            <div className="text-xs text-muted-foreground">
              Timezone: {selectedLocation.timezone}
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {showResults && results.length === 0 && query.length >= 2 && !isLoading && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-md border bg-background p-4 text-center text-sm text-muted-foreground shadow-lg">
          No locations found for "{query}"
        </div>
      )}
    </div>
  )
}