/**
 * Chakra Assessment System
 * Comprehensive chakra analysis and balancing recommendations
 */

import { ChakraType, ChakraAssessment, ChakraRecommendation, Chakra } from '@/types/spiritual'

// ============================================================================
// CHAKRA DATABASE
// ============================================================================

export const CHAKRA_DATABASE: Record<ChakraType, Chakra> = {
  root: {
    type: 'root',
    name: 'Root Chakra',
    sanskrit_name: 'Muladhara',
    location: 'Base of spine',
    color: 'Red',
    element: 'earth',
    sound: 'LAM',
    symbol: 'Four-petaled lotus',
    crystals: ['Red Jasper', 'Hematite', 'Black Tourmaline', 'Garnet'],
    essential_oils: ['Patchouli', 'Cedarwood', 'Vetiver', 'Sandalwood'],
    yoga_poses: ['Mountain Pose', 'Child\'s Pose', 'Warrior I', 'Tree Pose'],
    affirmations: [
      'I am safe and secure',
      'I belong here on Earth',
      'I have everything I need',
      'I am grounded and stable'
    ],
    balanced_traits: [
      'Feeling grounded and stable',
      'Sense of safety and security',
      'Physical vitality and health',
      'Connection to family and tribe',
      'Ability to manifest basic needs'
    ],
    imbalanced_traits: [
      'Anxiety and fear',
      'Feeling disconnected or spacey',
      'Financial insecurity',
      'Physical health issues',
      'Difficulty with boundaries'
    ],
    physical_associations: [
      'Legs and feet',
      'Lower back',
      'Adrenal glands',
      'Immune system',
      'Bones and teeth'
    ],
    emotional_associations: [
      'Survival instincts',
      'Grounding',
      'Stability',
      'Security',
      'Basic trust'
    ],
    description: 'The Root Chakra is your foundation, connecting you to the Earth and providing stability, security, and grounding energy.'
  },
  sacral: {
    type: 'sacral',
    name: 'Sacral Chakra',
    sanskrit_name: 'Svadhisthana',
    location: 'Lower abdomen, below navel',
    color: 'Orange',
    element: 'water',
    sound: 'VAM',
    symbol: 'Six-petaled lotus',
    crystals: ['Carnelian', 'Orange Calcite', 'Moonstone', 'Sunstone'],
    essential_oils: ['Sweet Orange', 'Ylang Ylang', 'Sandalwood', 'Jasmine'],
    yoga_poses: ['Hip Circles', 'Goddess Pose', 'Pigeon Pose', 'Cobra Pose'],
    affirmations: [
      'I embrace my creativity',
      'I honor my emotions',
      'I am passionate and alive',
      'I deserve pleasure and joy'
    ],
    balanced_traits: [
      'Creative expression',
      'Healthy sexuality',
      'Emotional balance',
      'Passion and enthusiasm',
      'Ability to enjoy life'
    ],
    imbalanced_traits: [
      'Creative blocks',
      'Sexual dysfunction',
      'Emotional instability',
      'Addiction tendencies',
      'Guilt and shame'
    ],
    physical_associations: [
      'Reproductive organs',
      'Lower back',
      'Kidneys',
      'Bladder',
      'Large intestine'
    ],
    emotional_associations: [
      'Creativity',
      'Sexuality',
      'Emotions',
      'Pleasure',
      'Relationships'
    ],
    description: 'The Sacral Chakra governs creativity, sexuality, emotions, and your ability to experience pleasure and joy in life.'
  },
  solar_plexus: {
    type: 'solar_plexus',
    name: 'Solar Plexus Chakra',
    sanskrit_name: 'Manipura',
    location: 'Upper abdomen, stomach area',
    color: 'Yellow',
    element: 'fire',
    sound: 'RAM',
    symbol: 'Ten-petaled lotus',
    crystals: ['Citrine', 'Yellow Jasper', 'Tiger\'s Eye', 'Amber'],
    essential_oils: ['Lemon', 'Ginger', 'Peppermint', 'Rosemary'],
    yoga_poses: ['Boat Pose', 'Warrior III', 'Plank Pose', 'Twists'],
    affirmations: [
      'I am confident and powerful',
      'I trust my inner wisdom',
      'I am worthy of respect',
      'I choose my own path'
    ],
    balanced_traits: [
      'Personal power and confidence',
      'Strong sense of self',
      'Good decision-making',
      'Healthy boundaries',
      'Leadership abilities'
    ],
    imbalanced_traits: [
      'Low self-esteem',
      'Control issues',
      'Anger and aggression',
      'Digestive problems',
      'Victim mentality'
    ],
    physical_associations: [
      'Digestive system',
      'Liver',
      'Pancreas',
      'Stomach',
      'Adrenals'
    ],
    emotional_associations: [
      'Personal power',
      'Confidence',
      'Self-worth',
      'Control',
      'Decision-making'
    ],
    description: 'The Solar Plexus Chakra is your center of personal power, confidence, and self-worth, governing your sense of identity and control.'
  },
  heart: {
    type: 'heart',
    name: 'Heart Chakra',
    sanskrit_name: 'Anahata',
    location: 'Center of chest',
    color: 'Green',
    element: 'air',
    sound: 'YAM',
    symbol: 'Twelve-petaled lotus',
    crystals: ['Rose Quartz', 'Green Aventurine', 'Malachite', 'Emerald'],
    essential_oils: ['Rose', 'Eucalyptus', 'Pine', 'Bergamot'],
    yoga_poses: ['Camel Pose', 'Fish Pose', 'Backbends', 'Heart Openers'],
    affirmations: [
      'I give and receive love freely',
      'I forgive myself and others',
      'My heart is open to love',
      'I am connected to all beings'
    ],
    balanced_traits: [
      'Unconditional love',
      'Compassion and empathy',
      'Forgiveness',
      'Healthy relationships',
      'Connection to others'
    ],
    imbalanced_traits: [
      'Difficulty with relationships',
      'Jealousy and possessiveness',
      'Fear of intimacy',
      'Resentment and bitterness',
      'Codependency'
    ],
    physical_associations: [
      'Heart',
      'Lungs',
      'Circulatory system',
      'Arms and hands',
      'Thymus gland'
    ],
    emotional_associations: [
      'Love',
      'Compassion',
      'Forgiveness',
      'Connection',
      'Relationships'
    ],
    description: 'The Heart Chakra is the center of love, compassion, and connection, bridging the physical and spiritual realms.'
  },
  throat: {
    type: 'throat',
    name: 'Throat Chakra',
    sanskrit_name: 'Vishuddha',
    location: 'Throat area',
    color: 'Blue',
    element: 'spirit',
    sound: 'HAM',
    symbol: 'Sixteen-petaled lotus',
    crystals: ['Blue Lace Agate', 'Sodalite', 'Lapis Lazuli', 'Aquamarine'],
    essential_oils: ['Eucalyptus', 'Tea Tree', 'Sage', 'Blue Chamomile'],
    yoga_poses: ['Fish Pose', 'Shoulder Stand', 'Lion\'s Breath', 'Neck Rolls'],
    affirmations: [
      'I speak my truth with confidence',
      'I express myself clearly',
      'I am heard and understood',
      'My voice matters'
    ],
    balanced_traits: [
      'Clear communication',
      'Authentic self-expression',
      'Good listening skills',
      'Creative expression',
      'Speaking truth'
    ],
    imbalanced_traits: [
      'Difficulty expressing thoughts',
      'Fear of speaking up',
      'Gossiping or lying',
      'Throat problems',
      'Creative blocks'
    ],
    physical_associations: [
      'Throat',
      'Thyroid gland',
      'Neck and shoulders',
      'Mouth and jaw',
      'Ears'
    ],
    emotional_associations: [
      'Communication',
      'Truth',
      'Expression',
      'Creativity',
      'Authenticity'
    ],
    description: 'The Throat Chakra governs communication, self-expression, and your ability to speak your truth authentically.'
  },
  third_eye: {
    type: 'third_eye',
    name: 'Third Eye Chakra',
    sanskrit_name: 'Ajna',
    location: 'Between the eyebrows',
    color: 'Indigo',
    element: 'spirit',
    sound: 'OM',
    symbol: 'Two-petaled lotus',
    crystals: ['Amethyst', 'Lapis Lazuli', 'Fluorite', 'Labradorite'],
    essential_oils: ['Frankincense', 'Clary Sage', 'Juniper', 'Rosemary'],
    yoga_poses: ['Child\'s Pose', 'Forward Folds', 'Meditation', 'Eye Exercises'],
    affirmations: [
      'I trust my intuition',
      'I see clearly',
      'I am open to wisdom',
      'My inner vision guides me'
    ],
    balanced_traits: [
      'Strong intuition',
      'Clear vision and insight',
      'Spiritual awareness',
      'Good memory and focus',
      'Psychic abilities'
    ],
    imbalanced_traits: [
      'Lack of clarity',
      'Poor judgment',
      'Confusion',
      'Headaches',
      'Disconnection from intuition'
    ],
    physical_associations: [
      'Eyes',
      'Brain',
      'Pituitary gland',
      'Nervous system',
      'Sinuses'
    ],
    emotional_associations: [
      'Intuition',
      'Wisdom',
      'Insight',
      'Vision',
      'Psychic abilities'
    ],
    description: 'The Third Eye Chakra is your center of intuition, wisdom, and spiritual insight, connecting you to higher consciousness.'
  },
  crown: {
    type: 'crown',
    name: 'Crown Chakra',
    sanskrit_name: 'Sahasrara',
    location: 'Top of head',
    color: 'Violet/White',
    element: 'spirit',
    sound: 'Silence/OM',
    symbol: 'Thousand-petaled lotus',
    crystals: ['Clear Quartz', 'Amethyst', 'Selenite', 'Diamond'],
    essential_oils: ['Frankincense', 'Myrrh', 'Sandalwood', 'Lotus'],
    yoga_poses: ['Headstand', 'Meditation', 'Savasana', 'Pranayama'],
    affirmations: [
      'I am connected to divine wisdom',
      'I am one with the universe',
      'I trust the divine plan',
      'I am pure consciousness'
    ],
    balanced_traits: [
      'Spiritual connection',
      'Divine wisdom',
      'Enlightenment',
      'Universal consciousness',
      'Inner peace'
    ],
    imbalanced_traits: [
      'Spiritual disconnection',
      'Cynicism',
      'Closed-mindedness',
      'Depression',
      'Lack of purpose'
    ],
    physical_associations: [
      'Brain',
      'Pineal gland',
      'Central nervous system',
      'Cerebral cortex',
      'Skull'
    ],
    emotional_associations: [
      'Spirituality',
      'Enlightenment',
      'Divine connection',
      'Universal love',
      'Transcendence'
    ],
    description: 'The Crown Chakra connects you to divine consciousness, universal wisdom, and your highest spiritual potential.'
  }
}

