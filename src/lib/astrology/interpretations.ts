/**
 * AI-Powered Astrology Interpretation Engine
 * Generates personalized chart readings and insights
 */

import {
  BirthChart,
  PlanetaryPosition,
  Aspect,
  Planet,
  ZodiacSign,
  HouseSystem,
  AspectType,
  ChartInterpretation,
  ZODIAC_SIGNS_INFO,
  PLANET_INFO,
} from '@/types/astrology'

export interface PersonalityProfile {
  coreTraits: string[]
  strengths: string[]
  challenges: string[]
  motivations: string[]
  fears: string[]
  lifeThemes: string[]
}

export interface LifeAreaAnalysis {
  love: {
    style: string
    needs: string[]
    challenges: string[]
    advice: string[]
  }
  career: {
    talents: string[]
    idealEnvironment: string
    challenges: string[]
    advice: string[]
  }
  relationships: {
    style: string
    patterns: string[]
    growth: string[]
  }
  spirituality: {
    path: string
    gifts: string[]
    practices: string[]
  }
  health: {
    tendencies: string[]
    recommendations: string[]
    warnings: string[]
  }
}

export interface DetailedInterpretation {
  summary: string
  personality: PersonalityProfile
  lifeAreas: LifeAreaAnalysis
  yearAhead: {
    themes: string[]
    opportunities: string[]
    challenges: string[]
    advice: string[]
  }
  planetaryInfluences: {
    planet: Planet
    sign: ZodiacSign
    house: number
    interpretation: string
    keywords: string[]
  }[]
  majorAspects: {
    aspect: Aspect
    interpretation: string
    lifeImpact: string
    advice: string
  }[]
  soulPurpose: {
    northNode: string
    southNode: string
    lifeLesson: string
    karmaticPattern: string
  }
}

/**
 * AI Interpretation Engine for generating personalized astrology readings
 */
export class InterpretationEngine {
  private static instance: InterpretationEngine

  public static getInstance(): InterpretationEngine {
    if (!InterpretationEngine.instance) {
      InterpretationEngine.instance = new InterpretationEngine()
    }
    return InterpretationEngine.instance
  }

  /**
   * Generate comprehensive chart interpretation
   */
  public async generateChartInterpretation(chart: BirthChart): Promise<DetailedInterpretation> {
    // Analyze core personality from Sun, Moon, Rising
    const personality = this.analyzePersonality(chart)
    
    // Analyze life areas based on planetary placements
    const lifeAreas = this.analyzeLifeAreas(chart)
    
    // Generate year ahead forecast
    const yearAhead = this.generateYearAheadForecast(chart)
    
    // Interpret planetary influences
    const planetaryInfluences = this.interpretPlanetaryInfluences(chart)
    
    // Analyze major aspects
    const majorAspects = this.interpretMajorAspects(chart)
    
    // Soul purpose analysis (North/South Node)
    const soulPurpose = this.analyzeSoulPurpose(chart)
    
    // Generate overall summary
    const summary = this.generateSummary(personality, lifeAreas, chart)

    return {
      summary,
      personality,
      lifeAreas,
      yearAhead,
      planetaryInfluences,
      majorAspects,
      soulPurpose,
    }
  }

  /**
   * Analyze core personality from Sun, Moon, Rising
   */
  private analyzePersonality(chart: BirthChart): PersonalityProfile {
    const sun = chart.planets.find(p => p.planet === Planet.SUN)
    const moon = chart.planets.find(p => p.planet === Planet.MOON)
    const ascendant = chart.ascendant

    const coreTraits: string[] = []
    const strengths: string[] = []
    const challenges: string[] = []
    const motivations: string[] = []
    const fears: string[] = []
    const lifeThemes: string[] = []

    // Sun sign analysis (core identity)
    if (sun) {
      const sunTraits = this.getSunSignTraits(sun.sign)
      coreTraits.push(...sunTraits.core)
      strengths.push(...sunTraits.strengths)
      challenges.push(...sunTraits.challenges)
      motivations.push(...sunTraits.motivations)
    }

    // Moon sign analysis (emotional nature)
    if (moon) {
      const moonTraits = this.getMoonSignTraits(moon.sign)
      coreTraits.push(...moonTraits.emotional)
      fears.push(...moonTraits.fears)
      lifeThemes.push(...moonTraits.themes)
    }

    // Rising sign analysis (outer personality)
    if (ascendant) {
      const risingTraits = this.getRisingSignTraits(ascendant.sign)
      coreTraits.push(...risingTraits.presentation)
      strengths.push(...risingTraits.gifts)
    }

    // Analyze dominant elements and modalities
    const elementAnalysis = this.analyzeElements(chart)
    const modalityAnalysis = this.analyzeModalities(chart)
    
    lifeThemes.push(...elementAnalysis.themes)
    lifeThemes.push(...modalityAnalysis.themes)

    return {
      coreTraits: this.removeDuplicates(coreTraits).slice(0, 8),
      strengths: this.removeDuplicates(strengths).slice(0, 6),
      challenges: this.removeDuplicates(challenges).slice(0, 6),
      motivations: this.removeDuplicates(motivations).slice(0, 5),
      fears: this.removeDuplicates(fears).slice(0, 4),
      lifeThemes: this.removeDuplicates(lifeThemes).slice(0, 6),
    }
  }

