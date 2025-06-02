// Core astrology types for the platform

export interface BirthData {
  date: Date
  time: string
  location: Location
  timezone: string
}

export interface Location {
  latitude: number
  longitude: number
  city: string
  country: string
  timezone: string
}

export interface Planet {
  name: PlanetName
  longitude: number
  latitude: number
  distance: number
  speed: number
  retrograde: boolean
  house: number
  sign: ZodiacSign
  degree: number
  minute: number
  second: number
}

export interface House {
  number: number
  cusp: number
  sign: ZodiacSign
  ruler: PlanetName
}

export interface Aspect {
  planet1: PlanetName
  planet2: PlanetName
  type: AspectType
  orb: number
  exactOrb: number
  applying: boolean
  separating: boolean
  strength: AspectStrength
}

export interface BirthChart {
  id: string
  userId?: string
  name: string
  birthData: BirthData
  planets: Planet[]
  houses: House[]
  aspects: Aspect[]
  houseSystem: HouseSystem
  zodiacSystem: ZodiacSystem
  createdAt: Date
  updatedAt: Date
}

export interface Transit {
  transitPlanet: PlanetName
  natalPlanet: PlanetName
  aspect: AspectType
  orb: number
  exact: boolean
  applying: boolean
  exactDate?: Date
  influence: TransitInfluence
}

export interface Synastry {
  chart1Id: string
  chart2Id: string
  aspects: SynastryAspect[]
  score: number
  compatibility: CompatibilityLevel
  summary: string
}

export interface SynastryAspect {
  planet1: PlanetName
  chart1: boolean
  planet2: PlanetName
  chart2: boolean
  aspect: AspectType
  orb: number
  strength: AspectStrength
  influence: 'positive' | 'negative' | 'neutral'
}

// Enums and constants

export type PlanetName = 
  | 'Sun' 
  | 'Moon' 
  | 'Mercury' 
  | 'Venus' 
  | 'Mars' 
  | 'Jupiter' 
  | 'Saturn' 
  | 'Uranus' 
  | 'Neptune' 
  | 'Pluto'
  | 'North Node'
  | 'South Node'
  | 'Chiron'
  | 'Ascendant'
  | 'Midheaven'

export type ZodiacSign = 
  | 'Aries' 
  | 'Taurus' 
  | 'Gemini' 
  | 'Cancer'
  | 'Leo' 
  | 'Virgo' 
  | 'Libra' 
  | 'Scorpio'
  | 'Sagittarius' 
  | 'Capricorn' 
  | 'Aquarius' 
  | 'Pisces'

export type AspectType = 
  | 'conjunction'
  | 'opposition'
  | 'trine'
  | 'square'
  | 'sextile'
  | 'quincunx'
  | 'semisextile'
  | 'semisquare'
  | 'sesquiquadrate'

export type AspectStrength = 'very strong' | 'strong' | 'moderate' | 'weak' | 'very weak'

export type HouseSystem = 'placidus' | 'koch' | 'equal' | 'whole-sign' | 'campanus' | 'regiomontanus'

export type ZodiacSystem = 'tropical' | 'sidereal'

export type TransitInfluence = 'major' | 'moderate' | 'minor'

export type CompatibilityLevel = 'excellent' | 'very good' | 'good' | 'fair' | 'challenging'

export type ElementType = 'fire' | 'earth' | 'air' | 'water'

export type ModalityType = 'cardinal' | 'fixed' | 'mutable'

// Planet and sign properties

export const PLANET_SYMBOLS: Record<PlanetName, string> = {
  'Sun': '☉',
  'Moon': '☽',
  'Mercury': '☿',
  'Venus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturn': '♄',
  'Uranus': '♅',
  'Neptune': '♆',
  'Pluto': '♇',
  'North Node': '☊',
  'South Node': '☋',
  'Chiron': '⚷',
  'Ascendant': 'AC',
  'Midheaven': 'MC',
}

export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  'Aries': '♈',
  'Taurus': '♉',
  'Gemini': '♊',
  'Cancer': '♋',
  'Leo': '♌',
  'Virgo': '♍',
  'Libra': '♎',
  'Scorpio': '♏',
  'Sagittarius': '♐',
  'Capricorn': '♑',
  'Aquarius': '♒',
  'Pisces': '♓',
}

export const ASPECT_SYMBOLS: Record<AspectType, string> = {
  'conjunction': '☌',
  'opposition': '☍',
  'trine': '△',
  'square': '□',
  'sextile': '⚹',
  'quincunx': '⚻',
  'semisextile': '⚺',
  'semisquare': '∠',
  'sesquiquadrate': '⚼',
}

export const ZODIAC_ELEMENTS: Record<ZodiacSign, ElementType> = {
  'Aries': 'fire',
  'Leo': 'fire',
  'Sagittarius': 'fire',
  'Taurus': 'earth',
  'Virgo': 'earth',
  'Capricorn': 'earth',
  'Gemini': 'air',
  'Libra': 'air',
  'Aquarius': 'air',
  'Cancer': 'water',
  'Scorpio': 'water',
  'Pisces': 'water',
}

export const ZODIAC_MODALITIES: Record<ZodiacSign, ModalityType> = {
  'Aries': 'cardinal',
  'Cancer': 'cardinal',
  'Libra': 'cardinal',
  'Capricorn': 'cardinal',
  'Taurus': 'fixed',
  'Leo': 'fixed',
  'Scorpio': 'fixed',
  'Aquarius': 'fixed',
  'Gemini': 'mutable',
  'Virgo': 'mutable',
  'Sagittarius': 'mutable',
  'Pisces': 'mutable',
}

export const ASPECT_ANGLES: Record<AspectType, number> = {
  'conjunction': 0,
  'semisextile': 30,
  'semisquare': 45,
  'sextile': 60,
  'square': 90,
  'trine': 120,
  'sesquiquadrate': 135,
  'quincunx': 150,
  'opposition': 180,
}

export const DEFAULT_ORBS: Record<AspectType, number> = {
  'conjunction': 8,
  'opposition': 8,
  'trine': 8,
  'square': 8,
  'sextile': 6,
  'quincunx': 3,
  'semisextile': 2,
  'semisquare': 2,
  'sesquiquadrate': 2,
}