// ============================================================================
// ASSESSMENT QUESTIONS
// ============================================================================

export const CHAKRA_QUESTIONS: Record<ChakraType, string[]> = {
  root: [
    'I feel safe and secure in my daily life',
    'I have a strong connection to my family and community',
    'I feel grounded and stable',
    'I trust that my basic needs will be met',
    'I feel physically healthy and vital',
    'I have a sense of belonging in the world',
    'I feel financially secure',
    'I am comfortable with my physical body'
  ],
  sacral: [
    'I express my creativity freely',
    'I have healthy intimate relationships',
    'I enjoy physical pleasures without guilt',
    'I am comfortable with my sexuality',
    'I can express my emotions appropriately',
    'I am passionate about life',
    'I adapt well to change',
    'I have a healthy relationship with money'
  ],
  solar_plexus: [
    'I feel confident in my abilities',
    'I make decisions easily',
    'I have a strong sense of personal power',
    'I set healthy boundaries with others',
    'I take responsibility for my life',
    'I feel worthy of respect',
    'I trust my gut instincts',
    'I am comfortable being the center of attention'
  ],
  heart: [
    'I give and receive love easily',
    'I forgive others and myself',
    'I feel compassionate toward others',
    'I have healthy, loving relationships',
    'I feel connected to all living beings',
    'I am comfortable with intimacy',
    'I can express love without expecting anything in return',
    'I feel grateful for what I have'
  ],
  throat: [
    'I express my thoughts and feelings clearly',
    'I speak my truth even when it\'s difficult',
    'I am a good listener',
    'I feel comfortable speaking in public',
    'I express my creativity through words or art',
    'I communicate my needs effectively',
    'I am honest in my communications',
    'I feel heard and understood by others'
  ],
  third_eye: [
    'I trust my intuition',
    'I have clear vision for my life',
    'I remember my dreams',
    'I can visualize clearly',
    'I have good concentration and focus',
    'I am open to new ideas and perspectives',
    'I can see the bigger picture in situations',
    'I have psychic or intuitive experiences'
  ],
  crown: [
    'I feel connected to something greater than myself',
    'I have a sense of life purpose',
    'I experience moments of transcendence',
    'I feel at peace with life and death',
    'I have a regular spiritual practice',
    'I feel guided by divine wisdom',
    'I experience unconditional love',
    'I feel unity with all existence'
  ]
}