  /**
   * Analyze life areas based on planetary placements
   */
  private analyzeLifeAreas(chart: BirthChart): LifeAreaAnalysis {
    const venus = chart.planets.find(p => p.planet === Planet.VENUS)
    const mars = chart.planets.find(p => p.planet === Planet.MARS)
    const mercury = chart.planets.find(p => p.planet === Planet.MERCURY)
    const jupiter = chart.planets.find(p => p.planet === Planet.JUPITER)
    const saturn = chart.planets.find(p => p.planet === Planet.SATURN)

    return {
      love: this.analyzeLoveStyle(venus, mars, chart),
      career: this.analyzeCareerPath(saturn, jupiter, chart),
      relationships: this.analyzeRelationshipStyle(venus, mars, mercury, chart),
      spirituality: this.analyzeSpiritualPath(jupiter, chart),
      health: this.analyzeHealthTendencies(chart),
    }
  }

  /**
   * Generate year ahead forecast
   */
  private generateYearAheadForecast(chart: BirthChart) {
    // This would integrate with transit calculations for personalized forecasts
    return {
      themes: [
        'Personal transformation and growth',
        'New opportunities in creative expression',
        'Deepening spiritual understanding',
        'Relationship evolution and healing'
      ],
      opportunities: [
        'Career advancement through authentic self-expression',
        'Meaningful connections with like-minded individuals',
        'Creative projects gaining recognition',
        'Spiritual practices bringing profound insights'
      ],
      challenges: [
        'Balancing personal needs with others\' expectations',
        'Overcoming self-doubt in new ventures',
        'Managing increased responsibilities',
        'Navigating changing relationship dynamics'
      ],
      advice: [
        'Trust your intuition when making important decisions',
        'Embrace change as an opportunity for growth',
        'Communicate your needs clearly in relationships',
        'Take time for self-care and reflection'
      ]
    }
  }

  /**
   * Interpret planetary influences
   */
  private interpretPlanetaryInfluences(chart: BirthChart) {
    return chart.planets.map(planet => ({
      planet: planet.planet,
      sign: planet.sign,
      house: planet.house || 1,
      interpretation: this.getPlanetSignHouseInterpretation(planet.planet, planet.sign, planet.house || 1),
      keywords: this.getPlanetKeywords(planet.planet, planet.sign)
    }))
  }

  /**
   * Interpret major aspects
   */
  private interpretMajorAspects(chart: BirthChart) {
    const majorAspects = chart.aspects.filter(aspect => 
      ['conjunction', 'opposition', 'trine', 'square', 'sextile'].includes(aspect.type)
    )

    return majorAspects.slice(0, 10).map(aspect => ({
      aspect,
      interpretation: this.getAspectInterpretation(aspect),
      lifeImpact: this.getAspectLifeImpact(aspect),
      advice: this.getAspectAdvice(aspect)
    }))
  }

  /**
   * Analyze soul purpose from North/South Node
   */
  private analyzeSoulPurpose(chart: BirthChart) {
    const northNode = chart.planets.find(p => p.planet === Planet.NORTH_NODE)
    const southNode = chart.planets.find(p => p.planet === Planet.SOUTH_NODE)

    return {
      northNode: northNode ? this.getNodeInterpretation(northNode, 'north') : 'Embrace new experiences and growth',
      southNode: southNode ? this.getNodeInterpretation(southNode, 'south') : 'Release past patterns that no longer serve',
      lifeLesson: 'Balance past wisdom with future growth',
      karmaticPattern: 'Transform challenges into wisdom and service to others'
    }
  }

