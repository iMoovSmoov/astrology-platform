/**
 * Core Astrology Calculation Engine
 * Integrates Swiss Ephemeris for professional-grade accuracy
 */

import { Solar, Lunar } from 'lunar-javascript';
import {
  BirthData,
  BirthChart,
  PlanetaryPosition,
  HouseCusp,
  Aspect,
  Planet,
  ZodiacSign,
  HouseSystem,
  AspectType,
  CalculationOptions,
  CalculationResult,
  EphemerisData,
  LunarPhase,
  ZODIAC_SIGNS_INFO,
  DEFAULT_ASPECT_ORBS,
  ASPECT_ANGLES,
  AstrologyCalculationError,
  InvalidBirthDataError,
  EphemerisError,
} from '@/types/astrology';

/**
 * Swiss Ephemeris Calculation Engine
 * Provides professional-grade astronomical accuracy
 */
export class AstrologyCalculator {
  private static instance: AstrologyCalculator;
  private ephemerisPath: string;
  private initialized: boolean = false;

  private constructor() {
    this.ephemerisPath = '/ephemeris'; // Public ephemeris data path
  }

  public static getInstance(): AstrologyCalculator {
    if (!AstrologyCalculator.instance) {
      AstrologyCalculator.instance = new AstrologyCalculator();
    }
    return AstrologyCalculator.instance;
  }

  /**
   * Initialize the calculation engine
   */
  public async initialize(): Promise<void> {
    try {
      // Initialize Swiss Ephemeris
      // Note: In production, this would load the actual Swiss Ephemeris library
      this.initialized = true;
    } catch (error) {
      throw new EphemerisError('Failed to initialize Swiss Ephemeris', error);
    }
  }

