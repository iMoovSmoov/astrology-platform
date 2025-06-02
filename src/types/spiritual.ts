/**
 * Comprehensive Spiritual Platform Types
 * Supporting astrology, tarot, numerology, and all spiritual tools
 */

import { BirthData, BirthChart } from './astrology'

// ============================================================================
// CORE SPIRITUAL PROFILE SYSTEM
// ============================================================================

export interface SpiritualProfile {
  id: string
  userId: string
  
  // Core Identity
  displayName: string
  spiritualName?: string
  bio: string
  location?: string
  
  // Spiritual Interests & Practices
  interests: SpiritualInterest[]
  practices: SpiritualPractice[]
  experience_level: ExperienceLevel
  seeking: SeekingType[]
  
  // Spiritual Tools Data
  astrology?: AstrologyProfile
  tarot?: TarotProfile
  numerology?: NumerologyProfile
  crystals?: CrystalProfile
  meditation?: MeditationProfile
  chakras?: ChakraProfile
  
  // Dating & Compatibility
  dating_preferences?: DatingPreferences
  compatibility_settings?: CompatibilitySettings
  
  // Privacy & Visibility
  visibility: ProfileVisibility
  show_spiritual_data: boolean
  allow_spiritual_matching: boolean
  
  created_at: string
  updated_at: string
}

export type SpiritualInterest = 
  | 'astrology' | 'tarot' | 'numerology' | 'crystals' | 'meditation'
  | 'chakras' | 'reiki' | 'yoga' | 'shamanism' | 'wicca' | 'buddhism'
  | 'hinduism' | 'kabbalah' | 'alchemy' | 'herbalism' | 'divination'
  | 'energy_healing' | 'past_lives' | 'lucid_dreaming' | 'manifestation'

export type SpiritualPractice =
  | 'daily_meditation' | 'moon_rituals' | 'crystal_healing' | 'tarot_reading'
  | 'astrology_study' | 'energy_work' | 'manifestation' | 'journaling'
  | 'yoga_practice' | 'breathwork' | 'sound_healing' | 'plant_medicine'

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'teacher'

export type SeekingType = 
  | 'learning' | 'teaching' | 'friendship' | 'romantic_partner' | 'spiritual_guide'
  | 'practice_partner' | 'study_group' | 'healing_exchange' | 'mentorship'

// ============================================================================
// TAROT SYSTEM
// ============================================================================

export interface TarotCard {
  id: string
  name: string
  number?: number
  suit?: TarotSuit
  arcana: 'major' | 'minor'
  keywords: string[]
  upright_meaning: string
  reversed_meaning: string
  description: string
  symbolism: string[]
  astrological_correspondence?: string
  numerological_value?: number
  element?: Element
  image_url: string
}

export type TarotSuit = 'cups' | 'pentacles' | 'swords' | 'wands'

export interface TarotReading {
  id: string
  user_id: string
  spread_type: TarotSpreadType
  question?: string
  cards: TarotCardDraw[]
  interpretation: string
  created_at: string
  is_public: boolean
  tags: string[]
}

export interface TarotCardDraw {
  position: number
  position_meaning: string
  card: TarotCard
  is_reversed: boolean
  interpretation: string
}

export type TarotSpreadType = 
  | 'single_card' | 'three_card' | 'celtic_cross' | 'relationship'
  | 'career' | 'spiritual_guidance' | 'past_present_future'
  | 'chakra_spread' | 'moon_cycle' | 'yearly_forecast'

export interface TarotProfile {
  favorite_deck: string
  reading_style: 'intuitive' | 'traditional' | 'psychological'
  experience_years: number
  specialties: TarotSpecialty[]
  total_readings: number
  accuracy_rating?: number
}

export type TarotSpecialty = 
  | 'love_relationships' | 'career_finance' | 'spiritual_growth'
  | 'life_purpose' | 'shadow_work' | 'manifestation' | 'healing'

// ============================================================================
// NUMEROLOGY SYSTEM
// ============================================================================

export interface NumerologyProfile {
  life_path_number: number
  destiny_number: number
  soul_urge_number: number
  personality_number: number
  birth_day_number: number
  expression_number: number
  karmic_debt_numbers: number[]
  master_numbers: number[]
  personal_year: number
  interpretation: NumerologyInterpretation
}

export interface NumerologyInterpretation {
  life_path: string
  destiny: string
  soul_urge: string
  personality: string
  strengths: string[]
  challenges: string[]
  compatibility_numbers: number[]
  lucky_numbers: number[]
  career_guidance: string
  relationship_guidance: string
}

