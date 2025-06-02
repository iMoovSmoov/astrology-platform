// Astrology calculation utilities
// This will integrate with Swiss Ephemeris for accurate calculations

import { 
  BirthData, 
  Planet, 
  House, 
  Aspect, 
  BirthChart,
  PlanetName,
  ZodiacSign,
  AspectType,
  HouseSystem,
  ASPECT_ANGLES,
  DEFAULT_ORBS,
  ZODIAC_ELEMENTS,
  ZODIAC_MODALITIES
} from '@/types/astrology'
import { normalizeAngle, getZodiacSign, getZodiacDegree } from '@/lib/utils'

/**
 * Calculate birth chart from birth data
 * This is a placeholder that will be replaced with Swiss Ephemeris integration
 */
export async function calculateBirthChart(
  birthData: BirthData,
  houseSystem: HouseSystem = 'placidus'
): Promise<Omit<BirthChart, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> {
  // TODO: Integrate with Swiss Ephemeris for real calculations
  // For now, this is a mock implementation
  
  const planets = await calculatePlanetaryPositions(birthData)
  const houses = await calculateHouses(birthData, houseSystem)
  const aspects = calculateAspects(planets)
  
  return {
    name: `Birth Chart - ${birthData.location.city}`,
    birthData,
    planets,
    houses,
    aspects,
    houseSystem,
    zodiacSystem: 'tropical', // Default to tropical
  }
}

/**
 * Calculate planetary positions for given birth data
 * This will use Swiss Ephemeris for accurate calculations
 */
export async function calculatePlanetaryPositions(birthData: BirthData): Promise<Planet[]> {
  // TODO: Replace with actual Swiss Ephemeris calculations
  // This is a mock implementation for development
  
  const mockPlanets: Planet[] = [
    {
      name: 'Sun',
      longitude: 120.5, // Example: 0°30' Leo
      latitude: 0.0,
      distance: 1.0,
      speed: 1.0,
      retrograde: false,
      house: 5,
      sign: 'Leo',
      degree: 0,
      minute: 30,
      second: 0,
    },
    {
      name: 'Moon',
      longitude: 45.2, // Example: 15°12' Taurus
      latitude: 5.2,
      distance: 0.002,
      speed: 13.2,
      retrograde: false,
      house: 2,
      sign: 'Taurus',
      degree: 15,
      minute: 12,
      second: 0,
    },
    // Add more planets...
  ]
  
  return mockPlanets.map(planet => ({
    ...planet,
    sign: getZodiacSign(planet.longitude),
    degree: Math.floor(getZodiacDegree(planet.longitude)),
    minute: Math.floor((getZodiacDegree(planet.longitude) % 1) * 60),
    second: Math.floor(((getZodiacDegree(planet.longitude) % 1) * 60 % 1) * 60),
  }))
}

/**
 * Calculate house cusps for given birth data and house system
 */
export async function calculateHouses(
  birthData: BirthData, 
  houseSystem: HouseSystem
): Promise<House[]> {
  // TODO: Replace with actual Swiss Ephemeris house calculations
  // This is a mock implementation
  
  const houses: House[] = []
  
  for (let i = 1; i <= 12; i++) {
    const cusp = (i - 1) * 30 // Simple equal house system for mock
    houses.push({
      number: i,
      cusp,
      sign: getZodiacSign(cusp),
      ruler: getPlanetaryRuler(getZodiacSign(cusp)),
    })
  }
  
  return houses
}

/**
 * Calculate aspects between planets
 */
export function calculateAspects(planets: Planet[]): Aspect[] {
  const aspects: Aspect[] = []
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planet1 = planets[i]
      const planet2 = planets[j]
      
      const aspect = findAspect(planet1, planet2)
      if (aspect) {
        aspects.push(aspect)
      }
    }
  }
  
  return aspects
}

/**
 * Find aspect between two planets
 */