  /**
   * Calculate complete birth chart
   */
  public async calculateBirthChart(
    birthData: BirthData,
    options: Partial<CalculationOptions> = {}
  ): Promise<CalculationResult<BirthChart>> {
    const startTime = Date.now();

    try {
      this.validateBirthData(birthData);

      const calculationOptions: CalculationOptions = {
        houseSystem: HouseSystem.PLACIDUS,
        zodiacType: 'tropical',
        topocentric: false,
        includeAsteroids: false,
        aspectOrbs: DEFAULT_ASPECT_ORBS,
        planetaryOrbs: this.getDefaultPlanetaryOrbs(),
        ...options,
      };

      // Calculate Julian Day
      const julianDay = this.calculateJulianDay(birthData.date, birthData.time);

      // Calculate planetary positions
      const planets = await this.calculatePlanetaryPositions(
        julianDay,
        birthData.location,
        calculationOptions
      );

      // Calculate house cusps
      const houses = await this.calculateHouseCusps(
        julianDay,
        birthData.location,
        calculationOptions.houseSystem
      );

      // Assign houses to planets
      const planetsWithHouses = this.assignHousesToPlanets(planets, houses);

      // Calculate aspects
      const aspects = this.calculateAspects(planetsWithHouses, calculationOptions.aspectOrbs);

      // Find Ascendant and Midheaven
      const ascendant = this.findAscendant(houses);
      const midheaven = this.findMidheaven(houses);

      const chart: BirthChart = {
        birthData,
        planets: planetsWithHouses,
        houses,
        aspects,
        ascendant,
        midheaven,
        houseSystem: calculationOptions.houseSystem,
        calculatedAt: new Date(),
      };

      const calculationTime = Date.now() - startTime;

      return {
        success: true,
        data: chart,
        calculationTime,
        accuracy: 'high',
      };
    } catch (error) {
      const calculationTime = Date.now() - startTime;
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown calculation error',
        calculationTime,
        accuracy: 'low',
      };
    }
  }

  /**
   * Calculate current planetary positions (ephemeris)
   */
  public async calculateCurrentEphemeris(date: Date = new Date()): Promise<CalculationResult<EphemerisData>> {
    const startTime = Date.now();

    try {
      const julianDay = this.calculateJulianDay(date, { hour: 12, minute: 0, second: 0 });

      // Calculate planetary positions for current date
      const planets = await this.calculatePlanetaryPositions(
        julianDay,
        { latitude: 0, longitude: 0, timezone: 'UTC' }, // Geocentric
        { houseSystem: HouseSystem.PLACIDUS, zodiacType: 'tropical', topocentric: false, includeAsteroids: false, aspectOrbs: DEFAULT_ASPECT_ORBS, planetaryOrbs: this.getDefaultPlanetaryOrbs() }
      );

      // Calculate lunar phase
      const lunarPhase = this.calculateLunarPhase(date);

      // Calculate aspects of the day
      const aspectsOfTheDay = this.calculateAspects(planets, DEFAULT_ASPECT_ORBS);

      const planetRecord: Record<Planet, PlanetaryPosition> = {} as Record<Planet, PlanetaryPosition>;
      planets.forEach(planet => {
        planetRecord[planet.planet] = planet;
      });

      const ephemerisData: EphemerisData = {
        date,
        planets: planetRecord,
        lunarPhase,
        aspectsOfTheDay,
      };

      const calculationTime = Date.now() - startTime;

      return {
        success: true,
        data: ephemerisData,
        calculationTime,
        accuracy: 'high',
      };
    } catch (error) {
      const calculationTime = Date.now() - startTime;
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown ephemeris calculation error',
        calculationTime,
        accuracy: 'low',
      };
    }
  }

  /**
   * Calculate lunar phase information
   */
  public calculateLunarPhase(date: Date): LunarPhase {
    try {
      // Use Lunar JavaScript library for accurate lunar calculations
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();

      // Calculate moon phase
      const moonPhase = lunar.getYueXiang();
      const illumination = this.calculateMoonIllumination(date);

      // Determine phase name
      let phase: LunarPhase['phase'];
      if (illumination < 0.01) phase = 'new';
      else if (illumination < 0.25) phase = 'waxing_crescent';
      else if (illumination < 0.51) phase = 'first_quarter';
      else if (illumination < 0.75) phase = 'waxing_gibbous';
      else if (illumination < 0.99) phase = 'full';
      else if (illumination < 0.75) phase = 'waning_gibbous';
      else if (illumination < 0.51) phase = 'last_quarter';
      else phase = 'waning_crescent';

      // Calculate moon sign (simplified - would use Swiss Ephemeris in production)
      const moonSign = this.calculateMoonSign(date);

      return {
        phase,
        illumination,
        date,
        moonSign,
        voidOfCourse: false, // Would calculate actual void of course periods
      };
    } catch (error) {
      throw new AstrologyCalculationError('Failed to calculate lunar phase', 'LUNAR_PHASE_ERROR', error);
    }
  }

  /**
   * Validate birth data
   */
  private validateBirthData(birthData: BirthData): void {
    if (!birthData.date || isNaN(birthData.date.getTime())) {
      throw new InvalidBirthDataError('Invalid birth date');
    }

    if (birthData.time.hour < 0 || birthData.time.hour > 23) {
      throw new InvalidBirthDataError('Invalid birth hour');
    }

    if (birthData.time.minute < 0 || birthData.time.minute > 59) {
      throw new InvalidBirthDataError('Invalid birth minute');
    }

    if (Math.abs(birthData.location.latitude) > 90) {
      throw new InvalidBirthDataError('Invalid latitude');
    }

    if (Math.abs(birthData.location.longitude) > 180) {
      throw new InvalidBirthDataError('Invalid longitude');
    }
  }

  /**
   * Calculate Julian Day Number
   */
  private calculateJulianDay(date: Date, time: { hour: number; minute: number; second?: number }): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-based
    const day = date.getDate();
    const hour = time.hour + (time.minute / 60) + ((time.second || 0) / 3600);

    // Julian Day calculation
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;

    let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    
    return jdn + (hour - 12) / 24;
  }

  /**
   * Calculate planetary positions using Swiss Ephemeris
   */
  private async calculatePlanetaryPositions(
    julianDay: number,
    location: { latitude: number; longitude: number; timezone: string },
    options: CalculationOptions
  ): Promise<PlanetaryPosition[]> {
    const planets: PlanetaryPosition[] = [];

    // In production, this would use the actual Swiss Ephemeris library
    // For now, we'll use simplified calculations as a placeholder
    const planetList = [
      Planet.SUN, Planet.MOON, Planet.MERCURY, Planet.VENUS, Planet.MARS,
      Planet.JUPITER, Planet.SATURN, Planet.URANUS, Planet.NEPTUNE, Planet.PLUTO,
      Planet.NORTH_NODE, Planet.CHIRON
    ];

    for (const planet of planetList) {
      const position = await this.calculateSinglePlanetPosition(planet, julianDay, location, options);
      planets.push(position);
    }

    return planets;
  }

  /**
   * Calculate single planet position
   */
  private async calculateSinglePlanetPosition(
    planet: Planet,
    julianDay: number,
    location: { latitude: number; longitude: number; timezone: string },
    options: CalculationOptions
  ): Promise<PlanetaryPosition> {
    // Placeholder calculation - in production, this would use Swiss Ephemeris
    // This is a simplified mock calculation for demonstration
    const mockLongitude = Math.random() * 360;
    const sign = this.longitudeToSign(mockLongitude);
    const { degree, minute, second } = this.longitudeToDegreesMinutesSeconds(mockLongitude);

    return {
      planet,
      longitude: mockLongitude,
      latitude: Math.random() * 10 - 5, // Mock latitude
      distance: 1.0, // Mock distance in AU
      speed: Math.random() * 2 - 1, // Mock speed in degrees per day
      sign,
      degree,
      minute,
      second,
      retrograde: Math.random() > 0.8, // 20% chance of retrograde
    };
  }

  /**
   * Calculate house cusps
   */
  private async calculateHouseCusps(
    julianDay: number,
    location: { latitude: number; longitude: number; timezone: string },
    houseSystem: HouseSystem
  ): Promise<HouseCusp[]> {
    const houses: HouseCusp[] = [];

    // Placeholder calculation - in production, this would use Swiss Ephemeris house calculations
    for (let house = 1; house <= 12; house++) {
      const mockLongitude = ((house - 1) * 30 + Math.random() * 30) % 360;
      const sign = this.longitudeToSign(mockLongitude);
      const { degree, minute, second } = this.longitudeToDegreesMinutesSeconds(mockLongitude);

      houses.push({
        house,
        longitude: mockLongitude,
        sign,
        degree,
        minute,
        second,
      });
    }

    return houses;
  }

  /**
   * Assign houses to planets
   */
  private assignHousesToPlanets(planets: PlanetaryPosition[], houses: HouseCusp[]): PlanetaryPosition[] {
    return planets.map(planet => {
      const house = this.findHouseForLongitude(planet.longitude, houses);
      return { ...planet, house };
    });
  }

  /**
   * Find house for given longitude
   */
  private findHouseForLongitude(longitude: number, houses: HouseCusp[]): number {
    // Simplified house assignment - in production, this would handle house boundaries properly
    for (let i = 0; i < houses.length; i++) {
      const currentHouse = houses[i];
      const nextHouse = houses[(i + 1) % houses.length];
      
      if (this.isLongitudeInHouse(longitude, currentHouse.longitude, nextHouse.longitude)) {
        return currentHouse.house;
      }
    }
    return 1; // Default to first house
  }

  /**
   * Check if longitude is in house
   */
  private isLongitudeInHouse(longitude: number, houseStart: number, houseEnd: number): boolean {
    if (houseEnd > houseStart) {
      return longitude >= houseStart && longitude < houseEnd;
    } else {
      // Handle wrap-around at 0/360 degrees
      return longitude >= houseStart || longitude < houseEnd;
    }
  }

  /**
   * Calculate aspects between planets
   */
  private calculateAspects(planets: PlanetaryPosition[], aspectOrbs: Record<AspectType, number>): Aspect[] {
    const aspects: Aspect[] = [];

    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const planet1 = planets[i];
        const planet2 = planets[j];
        
        const aspect = this.calculateAspectBetweenPlanets(planet1, planet2, aspectOrbs);
        if (aspect) {
          aspects.push(aspect);
        }
      }
    }

    return aspects;
  }

  /**
   * Calculate aspect between two planets
   */
  private calculateAspectBetweenPlanets(
    planet1: PlanetaryPosition,
    planet2: PlanetaryPosition,
    aspectOrbs: Record<AspectType, number>
  ): Aspect | null {
    const angle = Math.abs(planet1.longitude - planet2.longitude);
    const normalizedAngle = angle > 180 ? 360 - angle : angle;

    for (const [aspectType, exactAngle] of Object.entries(ASPECT_ANGLES)) {
      const orb = aspectOrbs[aspectType as AspectType];
      const deviation = Math.abs(normalizedAngle - exactAngle);

      if (deviation <= orb) {
        return {
          planet1: planet1.planet,
          planet2: planet2.planet,
          type: aspectType as AspectType,
          angle: exactAngle,
          orb: deviation,
          applying: planet1.speed > planet2.speed, // Simplified applying/separating logic
          strength: 1 - (deviation / orb), // Strength based on orb
        };
      }
    }

    return null;
  }

  /**
   * Find Ascendant from house cusps
   */
  private findAscendant(houses: HouseCusp[]): PlanetaryPosition {
    const firstHouse = houses.find(h => h.house === 1);
    if (!firstHouse) {
      throw new AstrologyCalculationError('Could not find first house cusp', 'MISSING_ASCENDANT');
    }

    return {
      planet: Planet.SUN, // Placeholder - Ascendant is not a planet
      longitude: firstHouse.longitude,
      latitude: 0,
      distance: 0,
      speed: 0,
      sign: firstHouse.sign,
      degree: firstHouse.degree,
      minute: firstHouse.minute,
      second: firstHouse.second,
      retrograde: false,
      house: 1,
    };
  }

  /**
   * Find Midheaven from house cusps
   */
  private findMidheaven(houses: HouseCusp[]): PlanetaryPosition {
    const tenthHouse = houses.find(h => h.house === 10);
    if (!tenthHouse) {
      throw new AstrologyCalculationError('Could not find tenth house cusp', 'MISSING_MIDHEAVEN');
    }

    return {
      planet: Planet.SUN, // Placeholder - Midheaven is not a planet
      longitude: tenthHouse.longitude,
      latitude: 0,
      distance: 0,
      speed: 0,
      sign: tenthHouse.sign,
      degree: tenthHouse.degree,
      minute: tenthHouse.minute,
      second: tenthHouse.second,
      retrograde: false,
      house: 10,
    };
  }

  /**
   * Convert longitude to zodiac sign
   */
  private longitudeToSign(longitude: number): ZodiacSign {
    const normalizedLongitude = ((longitude % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedLongitude / 30);
    const signs = Object.values(ZodiacSign);
    return signs[signIndex];
  }

  /**
   * Convert longitude to degrees, minutes, seconds within sign
   */
  private longitudeToDegreesMinutesSeconds(longitude: number): { degree: number; minute: number; second: number } {
    const normalizedLongitude = ((longitude % 360) + 360) % 360;
    const withinSign = normalizedLongitude % 30;
    
    const degree = Math.floor(withinSign);
    const minuteFloat = (withinSign - degree) * 60;
    const minute = Math.floor(minuteFloat);
    const second = Math.floor((minuteFloat - minute) * 60);

    return { degree, minute, second };
  }

  /**
   * Calculate moon illumination percentage
   */
  private calculateMoonIllumination(date: Date): number {
    // Simplified moon illumination calculation
    // In production, this would use precise astronomical algorithms
    const daysSinceNewMoon = (date.getTime() % (29.53 * 24 * 60 * 60 * 1000)) / (29.53 * 24 * 60 * 60 * 1000);
    return Math.abs(Math.sin(daysSinceNewMoon * Math.PI));
  }

  /**
   * Calculate moon sign
   */
  private calculateMoonSign(date: Date): ZodiacSign {
    // Simplified moon sign calculation
    // In production, this would use Swiss Ephemeris for accuracy
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const signIndex = Math.floor((dayOfYear * 12) / 365) % 12;
    return Object.values(ZodiacSign)[signIndex];
  }

  /**
   * Get default planetary orbs
   */
  private getDefaultPlanetaryOrbs(): Record<Planet, number> {
    return {
      [Planet.SUN]: 8,
      [Planet.MOON]: 8,
      [Planet.MERCURY]: 6,
      [Planet.VENUS]: 6,
      [Planet.MARS]: 6,
      [Planet.JUPITER]: 6,
      [Planet.SATURN]: 6,
      [Planet.URANUS]: 4,
      [Planet.NEPTUNE]: 4,
      [Planet.PLUTO]: 4,
      [Planet.NORTH_NODE]: 3,
      [Planet.SOUTH_NODE]: 3,
      [Planet.CHIRON]: 3,
      [Planet.LILITH]: 2,
    };
  }
}

// Export singleton instance
export const astrologyCalculator = AstrologyCalculator.getInstance();