export interface NumerologyReading {
  id: string
  user_id: string
  reading_type: NumerologyReadingType
  birth_data: {
    full_name: string
    birth_date: Date
  }
  results: NumerologyProfile
  interpretation: string
  created_at: string
}

export type NumerologyReadingType = 
  | 'full_profile' | 'compatibility' | 'name_analysis' | 'personal_year'
  | 'relationship_analysis' | 'career_guidance' | 'spiritual_path'

// ============================================================================
// CRYSTAL & GEMSTONE SYSTEM
// ============================================================================

export interface Crystal {
  id: string
  name: string
  alternative_names: string[]
  color: string[]
  chakra_associations: ChakraType[]
  zodiac_associations: string[]
  element: Element
  hardness: number
  crystal_system: CrystalSystem
  
  // Properties
  metaphysical_properties: string[]
  healing_properties: string[]
  emotional_properties: string[]
  spiritual_properties: string[]
  
  // Usage
  uses: CrystalUse[]
  cleansing_methods: string[]
  charging_methods: string[]
  
  // Information
  description: string
  formation: string
  locations_found: string[]
  rarity: 'common' | 'uncommon' | 'rare' | 'very_rare'
  
  image_url: string
  created_at: string
}

export type CrystalSystem = 
  | 'cubic' | 'tetragonal' | 'orthorhombic' | 'hexagonal'
  | 'trigonal' | 'monoclinic' | 'triclinic' | 'amorphous'

export type CrystalUse = 
  | 'meditation' | 'healing' | 'protection' | 'manifestation'
  | 'chakra_balancing' | 'emotional_support' | 'spiritual_growth'
  | 'energy_cleansing' | 'dream_work' | 'divination'

export interface CrystalProfile {
  favorite_crystals: string[]
  collection_size: number
  experience_level: ExperienceLevel
  primary_uses: CrystalUse[]
  cleansing_preferences: string[]
  charging_preferences: string[]
}

// ============================================================================
// CHAKRA SYSTEM
// ============================================================================

export type ChakraType = 
  | 'root' | 'sacral' | 'solar_plexus' | 'heart' 
  | 'throat' | 'third_eye' | 'crown'

export interface Chakra {
  type: ChakraType
  name: string
  sanskrit_name: string
  location: string
  color: string
  element: Element
  sound: string
  symbol: string
  
  // Associations
  crystals: string[]
  essential_oils: string[]
  yoga_poses: string[]
  affirmations: string[]
  
  // Characteristics
  balanced_traits: string[]
  imbalanced_traits: string[]
  physical_associations: string[]
  emotional_associations: string[]
  
  description: string
}

export interface ChakraAssessment {
  id: string
  user_id: string
  chakra_scores: Record<ChakraType, number>
  overall_balance: number
  recommendations: ChakraRecommendation[]
  created_at: string
}

export interface ChakraRecommendation {
  chakra: ChakraType
  issue: string
  suggestions: string[]
  crystals: string[]
  practices: string[]
}

export interface ChakraProfile {
  dominant_chakras: ChakraType[]
  blocked_chakras: ChakraType[]
  balancing_practices: string[]
  assessment_history: ChakraAssessment[]
}

// ============================================================================
// MEDITATION SYSTEM
// ============================================================================

export interface MeditationSession {
  id: string
  user_id: string
  type: MeditationType
  duration: number // minutes
  guided: boolean
  guide_name?: string
  music_type?: string
  focus_area: MeditationFocus
  notes?: string
  mood_before: number // 1-10
  mood_after: number // 1-10
  created_at: string
}

export type MeditationType = 
  | 'mindfulness' | 'loving_kindness' | 'body_scan' | 'breath_awareness'
  | 'walking' | 'mantra' | 'visualization' | 'chakra' | 'sound_healing'

export type MeditationFocus = 
  | 'stress_relief' | 'sleep' | 'anxiety' | 'focus' | 'spiritual_growth'
  | 'healing' | 'manifestation' | 'self_love' | 'forgiveness' | 'clarity'

export interface MeditationProfile {
  total_sessions: number
  total_minutes: number
  streak_days: number
  favorite_types: MeditationType[]
  preferred_duration: number
  experience_level: ExperienceLevel
  goals: MeditationFocus[]
}

// ============================================================================
// SPIRITUAL DATING & COMPATIBILITY
// ============================================================================

export interface DatingPreferences {
  age_range: [number, number]
  distance_range: number // miles/km
  spiritual_interests: SpiritualInterest[]
  experience_levels: ExperienceLevel[]
  seeking_types: SeekingType[]
  
