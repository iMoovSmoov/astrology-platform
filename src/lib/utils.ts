import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format degrees to display format (e.g., "15°32'45\"")
 */
export function formatDegrees(degrees: number, minutes: number, seconds: number): string {
  return `${degrees}°${minutes.toString().padStart(2, '0')}'${seconds.toString().padStart(2, '0')}"`
}

/**
 * Format zodiac position (e.g., "15°32' Aries")
 */
export function formatZodiacPosition(degree: number, minute: number, sign: string): string {
  return `${degree}°${minute.toString().padStart(2, '0')}' ${sign}`
}

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

/**
 * Format aspect orb (e.g., "2°15'")
 */
export function formatOrb(orb: number): string {
  const degrees = Math.floor(orb)
  const minutes = Math.floor((orb - degrees) * 60)
  return `${degrees}°${minutes.toString().padStart(2, '0')}'`
}

/**
 * Get aspect strength description
 */
export function getAspectStrength(strength: number): string {
  if (strength >= 0.8) return 'Very Strong'
  if (strength >= 0.6) return 'Strong'
  if (strength >= 0.4) return 'Moderate'
  if (strength >= 0.2) return 'Weak'
  return 'Very Weak'
}

/**
 * Get element color
 */
export function getElementColor(element: string): string {
  switch (element.toLowerCase()) {
    case 'fire': return 'text-red-500'
    case 'earth': return 'text-green-500'
    case 'air': return 'text-blue-500'
    case 'water': return 'text-cyan-500'
    default: return 'text-gray-500'
  }
}

/**
 * Get modality color
 */
export function getModalityColor(modality: string): string {
  switch (modality.toLowerCase()) {
    case 'cardinal': return 'text-purple-500'
    case 'fixed': return 'text-orange-500'
    case 'mutable': return 'text-teal-500'
    default: return 'text-gray-500'
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Format date for display
 */
export function formatDate(date: Date, includeTime: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  
  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }
  
  return date.toLocaleDateString('en-US', options)
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get contrast color for background
 */
export function getContrastColor(hexColor: string): string {
  // Remove # if present
  const color = hexColor.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}