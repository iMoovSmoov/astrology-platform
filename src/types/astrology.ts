/**
 * Comprehensive Astrology Type Definitions
 * Based on Swiss Ephemeris standards and professional astrology software
 */

// Zodiac Signs
export enum ZodiacSign {
  ARIES = 'aries',
  TAURUS = 'taurus',
  GEMINI = 'gemini',
  CANCER = 'cancer',
  LEO = 'leo',
  VIRGO = 'virgo',
  LIBRA = 'libra',
  SCORPIO = 'scorpio',
  SAGITTARIUS = 'sagittarius',
  CAPRICORN = 'capricorn',
  AQUARIUS = 'aquarius',
  PISCES = 'pisces',
}

// Planets and Celestial Bodies
export enum Planet {
  SUN = 'sun',
  MOON = 'moon',
  MERCURY = 'mercury',
  VENUS = 'venus',
  MARS = 'mars',
  JUPITER = 'jupiter',
  SATURN = 'saturn',
  URANUS = 'uranus',
  NEPTUNE = 'neptune',
  PLUTO = 'pluto',
  NORTH_NODE = 'north_node',
  SOUTH_NODE = 'south_node',
  CHIRON = 'chiron',
  LILITH = 'lilith',
}

// House Systems
export enum HouseSystem {
  PLACIDUS = 'placidus',
  KOCH = 'koch',
  EQUAL = 'equal',
  WHOLE_SIGN = 'whole_sign',
  CAMPANUS = 'campanus',
  REGIOMONTANUS = 'regiomontanus',
  TOPOCENTRIC = 'topocentric',
  ALCABITIUS = 'alcabitius',
  MORINUS = 'morinus',
  PORPHYRIUS = 'porphyrius',
}

// Astrological Aspects
export enum AspectType {
  CONJUNCTION = 'conjunction',
  OPPOSITION = 'opposition',
  TRINE = 'trine',
  SQUARE = 'square',
  SEXTILE = 'sextile',
  QUINCUNX = 'quincunx',
  SEMISEXTILE = 'semisextile',
  SEMISQUARE = 'semisquare',
  SESQUIQUADRATE = 'sesquiquadrate',
  QUINTILE = 'quintile',
  BIQUINTILE = 'biquintile',
}

// Birth Data Interface
export interface BirthData {
  date: Date;
  time: {
    hour: number;
    minute: number;
    second?: number;
  };
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
    city?: string;
    country?: string;
  };
  name?: string;
}

// Planetary Position
export interface PlanetaryPosition {
  planet: Planet;
  longitude: number; // 0-360 degrees
  latitude: number;
  distance: number; // AU
  speed: number; // degrees per day
  sign: ZodiacSign;
  degree: number; // 0-30 within sign
  minute: number; // 0-60 within degree
  second: number; // 0-60 within minute
  retrograde: boolean;
  house?: number; // 1-12
}

// House Cusp
export interface HouseCusp {
  house: number; // 1-12
  longitude: number; // 0-360 degrees
  sign: ZodiacSign;
  degree: number;
  minute: number;
  second: number;
}

// Astrological Aspect
export interface Aspect {
  planet1: Planet;
  planet2: Planet;
  type: AspectType;
  angle: number; // exact aspect angle
  orb: number; // deviation from exact
  applying: boolean; // true if aspect is applying, false if separating
  strength: number; // 0-1, strength of aspect
}

// Birth Chart
export interface BirthChart {
  birthData: BirthData;
  planets: PlanetaryPosition[];
  houses: HouseCusp[];
  aspects: Aspect[];
  ascendant: PlanetaryPosition;
  midheaven: PlanetaryPosition;
  houseSystem: HouseSystem;
  calculatedAt: Date;
}

// Synastry Chart (Relationship Compatibility)
export interface SynastryChart {
  person1: BirthChart;
  person2: BirthChart;
  aspects: Aspect[];
  compositeChart?: BirthChart;
  compatibilityScore: number; // 0-100
  strengths: string[];
  challenges: string[];
}

// Transit
export interface Transit {
  transitingPlanet: Planet;
  natalPlanet: Planet;
  aspect: AspectType;
  exactDate: Date;
  orb: number;
  influence: 'major' | 'moderate' | 'minor';
  description: string;
}

