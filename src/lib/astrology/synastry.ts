/**
 * Synastry Analysis Engine
 * Relationship compatibility calculations and interpretations
 */

import {
  BirthChart,
  SynastryChart,
  Aspect,
  Planet,
  AspectType,
  PlanetaryPosition,
  CalculationResult,
  ASPECT_ANGLES,
  DEFAULT_ASPECT_ORBS,
  PLANET_INFO,
  ZODIAC_SIGNS_INFO,
} from '@/types/astrology'

export interface SynastryAspect extends Aspect {
  person1Planet: PlanetaryPosition
  person2Planet: PlanetaryPosition
  interpretation: string
  compatibility: 'excellent' | 'good' | 'challenging' | 'difficult'
  category: 'romantic' | 'communication' | 'emotional' | 'spiritual' | 'practical'
}

export interface CompatibilityScore {
  overall: number // 0-100
  romantic: number
  communication: number
  emotional: number
  spiritual: number
  practical: number
  breakdown: {
    excellentAspects: number
    goodAspects: number
    challengingAspects: number
    difficultAspects: number
  }
}

export interface SynastryInterpretation {
  summary: string
  strengths: string[]
  challenges: string[]
  advice: string[]
  keyAspects: SynastryAspect[]
  elementCompatibility: {
    fire: number
    earth: number
    air: number
    water: number
    balance: 'harmonious' | 'complementary' | 'challenging'
  }
  modalityCompatibility: {
    cardinal: number
    fixed: number
    mutable: number
    balance: 'harmonious' | 'complementary' | 'challenging'
  }
}

/**
 * Synastry Calculator for relationship compatibility analysis
 */
export class SynastryCalculator {
  private static instance: SynastryCalculator

  public static getInstance(): SynastryCalculator {
    if (!SynastryCalculator.instance) {
      SynastryCalculator.instance = new SynastryCalculator()
    }
    return SynastryCalculator.instance
  }