  /**
   * Generate overall summary
   */
  private generateSummary(personality: PersonalityProfile, lifeAreas: LifeAreaAnalysis, chart: BirthChart): string {
    const sun = chart.planets.find(p => p.planet === Planet.SUN)
    const moon = chart.planets.find(p => p.planet === Planet.MOON)
    const rising = chart.ascendant

    let summary = `You are a unique individual with a rich inner world and distinctive approach to life. `

    if (sun) {
      summary += `Your ${sun.sign} Sun gives you ${this.getSunSignSummary(sun.sign)}. `
    }

    if (moon) {
      summary += `With your Moon in ${moon.sign}, you ${this.getMoonSignSummary(moon.sign)}. `
    }

    if (rising) {
      summary += `Your ${rising.sign} Rising means others see you as ${this.getRisingSignSummary(rising.sign)}. `
    }

    summary += `Your greatest strengths include ${personality.strengths.slice(0, 3).join(', ').toLowerCase()}, `
    summary += `while your main growth areas involve ${personality.challenges.slice(0, 2).join(' and ').toLowerCase()}. `
    summary += `In relationships, you ${lifeAreas.love.style.toLowerCase()}, and in your career, you thrive when ${lifeAreas.career.idealEnvironment.toLowerCase()}.`

    return summary
  }

  // Helper methods for trait analysis
  private getSunSignTraits(sign: ZodiacSign) {
    const traits = {
      [ZodiacSign.ARIES]: {
        core: ['pioneering', 'energetic', 'independent', 'courageous'],
        strengths: ['natural leadership', 'quick decision-making', 'enthusiasm'],
        challenges: ['impatience', 'impulsiveness', 'difficulty with routine'],
        motivations: ['being first', 'new challenges', 'personal freedom']
      },
      [ZodiacSign.TAURUS]: {
        core: ['stable', 'practical', 'sensual', 'determined'],
        strengths: ['reliability', 'patience', 'artistic appreciation'],
        challenges: ['stubbornness', 'resistance to change', 'materialism'],
        motivations: ['security', 'comfort', 'beauty and pleasure']
      },
      [ZodiacSign.GEMINI]: {
        core: ['curious', 'adaptable', 'communicative', 'versatile'],
        strengths: ['quick learning', 'social skills', 'mental agility'],
        challenges: ['inconsistency', 'superficiality', 'restlessness'],
        motivations: ['variety', 'intellectual stimulation', 'social connection']
      },
      [ZodiacSign.CANCER]: {
        core: ['nurturing', 'intuitive', 'protective', 'emotional'],
        strengths: ['empathy', 'loyalty', 'strong intuition'],
        challenges: ['moodiness', 'over-sensitivity', 'clinging to the past'],
        motivations: ['emotional security', 'family bonds', 'helping others']
      },
      [ZodiacSign.LEO]: {
        core: ['confident', 'creative', 'generous', 'dramatic'],
        strengths: ['natural charisma', 'creative expression', 'loyalty'],
        challenges: ['ego sensitivity', 'need for attention', 'pride'],
        motivations: ['recognition', 'creative expression', 'being appreciated']
      },
      [ZodiacSign.VIRGO]: {
        core: ['analytical', 'practical', 'helpful', 'perfectionist'],
        strengths: ['attention to detail', 'service orientation', 'problem-solving'],
        challenges: ['over-criticism', 'worry', 'perfectionism'],
        motivations: ['improvement', 'usefulness', 'order and efficiency']
      },
      [ZodiacSign.LIBRA]: {
        core: ['harmonious', 'diplomatic', 'aesthetic', 'partnership-oriented'],
        strengths: ['fairness', 'social grace', 'artistic sense'],
        challenges: ['indecisiveness', 'people-pleasing', 'conflict avoidance'],
        motivations: ['balance', 'beauty', 'harmonious relationships']
      },
      [ZodiacSign.SCORPIO]: {
        core: ['intense', 'transformative', 'mysterious', 'powerful'],
        strengths: ['depth of insight', 'emotional strength', 'determination'],
        challenges: ['jealousy', 'secretiveness', 'vindictiveness'],
        motivations: ['truth', 'transformation', 'deep connections']
      },
      [ZodiacSign.SAGITTARIUS]: {
        core: ['adventurous', 'philosophical', 'optimistic', 'freedom-loving'],
        strengths: ['broad perspective', 'enthusiasm', 'honesty'],
        challenges: ['restlessness', 'tactlessness', 'over-promising'],
        motivations: ['freedom', 'adventure', 'higher knowledge']
      },
      [ZodiacSign.CAPRICORN]: {
        core: ['ambitious', 'disciplined', 'responsible', 'traditional'],
        strengths: ['perseverance', 'leadership', 'practical wisdom'],
        challenges: ['pessimism', 'rigidity', 'workaholism'],
        motivations: ['achievement', 'respect', 'long-term security']
      },
      [ZodiacSign.AQUARIUS]: {
        core: ['innovative', 'humanitarian', 'independent', 'unconventional'],
        strengths: ['originality', 'humanitarian ideals', 'friendship'],
        challenges: ['detachment', 'rebelliousness', 'unpredictability'],
        motivations: ['progress', 'freedom', 'helping humanity']
      },
      [ZodiacSign.PISCES]: {
        core: ['compassionate', 'intuitive', 'artistic', 'spiritual'],
        strengths: ['empathy', 'creativity', 'spiritual insight'],
        challenges: ['escapism', 'over-sensitivity', 'lack of boundaries'],
        motivations: ['spiritual connection', 'helping others', 'creative expression']
      }
    }

    return traits[sign] || traits[ZodiacSign.ARIES]
  }