export function findAspect(planet1: Planet, planet2: Planet): Aspect | null {
  const angle = Math.abs(planet1.longitude - planet2.longitude)
  const normalizedAngle = Math.min(angle, 360 - angle)
  
  for (const [aspectType, aspectAngle] of Object.entries(ASPECT_ANGLES)) {
    const orb = DEFAULT_ORBS[aspectType as AspectType]
    const difference = Math.abs(normalizedAngle - aspectAngle)
    
    if (difference <= orb) {
      return {
        planet1: planet1.name,
        planet2: planet2.name,
        type: aspectType as AspectType,
        orb: difference,
        exactOrb: aspectAngle,
        applying: planet1.speed > planet2.speed,
        separating: planet1.speed < planet2.speed,
        strength: getAspectStrength(difference, orb),
      }
    }
  }
  
  return null
}

/**
 * Get aspect strength based on orb
 */
export function getAspectStrength(orb: number, maxOrb: number) {
  const percentage = orb / maxOrb
  
  if (percentage <= 0.2) return 'very strong'
  if (percentage <= 0.4) return 'strong'
  if (percentage <= 0.6) return 'moderate'
  if (percentage <= 0.8) return 'weak'
  return 'very weak'
}

/**
 * Get planetary ruler of a zodiac sign
 */
export function getPlanetaryRuler(sign: ZodiacSign): PlanetName {
  const rulers: Record<ZodiacSign, PlanetName> = {
    'Aries': 'Mars',
    'Taurus': 'Venus',
    'Gemini': 'Mercury',
    'Cancer': 'Moon',
    'Leo': 'Sun',
    'Virgo': 'Mercury',
    'Libra': 'Venus',
    'Scorpio': 'Mars', // Traditional ruler, modern is Pluto
    'Sagittarius': 'Jupiter',
    'Capricorn': 'Saturn',
    'Aquarius': 'Saturn', // Traditional ruler, modern is Uranus
    'Pisces': 'Jupiter', // Traditional ruler, modern is Neptune
  }
  
  return rulers[sign]
}

/**
 * Calculate current transits for a birth chart
 */
export async function calculateTransits(
  birthChart: BirthChart,
  date: Date = new Date()
) {
  // TODO: Implement transit calculations
  // This will calculate current planetary positions and compare with natal positions
  return []
}

/**
 * Calculate synastry between two birth charts
 */
export function calculateSynastry(chart1: BirthChart, chart2: BirthChart) {
  // TODO: Implement synastry calculations
  // This will find aspects between planets in different charts
  return {
    chart1Id: chart1.id,
    chart2Id: chart2.id,
    aspects: [],
    score: 0,
    compatibility: 'fair' as const,
    summary: 'Synastry analysis pending implementation',
  }
}

/**
 * Get element distribution in a chart
 */
export function getElementDistribution(planets: Planet[]) {
  const distribution = { fire: 0, earth: 0, air: 0, water: 0 }
  
  planets.forEach(planet => {
    const element = ZODIAC_ELEMENTS[planet.sign]
    distribution[element]++
  })
  
  return distribution
}

/**
 * Get modality distribution in a chart
 */
export function getModalityDistribution(planets: Planet[]) {
  const distribution = { cardinal: 0, fixed: 0, mutable: 0 }
  
  planets.forEach(planet => {
    const modality = ZODIAC_MODALITIES[planet.sign]
    distribution[modality]++
  })
  
  return distribution
}

/**
 * Convert Julian Day to Date
 */
export function julianToDate(jd: number): Date {
  const a = jd + 32044
  const b = Math.floor((4 * a + 3) / 146097)
  const c = a - Math.floor((146097 * b) / 4)
  const d = Math.floor((4 * c + 3) / 1461)
  const e = c - Math.floor((1461 * d) / 4)
  const m = Math.floor((5 * e + 2) / 153)
  
  const day = e - Math.floor((153 * m + 2) / 5) + 1
  const month = m + 3 - 12 * Math.floor(m / 10)
  const year = 100 * b + d - 4800 + Math.floor(m / 10)
  
  return new Date(year, month - 1, day)
}

/**
 * Convert Date to Julian Day
 */
export function dateToJulian(date: Date): number {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3
  
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
  const jd = jdn + (hour - 12) / 24 + minute / 1440 + second / 86400
  
  return jd
}