  // Compatibility Requirements
  astrology_compatibility: boolean
  numerology_compatibility: boolean
  chakra_compatibility: boolean
  
  // Lifestyle Preferences
  lifestyle_choices: LifestyleChoice[]
  relationship_type: RelationshipType[]
}

export type LifestyleChoice = 
  | 'vegetarian' | 'vegan' | 'organic' | 'minimalist' | 'eco_conscious'
  | 'substance_free' | 'health_conscious' | 'spiritual_community'

export type RelationshipType = 
  | 'casual_dating' | 'serious_relationship' | 'marriage' | 'spiritual_partnership'
  | 'polyamorous' | 'friendship' | 'mentorship' | 'study_partner'

export interface CompatibilitySettings {
  weight_astrology: number // 0-100
  weight_numerology: number // 0-100
  weight_interests: number // 0-100
  weight_practices: number // 0-100
  weight_experience: number // 0-100
  
  minimum_compatibility: number // 0-100
  show_compatibility_breakdown: boolean
  auto_match: boolean
}

export interface SpiritualMatch {
  id: string
  user1_id: string
  user2_id: string
  compatibility_score: number
  compatibility_breakdown: CompatibilityBreakdown
  match_type: MatchType
  status: MatchStatus
  created_at: string
  updated_at: string
}

export interface CompatibilityBreakdown {
  overall: number
  astrology: number
  numerology: number
  interests: number
  practices: number
  chakras: number
  lifestyle: number
  
  strengths: string[]
  challenges: string[]
  recommendations: string[]
}

export type MatchType = 
  | 'romantic' | 'friendship' | 'spiritual_partnership' | 'study_partner'
  | 'practice_partner' | 'mentor_student' | 'healing_exchange'

export type MatchStatus = 
  | 'pending' | 'mutual_interest' | 'connected' | 'declined' | 'blocked'

// ============================================================================
// UNIVERSAL SPIRITUAL TOOLS
// ============================================================================

export type Element = 'fire' | 'earth' | 'air' | 'water' | 'spirit'

export interface SpiritualReading {
  id: string
  user_id: string
  reading_type: ReadingType
  tools_used: SpiritualTool[]
  question?: string
  interpretation: string
  accuracy_rating?: number
  is_public: boolean
  tags: string[]
  created_at: string
}

export type ReadingType = 
  | 'daily_guidance' | 'relationship' | 'career' | 'spiritual_path'
  | 'life_purpose' | 'healing' | 'manifestation' | 'shadow_work'

export type SpiritualTool = 
  | 'astrology' | 'tarot' | 'numerology' | 'crystals' | 'chakras'
  | 'i_ching' | 'runes' | 'pendulum' | 'oracle_cards' | 'meditation'

export interface ProfileVisibility {
  profile: 'public' | 'friends' | 'private'
  spiritual_data: 'public' | 'friends' | 'matches' | 'private'
  readings: 'public' | 'friends' | 'private'
  location: 'exact' | 'city' | 'region' | 'hidden'
}

// ============================================================================
// SPIRITUAL COMMUNITY FEATURES
// ============================================================================

export interface SpiritualGroup {
  id: string
  name: string
  description: string
  focus_areas: SpiritualInterest[]
  group_type: 'study' | 'practice' | 'support' | 'dating' | 'local' | 'online'
  privacy: 'public' | 'private' | 'invite_only'
  member_count: number
  location?: string
  meeting_schedule?: string
  created_by: string
  moderators: string[]
  rules: string[]
  created_at: string
}

export interface SpiritualEvent {
  id: string
  title: string
  description: string
  event_type: EventType
  spiritual_focus: SpiritualInterest[]
  date_time: string
  duration: number // minutes
  location_type: 'online' | 'in_person' | 'hybrid'
  location?: string
  max_participants?: number
  cost?: number
  organizer_id: string
  requirements?: string[]
  materials_needed?: string[]
  created_at: string
}

export type EventType = 
  | 'meditation_circle' | 'tarot_workshop' | 'astrology_class' | 'crystal_healing'
  | 'full_moon_ritual' | 'new_moon_ceremony' | 'chakra_balancing'
  | 'spiritual_dating_event' | 'book_club' | 'practice_group'

// ============================================================================
// ASTROLOGY INTEGRATION (from existing types)
// ============================================================================

export interface AstrologyProfile {
  birth_data: BirthData
  birth_chart: BirthChart
  favorite_aspects: string[]
  study_areas: string[]
  reading_style: 'traditional' | 'modern' | 'evolutionary' | 'psychological'
  house_system_preference: string
  orb_preferences: Record<string, number>
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export * from './astrology' // Re-export existing astrology types"