  private getMoonSignTraits(sign: ZodiacSign) {
    // Simplified moon sign traits - would be expanded in production
    return {
      emotional: [`emotionally ${sign}`],
      fears: [`fear of ${sign}-related challenges`],
      themes: [`${sign} emotional patterns`]
    }
  }

  private getRisingSignTraits(sign: ZodiacSign) {
    // Simplified rising sign traits - would be expanded in production
    return {
      presentation: [`appears ${sign}-like`],
      gifts: [`${sign} natural abilities`]
    }
  }

  private analyzeElements(chart: BirthChart) {
    const elements = { fire: 0, earth: 0, air: 0, water: 0 }
    
    chart.planets.forEach(planet => {
      const element = ZODIAC_SIGNS_INFO[planet.sign].element as keyof typeof elements
      elements[element]++
    })

    const dominantElement = Object.entries(elements).reduce((a, b) => elements[a[0] as keyof typeof elements] > elements[b[0] as keyof typeof elements] ? a : b)[0]

    const elementThemes = {
      fire: ['passionate expression', 'leadership roles', 'creative inspiration'],
      earth: ['practical achievement', 'material security', 'steady progress'],
      air: ['intellectual pursuits', 'social connections', 'communication'],
      water: ['emotional depth', 'intuitive understanding', 'spiritual growth']
    }

    return {
      themes: elementThemes[dominantElement as keyof typeof elementThemes] || []
    }
  }

  private analyzeModalities(chart: BirthChart) {
    const modalities = { cardinal: 0, fixed: 0, mutable: 0 }
    
    chart.planets.forEach(planet => {
      const modality = ZODIAC_SIGNS_INFO[planet.sign].modality as keyof typeof modalities
      modalities[modality]++
    })

    const dominantModality = Object.entries(modalities).reduce((a, b) => modalities[a[0] as keyof typeof modalities] > modalities[b[0] as keyof typeof modalities] ? a : b)[0]

    const modalityThemes = {
      cardinal: ['initiating change', 'leadership opportunities', 'new beginnings'],
      fixed: ['building stability', 'persistent effort', 'maintaining traditions'],
      mutable: ['adapting to change', 'learning and teaching', 'flexible responses']
    }

    return {
      themes: modalityThemes[dominantModality as keyof typeof modalityThemes] || []
    }
  }

  private analyzeLoveStyle(venus: PlanetaryPosition | undefined, mars: PlanetaryPosition | undefined, chart: BirthChart) {
    return {
      style: venus ? `You express love through ${venus.sign} qualities` : 'You have a unique approach to love',
      needs: ['emotional security', 'mutual respect', 'shared values'],
      challenges: ['balancing independence with intimacy', 'communicating needs clearly'],
      advice: ['be authentic in relationships', 'communicate your needs clearly', 'maintain your individuality']
    }
  }

  private analyzeCareerPath(saturn: PlanetaryPosition | undefined, jupiter: PlanetaryPosition | undefined, chart: BirthChart) {
    return {
      talents: ['natural leadership', 'creative problem-solving', 'strong communication'],
      idealEnvironment: 'you can express your authentic self and help others',
      challenges: ['balancing ambition with personal life', 'overcoming self-doubt'],
      advice: ['follow your passion', 'develop your natural talents', 'seek mentorship']
    }
  }