// Progression
export interface Progression {
  planet: Planet;
  progressedPosition: PlanetaryPosition;
  natalPosition: PlanetaryPosition;
  aspects: Aspect[];
  age: number; // age when progression is exact
}

// Lunar Phase
export interface LunarPhase {
  phase: 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 
         'full' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';
  illumination: number; // 0-1
  date: Date;
  moonSign: ZodiacSign;
  voidOfCourse: boolean;
  voidStart?: Date;
  voidEnd?: Date;
}

// Calculation Options
export interface CalculationOptions {
  houseSystem: HouseSystem;
  zodiacType: 'tropical' | 'sidereal';
  ayanamsa?: string; // for sidereal calculations
  topocentric: boolean;
  includeAsteroids: boolean;
  aspectOrbs: Record<AspectType, number>;
  planetaryOrbs: Record<Planet, number>;
}

// Chart Interpretation
export interface ChartInterpretation {
  personality: {
    sunSign: string;
    moonSign: string;
    risingSign: string;
    dominantElement: 'fire' | 'earth' | 'air' | 'water';
    dominantModality: 'cardinal' | 'fixed' | 'mutable';
    dominantPlanet: Planet;
  };
  strengths: string[];
  challenges: string[];
  lifeThemes: string[];
  careerIndications: string[];
  relationshipPatterns: string[];
  spiritualPath: string[];
}

// API Response Types
export interface CalculationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  calculationTime: number; // milliseconds
  accuracy: 'high' | 'medium' | 'low';
}

export interface EphemerisData {
  date: Date;
  planets: Record<Planet, PlanetaryPosition>;
  lunarPhase: LunarPhase;
  aspectsOfTheDay: Aspect[];
}

// Chart Rendering Options
export interface ChartRenderOptions {
  size: number; // diameter in pixels
  style: 'modern' | 'traditional' | 'minimalist';
  colorScheme: 'light' | 'dark' | 'cosmic';
  showAspectLines: boolean;
  showHouseNumbers: boolean;
  showDegrees: boolean;
  planetSymbols: 'traditional' | 'modern' | 'text';
  aspectSymbols: boolean;
  customColors?: Record<Planet | ZodiacSign, string>;
}

// Database Models
export interface UserChart {
  id: string;
  userId: string;
  name: string;
  birthData: BirthData;
  chart: BirthChart;
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedReading {
  id: string;
  userId: string;
  chartId: string;
  type: 'natal' | 'synastry' | 'transit' | 'progression';
  content: string;
  interpretation: ChartInterpretation;
  createdAt: Date;
}

// Error Types
export class AstrologyCalculationError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AstrologyCalculationError';
  }
}

export class InvalidBirthDataError extends AstrologyCalculationError {
  constructor(message: string, details?: any) {
    super(message, 'INVALID_BIRTH_DATA', details);
  }
}

export class EphemerisError extends AstrologyCalculationError {
  constructor(message: string, details?: any) {
    super(message, 'EPHEMERIS_ERROR', details);
  }
}

