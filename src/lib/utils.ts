import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

export function degreeToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

export function radiansToDegree(radians: number): number {
  return (radians * 180) / Math.PI
}

export function normalizeAngle(angle: number): number {
  while (angle < 0) angle += 360
  while (angle >= 360) angle -= 360
  return angle
}

export function formatDegree(degree: number): string {
  const normalizedDegree = normalizeAngle(degree)
  const deg = Math.floor(normalizedDegree)
  const min = Math.floor((normalizedDegree - deg) * 60)
  const sec = Math.floor(((normalizedDegree - deg) * 60 - min) * 60)
  return `${deg}°${min.toString().padStart(2, '0')}'${sec.toString().padStart(2, '0')}"`
}

export function getZodiacSign(longitude: number): string {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ]
  const signIndex = Math.floor(normalizeAngle(longitude) / 30)
  return signs[signIndex]
}

export function getZodiacDegree(longitude: number): number {
  return normalizeAngle(longitude) % 30
}

export function formatZodiacPosition(longitude: number): string {
  const sign = getZodiacSign(longitude)
  const degree = getZodiacDegree(longitude)
  return `${formatDegree(degree)} ${sign}`
}