  private analyzeRelationshipStyle(venus: PlanetaryPosition | undefined, mars: PlanetaryPosition | undefined, mercury: PlanetaryPosition | undefined, chart: BirthChart) {
    return {
      style: 'You approach relationships with authenticity and care',
      patterns: ['seeking deep connections', 'valuing loyalty and trust', 'need for emotional security'],
      growth: ['learning to communicate needs', 'balancing giving and receiving', 'maintaining healthy boundaries']
    }
  }

  private analyzeSpiritualPath(jupiter: PlanetaryPosition | undefined, chart: BirthChart) {
    return {
      path: jupiter ? `Your spiritual path involves ${jupiter.sign} qualities` : 'Your spiritual path is unique and personal',
      gifts: ['natural intuition', 'compassionate heart', 'wisdom through experience'],
      practices: ['meditation and reflection', 'service to others', 'connection with nature']
    }
  }

  private analyzeHealthTendencies(chart: BirthChart) {
    return {
      tendencies: ['stress-related issues', 'need for work-life balance', 'sensitivity to environment'],
      recommendations: ['regular exercise', 'stress management', 'healthy diet', 'adequate rest'],
      warnings: ['avoid overwork', 'manage stress levels', 'listen to your body']
    }
  }

  // Additional helper methods
  private getPlanetSignHouseInterpretation(planet: Planet, sign: ZodiacSign, house: number): string {
    return `${planet} in ${sign} in the ${house}${this.getOrdinalSuffix(house)} house brings unique energy to your life`
  }

  private getPlanetKeywords(planet: Planet, sign: ZodiacSign): string[] {
    return [`${planet}`, `${sign}`, 'transformation', 'growth']
  }

  private getAspectInterpretation(aspect: Aspect): string {
    return `${aspect.planet1} ${aspect.type} ${aspect.planet2} creates dynamic energy in your chart`
  }

  private getAspectLifeImpact(aspect: Aspect): string {
    return `This aspect influences your approach to life and relationships`
  }

  private getAspectAdvice(aspect: Aspect): string {
    return `Work with this energy consciously for personal growth`
  }

  private getNodeInterpretation(node: PlanetaryPosition, type: 'north' | 'south'): string {
    return `${type === 'north' ? 'Embrace' : 'Release'} ${node.sign} qualities in your spiritual journey`
  }

  private getSunSignSummary(sign: ZodiacSign): string {
    const summaries = {
      [ZodiacSign.ARIES]: 'a pioneering spirit and natural leadership abilities',
      [ZodiacSign.TAURUS]: 'stability, practicality, and appreciation for beauty',
      [ZodiacSign.GEMINI]: 'curiosity, adaptability, and excellent communication skills',
      [ZodiacSign.CANCER]: 'deep intuition, nurturing nature, and emotional sensitivity',
      [ZodiacSign.LEO]: 'natural charisma, creativity, and generous heart',
      [ZodiacSign.VIRGO]: 'analytical mind, attention to detail, and desire to help others',
      [ZodiacSign.LIBRA]: 'diplomatic nature, aesthetic sense, and need for harmony',
      [ZodiacSign.SCORPIO]: 'intensity, transformative power, and deep insight',
      [ZodiacSign.SAGITTARIUS]: 'adventurous spirit, philosophical mind, and love of freedom',
      [ZodiacSign.CAPRICORN]: 'ambition, discipline, and practical wisdom',
      [ZodiacSign.AQUARIUS]: 'innovative thinking, humanitarian ideals, and independence',
      [ZodiacSign.PISCES]: 'compassion, intuition, and artistic sensitivity'
    }
    return summaries[sign] || 'unique qualities and perspectives'
  }

  private getMoonSignSummary(sign: ZodiacSign): string {
    return `process emotions through ${sign} energy`
  }

  private getRisingSignSummary(sign: ZodiacSign): string {
    return `someone with ${sign} qualities`
  }

  private getOrdinalSuffix(num: number): string {
    const j = num % 10
    const k = num % 100
    if (j === 1 && k !== 11) return 'st'
    if (j === 2 && k !== 12) return 'nd'
    if (j === 3 && k !== 13) return 'rd'
    return 'th'
  }

  private removeDuplicates(array: string[]): string[] {
    return [...new Set(array)]
  }
}

// Export singleton instance
export const interpretationEngine = InterpretationEngine.getInstance()