// Constants
export const ZODIAC_SIGNS_INFO = {
  [ZodiacSign.ARIES]: {
    element: 'fire',
    modality: 'cardinal',
    ruler: Planet.MARS,
    symbol: '♈',
    degrees: [0, 30],
  },
  [ZodiacSign.TAURUS]: {
    element: 'earth',
    modality: 'fixed',
    ruler: Planet.VENUS,
    symbol: '♉',
    degrees: [30, 60],
  },
  [ZodiacSign.GEMINI]: {
    element: 'air',
    modality: 'mutable',
    ruler: Planet.MERCURY,
    symbol: '♊',
    degrees: [60, 90],
  },
  [ZodiacSign.CANCER]: {
    element: 'water',
    modality: 'cardinal',
    ruler: Planet.MOON,
    symbol: '♋',
    degrees: [90, 120],
  },
  [ZodiacSign.LEO]: {
    element: 'fire',
    modality: 'fixed',
    ruler: Planet.SUN,
    symbol: '♌',
    degrees: [120, 150],
  },
  [ZodiacSign.VIRGO]: {
    element: 'earth',
    modality: 'mutable',
    ruler: Planet.MERCURY,
    symbol: '♍',
    degrees: [150, 180],
  },
  [ZodiacSign.LIBRA]: {
    element: 'air',
    modality: 'cardinal',
    ruler: Planet.VENUS,
    symbol: '♎',
    degrees: [180, 210],
  },
  [ZodiacSign.SCORPIO]: {
    element: 'water',
    modality: 'fixed',
    ruler: Planet.PLUTO,
    symbol: '♏',
    degrees: [210, 240],
  },
  [ZodiacSign.SAGITTARIUS]: {
    element: 'fire',
    modality: 'mutable',
    ruler: Planet.JUPITER,
    symbol: '♐',
    degrees: [240, 270],
  },
  [ZodiacSign.CAPRICORN]: {
    element: 'earth',
    modality: 'cardinal',
    ruler: Planet.SATURN,
    symbol: '♑',
    degrees: [270, 300],
  },
  [ZodiacSign.AQUARIUS]: {
    element: 'air',
    modality: 'fixed',
    ruler: Planet.URANUS,
    symbol: '♒',
    degrees: [300, 330],
  },
  [ZodiacSign.PISCES]: {
    element: 'water',
    modality: 'mutable',
    ruler: Planet.NEPTUNE,
    symbol: '♓',
    degrees: [330, 360],
  },
} as const;

export const PLANET_INFO = {
  [Planet.SUN]: { symbol: '☉', glyph: '☉', color: '#FFA500' },
  [Planet.MOON]: { symbol: '☽', glyph: '☽', color: '#C0C0C0' },
  [Planet.MERCURY]: { symbol: '☿', glyph: '☿', color: '#87CEEB' },
  [Planet.VENUS]: { symbol: '♀', glyph: '♀', color: '#FFC0CB' },
  [Planet.MARS]: { symbol: '♂', glyph: '♂', color: '#FF4500' },
  [Planet.JUPITER]: { symbol: '♃', glyph: '♃', color: '#DAA520' },
  [Planet.SATURN]: { symbol: '♄', glyph: '♄', color: '#696969' },
  [Planet.URANUS]: { symbol: '♅', glyph: '♅', color: '#4FD0E7' },
  [Planet.NEPTUNE]: { symbol: '♆', glyph: '♆', color: '#4169E1' },
  [Planet.PLUTO]: { symbol: '♇', glyph: '♇', color: '#8B0000' },
  [Planet.NORTH_NODE]: { symbol: '☊', glyph: '☊', color: '#800080' },
  [Planet.SOUTH_NODE]: { symbol: '☋', glyph: '☋', color: '#800080' },
  [Planet.CHIRON]: { symbol: '⚷', glyph: '⚷', color: '#8B4513' },
  [Planet.LILITH]: { symbol: '⚸', glyph: '⚸', color: '#000000' },
} as const;

export const DEFAULT_ASPECT_ORBS = {
  [AspectType.CONJUNCTION]: 8,
  [AspectType.OPPOSITION]: 8,
  [AspectType.TRINE]: 8,
  [AspectType.SQUARE]: 8,
  [AspectType.SEXTILE]: 6,
  [AspectType.QUINCUNX]: 3,
  [AspectType.SEMISEXTILE]: 2,
  [AspectType.SEMISQUARE]: 2,
  [AspectType.SESQUIQUADRATE]: 2,
  [AspectType.QUINTILE]: 2,
  [AspectType.BIQUINTILE]: 2,
} as const;

export const ASPECT_ANGLES = {
  [AspectType.CONJUNCTION]: 0,
  [AspectType.OPPOSITION]: 180,
  [AspectType.TRINE]: 120,
  [AspectType.SQUARE]: 90,
  [AspectType.SEXTILE]: 60,
  [AspectType.QUINCUNX]: 150,
  [AspectType.SEMISEXTILE]: 30,
  [AspectType.SEMISQUARE]: 45,
  [AspectType.SESQUIQUADRATE]: 135,
  [AspectType.QUINTILE]: 72,
  [AspectType.BIQUINTILE]: 144,
} as const;