  /**
   * Calculate complete synastry analysis between two birth charts
   */
  public async calculateSynastry(
    chart1: BirthChart,
    chart2: BirthChart
  ): Promise<CalculationResult<SynastryChart>> {
    const startTime = Date.now()

    try {
      // Calculate synastry aspects
      const synastryAspects = this.calculateSynastryAspects(chart1.planets, chart2.planets)
      
      // Calculate compatibility scores
      const compatibilityScore = this.calculateCompatibilityScore(synastryAspects)
      
      // Generate interpretation
      const interpretation = this.generateSynastryInterpretation(
        chart1,
        chart2,
        synastryAspects,
        compatibilityScore
      )

      // Calculate composite chart (midpoint method)
      const compositeChart = this.calculateCompositeChart(chart1, chart2)

      const synastryChart: SynastryChart = {
        person1: chart1,
        person2: chart2,
        aspects: synastryAspects,
        compositeChart,
        compatibilityScore: compatibilityScore.overall,
        strengths: interpretation.strengths,
        challenges: interpretation.challenges,
      }

      const calculationTime = Date.now() - startTime

      return {
        success: true,
        data: synastryChart,
        calculationTime,
        accuracy: 'high',
      }
    } catch (error) {
      const calculationTime = Date.now() - startTime
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown synastry calculation error',
        calculationTime,
        accuracy: 'low',
      }
    }
  }

  /**
   * Calculate aspects between two sets of planetary positions
   */
  private calculateSynastryAspects(
    planets1: PlanetaryPosition[],
    planets2: PlanetaryPosition[]
  ): SynastryAspect[] {
    const aspects: SynastryAspect[] = []

    for (const planet1 of planets1) {
      for (const planet2 of planets2) {
        const aspect = this.calculateSynastryAspectBetweenPlanets(planet1, planet2)
        if (aspect) {
          aspects.push(aspect)
        }
      }
    }

    // Sort by strength (strongest first)
    return aspects.sort((a, b) => b.strength - a.strength)
  }

  /**
   * Calculate synastry aspect between two planets
   */
  private calculateSynastryAspectBetweenPlanets(
    planet1: PlanetaryPosition,
    planet2: PlanetaryPosition
  ): SynastryAspect | null {
    const angle = Math.abs(planet1.longitude - planet2.longitude)
    const normalizedAngle = angle > 180 ? 360 - angle : angle

    for (const [aspectType, exactAngle] of Object.entries(ASPECT_ANGLES)) {
      const orb = this.getSynastryOrb(planet1.planet, planet2.planet, aspectType as AspectType)
      const deviation = Math.abs(normalizedAngle - exactAngle)

      if (deviation <= orb) {
        const interpretation = this.getAspectInterpretation(
          planet1.planet,
          planet2.planet,
          aspectType as AspectType
        )

        return {
          planet1: planet1.planet,
          planet2: planet2.planet,
          type: aspectType as AspectType,
          angle: exactAngle,
          orb: deviation,
          applying: planet1.speed > planet2.speed,
          strength: 1 - (deviation / orb),
          person1Planet: planet1,
          person2Planet: planet2,
          interpretation: interpretation.text,
          compatibility: interpretation.compatibility,
          category: interpretation.category,
        }
      }
    }

    return null
  }

  /**
   * Get synastry-specific orbs (tighter than natal)
   */
  private getSynastryOrb(planet1: Planet, planet2: Planet, aspectType: AspectType): number {
    const baseOrb = DEFAULT_ASPECT_ORBS[aspectType]
    
    // Tighter orbs for synastry
    let modifier = 0.8

    // Wider orbs for luminaries (Sun/Moon)
    if (planet1 === Planet.SUN || planet1 === Planet.MOON || 
        planet2 === Planet.SUN || planet2 === Planet.MOON) {
      modifier = 1.0
    }

    // Tighter orbs for outer planets
    if ([Planet.URANUS, Planet.NEPTUNE, Planet.PLUTO].includes(planet1) ||
        [Planet.URANUS, Planet.NEPTUNE, Planet.PLUTO].includes(planet2)) {
      modifier = 0.6
    }

    return baseOrb * modifier
  }

  /**
   * Calculate compatibility score from synastry aspects
   */
  private calculateCompatibilityScore(aspects: SynastryAspect[]): CompatibilityScore {
    let excellentAspects = 0
    let goodAspects = 0
    let challengingAspects = 0
    let difficultAspects = 0

    const categoryScores = {
      romantic: 0,
      communication: 0,
      emotional: 0,
      spiritual: 0,
      practical: 0,
    }

    const categoryCount = {
      romantic: 0,
      communication: 0,
      emotional: 0,
      spiritual: 0,
      practical: 0,
    }

    for (const aspect of aspects) {
      // Count aspect types
      switch (aspect.compatibility) {
        case 'excellent':
          excellentAspects++
          break
        case 'good':
          goodAspects++
          break
        case 'challenging':
          challengingAspects++
          break
        case 'difficult':
          difficultAspects++
          break
      }

      // Calculate category scores
      const score = this.getAspectScore(aspect.compatibility, aspect.strength)
      categoryScores[aspect.category] += score
      categoryCount[aspect.category]++
    }

    // Calculate averages for each category
    const romantic = categoryCount.romantic > 0 ? categoryScores.romantic / categoryCount.romantic : 50
    const communication = categoryCount.communication > 0 ? categoryScores.communication / categoryCount.communication : 50
    const emotional = categoryCount.emotional > 0 ? categoryScores.emotional / categoryCount.emotional : 50
    const spiritual = categoryCount.spiritual > 0 ? categoryScores.spiritual / categoryCount.spiritual : 50
    const practical = categoryCount.practical > 0 ? categoryScores.practical / categoryCount.practical : 50

    // Calculate overall score
    const overall = (romantic + communication + emotional + spiritual + practical) / 5

    return {
      overall: Math.round(overall),
      romantic: Math.round(romantic),
      communication: Math.round(communication),
      emotional: Math.round(emotional),
      spiritual: Math.round(spiritual),
      practical: Math.round(practical),
      breakdown: {
        excellentAspects,
        goodAspects,
        challengingAspects,
        difficultAspects,
      },
    }
  }

  /**
   * Get numerical score for aspect compatibility
   */
  private getAspectScore(compatibility: SynastryAspect['compatibility'], strength: number): number {
    const baseScores = {
      excellent: 85,
      good: 70,
      challenging: 45,
      difficult: 25,
    }

    return baseScores[compatibility] + (strength * 15)
  }

  /**
   * Generate comprehensive synastry interpretation
   */
  private generateSynastryInterpretation(
    chart1: BirthChart,
    chart2: BirthChart,
    aspects: SynastryAspect[],
    score: CompatibilityScore
  ): SynastryInterpretation {
    const strengths: string[] = []
    const challenges: string[] = []
    const advice: string[] = []

    // Analyze key aspects
    const keyAspects = aspects.slice(0, 10) // Top 10 strongest aspects

    // Generate strengths based on excellent and good aspects
    const positiveAspects = aspects.filter(a => a.compatibility === 'excellent' || a.compatibility === 'good')
    if (positiveAspects.length > 0) {
      strengths.push('Strong planetary connections create natural harmony and understanding')
      
      if (positiveAspects.some(a => a.category === 'romantic')) {
        strengths.push('Excellent romantic and physical chemistry')
      }
      
      if (positiveAspects.some(a => a.category === 'communication')) {
        strengths.push('Natural ease in communication and mental connection')
      }
      
      if (positiveAspects.some(a => a.category === 'emotional')) {
        strengths.push('Deep emotional understanding and support')
      }
    }

    // Generate challenges based on difficult aspects
    const negativeAspects = aspects.filter(a => a.compatibility === 'challenging' || a.compatibility === 'difficult')
    if (negativeAspects.length > 0) {
      challenges.push('Some planetary tensions require conscious effort to navigate')
      
      if (negativeAspects.some(a => a.category === 'communication')) {
        challenges.push('Communication styles may clash and require patience')
      }
      
      if (negativeAspects.some(a => a.category === 'emotional')) {
        challenges.push('Emotional needs and expressions may differ significantly')
      }
    }

    // Generate advice
    if (score.overall >= 70) {
      advice.push('This is a naturally harmonious connection with great potential for lasting happiness')
    } else if (score.overall >= 50) {
      advice.push('A balanced relationship that can thrive with mutual understanding and effort')
    } else {
      advice.push('This connection requires significant work and compromise to succeed')
    }

    advice.push('Focus on your strengths while being patient with areas of challenge')
    advice.push('Open communication about differences will strengthen your bond')

    // Calculate element and modality compatibility
    const elementCompatibility = this.calculateElementCompatibility(chart1, chart2)
    const modalityCompatibility = this.calculateModalityCompatibility(chart1, chart2)

    const summary = this.generateSummary(score, elementCompatibility, modalityCompatibility)

    return {
      summary,
      strengths,
      challenges,
      advice,
      keyAspects,
      elementCompatibility,
      modalityCompatibility,
    }
  }

  /**
   * Calculate element compatibility between charts
   */
  private calculateElementCompatibility(chart1: BirthChart, chart2: BirthChart) {
    const elements = { fire: 0, earth: 0, air: 0, water: 0 }
    
    // Count elements in both charts
    [...chart1.planets, ...chart2.planets].forEach(planet => {
      const element = ZODIAC_SIGNS_INFO[planet.sign].element as keyof typeof elements
      elements[element]++
    })

    const total = Object.values(elements).reduce((sum, count) => sum + count, 0)
    const percentages = {
      fire: (elements.fire / total) * 100,
      earth: (elements.earth / total) * 100,
      air: (elements.air / total) * 100,
      water: (elements.water / total) * 100,
    }

    // Determine balance
    const maxElement = Math.max(...Object.values(percentages))
    const minElement = Math.min(...Object.values(percentages))
    const difference = maxElement - minElement

    let balance: 'harmonious' | 'complementary' | 'challenging'
    if (difference < 20) balance = 'harmonious'
    else if (difference < 40) balance = 'complementary'
    else balance = 'challenging'

    return { ...percentages, balance }
  }

  /**
   * Calculate modality compatibility between charts
   */
  private calculateModalityCompatibility(chart1: BirthChart, chart2: BirthChart) {
    const modalities = { cardinal: 0, fixed: 0, mutable: 0 }
    
    // Count modalities in both charts
    [...chart1.planets, ...chart2.planets].forEach(planet => {
      const modality = ZODIAC_SIGNS_INFO[planet.sign].modality as keyof typeof modalities
      modalities[modality]++
    })

    const total = Object.values(modalities).reduce((sum, count) => sum + count, 0)
    const percentages = {
      cardinal: (modalities.cardinal / total) * 100,
      fixed: (modalities.fixed / total) * 100,
      mutable: (modalities.mutable / total) * 100,
    }

    // Determine balance
    const maxModality = Math.max(...Object.values(percentages))
    const minModality = Math.min(...Object.values(percentages))
    const difference = maxModality - minModality

    let balance: 'harmonious' | 'complementary' | 'challenging'
    if (difference < 25) balance = 'harmonious'
    else if (difference < 45) balance = 'complementary'
    else balance = 'challenging'

    return { ...percentages, balance }
  }

  /**
   * Generate summary text
   */
  private generateSummary(
    score: CompatibilityScore,
    elementCompatibility: any,
    modalityCompatibility: any
  ): string {
    let summary = ''

    if (score.overall >= 80) {
      summary = 'This is an exceptionally compatible connection with natural harmony and deep understanding. '
    } else if (score.overall >= 65) {
      summary = 'This relationship shows strong compatibility with good potential for lasting happiness. '
    } else if (score.overall >= 50) {
      summary = 'This connection has moderate compatibility that can grow stronger with mutual effort. '
    } else {
      summary = 'This relationship faces significant challenges that require dedication to overcome. '
    }

    // Add element analysis
    if (elementCompatibility.balance === 'harmonious') {
      summary += 'Your elemental energies blend harmoniously, creating natural understanding. '
    } else if (elementCompatibility.balance === 'complementary') {
      summary += 'Your different elemental energies complement each other well. '
    } else {
      summary += 'Your elemental energies may clash and require conscious balancing. '
    }

    // Add modality analysis
    if (modalityCompatibility.balance === 'harmonious') {
      summary += 'Your approaches to life and change are naturally aligned.'
    } else if (modalityCompatibility.balance === 'complementary') {
      summary += 'Your different approaches to life can complement each other beautifully.'
    } else {
      summary += 'Your different approaches to life may require patience and understanding.'
    }

    return summary
  }

  /**
   * Calculate composite chart (midpoint method)
   */
  private calculateCompositeChart(chart1: BirthChart, chart2: BirthChart): BirthChart | undefined {
    // Simplified composite chart calculation
    // In a full implementation, this would calculate midpoints for all planets
    // and create a new chart representing the relationship itself
    return undefined // Placeholder for now
  }

  /**
   * Get aspect interpretation for synastry
   */
  private getAspectInterpretation(
    planet1: Planet,
    planet2: Planet,
    aspectType: AspectType
  ): { text: string; compatibility: SynastryAspect['compatibility']; category: SynastryAspect['category'] } {
    // This would be a comprehensive database of aspect interpretations
    // For now, providing basic interpretations
    
    const isHarmonious = ['conjunction', 'trine', 'sextile'].includes(aspectType)
    const isChallenging = ['square', 'opposition'].includes(aspectType)
    
    let compatibility: SynastryAspect['compatibility']
    if (isHarmonious) {
      compatibility = aspectType === 'trine' ? 'excellent' : 'good'
    } else if (isChallenging) {
      compatibility = aspectType === 'opposition' ? 'difficult' : 'challenging'
    } else {
      compatibility = 'good' // Minor aspects
    }

    // Determine category based on planets involved
    let category: SynastryAspect['category'] = 'practical'
    
    if ([Planet.SUN, Planet.MARS, Planet.VENUS].includes(planet1) || 
        [Planet.SUN, Planet.MARS, Planet.VENUS].includes(planet2)) {
      category = 'romantic'
    } else if ([Planet.MERCURY].includes(planet1) || [Planet.MERCURY].includes(planet2)) {
      category = 'communication'
    } else if ([Planet.MOON].includes(planet1) || [Planet.MOON].includes(planet2)) {
      category = 'emotional'
    } else if ([Planet.JUPITER, Planet.NEPTUNE, Planet.PLUTO].includes(planet1) || 
               [Planet.JUPITER, Planet.NEPTUNE, Planet.PLUTO].includes(planet2)) {
      category = 'spiritual'
    }

    const text = `${planet1} ${aspectType} ${planet2}: ${this.getBasicAspectDescription(planet1, planet2, aspectType)}`

    return { text, compatibility, category }
  }

  /**
   * Get basic aspect description
   */
  private getBasicAspectDescription(planet1: Planet, planet2: Planet, aspectType: AspectType): string {
    const descriptions = {
      conjunction: 'creates a powerful blending of energies',
      opposition: 'creates tension that requires balance and integration',
      trine: 'flows harmoniously and supports natural understanding',
      square: 'creates dynamic tension that motivates growth',
      sextile: 'offers opportunities for positive connection',
      quincunx: 'requires adjustment and conscious effort',
    }

    return descriptions[aspectType] || 'creates a unique dynamic between you'
  }
}

// Export singleton instance
export const synastryCalculator = SynastryCalculator.getInstance()