// ============================================================================
// CHAKRA ASSESSMENT CLASS
// ============================================================================

export class ChakraAssessmentSystem {
  private static instance: ChakraAssessmentSystem

  public static getInstance(): ChakraAssessmentSystem {
    if (!ChakraAssessmentSystem.instance) {
      ChakraAssessmentSystem.instance = new ChakraAssessmentSystem()
    }
    return ChakraAssessmentSystem.instance
  }

  /**
   * Calculate chakra assessment from responses
   */
  public calculateAssessment(
    userId: string,
    responses: Record<ChakraType, number[]>
  ): ChakraAssessment {
    const chakraScores: Record<ChakraType, number> = {} as Record<ChakraType, number>
    
    // Calculate average score for each chakra
    Object.entries(responses).forEach(([chakra, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
      chakraScores[chakra as ChakraType] = Math.round(average * 10) / 10
    })

    // Calculate overall balance
    const allScores = Object.values(chakraScores)
    const overallBalance = allScores.reduce((sum, score) => sum + score, 0) / allScores.length

    // Generate recommendations
    const recommendations = this.generateRecommendations(chakraScores)

    return {
      id: `assessment_${Date.now()}`,
      user_id: userId,
      chakra_scores: chakraScores,
      overall_balance: Math.round(overallBalance * 10) / 10,
      recommendations,
      created_at: new Date().toISOString()
    }
  }

  /**
   * Generate recommendations based on chakra scores
   */
  private generateRecommendations(scores: Record<ChakraType, number>): ChakraRecommendation[] {
    const recommendations: ChakraRecommendation[] = []

    Object.entries(scores).forEach(([chakra, score]) => {
      const chakraType = chakra as ChakraType
      const chakraData = CHAKRA_DATABASE[chakraType]

      if (score < 3.5) {
        // Chakra needs attention
        recommendations.push({
          chakra: chakraType,
          issue: this.getChakraIssue(chakraType, score),
          suggestions: this.getBalancingSuggestions(chakraType),
          crystals: chakraData.crystals.slice(0, 2),
          practices: this.getBalancingPractices(chakraType)
        })
      }
    })

    return recommendations
  }

  /**
   * Get chakra issue description based on score
   */
  private getChakraIssue(chakra: ChakraType, score: number): string {
    const issues = {
      root: score < 2 ? 'Severely blocked - feeling unsafe and ungrounded' : 'Underactive - needs grounding and stability',
      sacral: score < 2 ? 'Severely blocked - creative and emotional stagnation' : 'Underactive - needs creative expression',
      solar_plexus: score < 2 ? 'Severely blocked - low self-esteem and personal power' : 'Underactive - needs confidence building',
      heart: score < 2 ? 'Severely blocked - difficulty with love and connection' : 'Underactive - needs heart opening',
      throat: score < 2 ? 'Severely blocked - communication and expression issues' : 'Underactive - needs authentic expression',
      third_eye: score < 2 ? 'Severely blocked - lack of clarity and intuition' : 'Underactive - needs intuitive development',
      crown: score < 2 ? 'Severely blocked - spiritual disconnection' : 'Underactive - needs spiritual connection'
    }

    return issues[chakra]
  }

  /**
   * Get balancing suggestions for chakra
   */
  private getBalancingSuggestions(chakra: ChakraType): string[] {
    const suggestions = {
      root: [
        'Spend time in nature, especially walking barefoot',
        'Practice grounding exercises and root chakra meditation',
        'Eat red foods like beets, strawberries, and red peppers',
        'Use grounding essential oils like patchouli and cedarwood'
      ],
      sacral: [
        'Engage in creative activities like art, dance, or music',
        'Practice hip-opening yoga poses',
        'Eat orange foods like oranges, carrots, and sweet potatoes',
        'Spend time near water - ocean, lake, or bath'
      ],
      solar_plexus: [
        'Practice confidence-building exercises and affirmations',
        'Engage in physical activities that build core strength',
        'Eat yellow foods like bananas, corn, and yellow peppers',
        'Spend time in sunlight and practice sun gazing'
      ],
      heart: [
        'Practice loving-kindness meditation',
        'Engage in heart-opening yoga poses',
        'Eat green foods like leafy greens and green tea',
        'Practice forgiveness and gratitude exercises'
      ],
      throat: [
        'Practice speaking your truth and authentic expression',
        'Sing, chant, or practice vocal exercises',
        'Eat blue foods like blueberries and drink herbal teas',
        'Practice neck and shoulder stretches'
      ],
      third_eye: [
        'Practice meditation and mindfulness',
        'Keep a dream journal and work with visualization',
        'Eat purple foods like eggplant and purple grapes',
        'Practice eye exercises and limit screen time'
      ],
      crown: [
        'Develop a regular spiritual practice',
        'Practice meditation and prayer',
        'Eat light, pure foods and consider fasting',
        'Spend time in silence and contemplation'
      ]
    }

    return suggestions[chakra]
  }

  /**
   * Get balancing practices for chakra
   */
  private getBalancingPractices(chakra: ChakraType): string[] {
    const chakraData = CHAKRA_DATABASE[chakra]
    return [
      ...chakraData.yoga_poses.slice(0, 2),
      `Chant "${chakraData.sound}" mantra`,
      `Use ${chakraData.essential_oils[0]} essential oil`
    ]
  }

  /**
   * Get chakra by type
   */
  public getChakra(type: ChakraType): Chakra {
    return CHAKRA_DATABASE[type]
  }

  /**
   * Get all chakras
   */
  public getAllChakras(): Chakra[] {
    return Object.values(CHAKRA_DATABASE)
  }

  /**
   * Get questions for chakra
   */
  public getQuestionsForChakra(chakra: ChakraType): string[] {
    return CHAKRA_QUESTIONS[chakra]
  }

  /**
   * Get all questions
   */
  public getAllQuestions(): Record<ChakraType, string[]> {
    return CHAKRA_QUESTIONS
  }
}

// Export singleton instance
export const chakraAssessment = ChakraAssessmentSystem.getInstance()"