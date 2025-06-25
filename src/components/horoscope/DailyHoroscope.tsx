'use client'

import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

const SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces'
]

const DAILY: Record<string, string> = {
  Aries: 'Take bold steps toward your goals today. Your energy is contagious!',
  Taurus: 'Focus on stability and nurture meaningful connections.',
  Gemini: 'Your curiosity opens doors—share your ideas freely.',
  Cancer: 'Create a cozy space and listen closely to your intuition.',
  Leo: 'Let your confidence shine but watch for dramatic impulses.',
  Virgo: 'Small details reveal big truths; organize and plan ahead.',
  Libra: 'Seek balance in relationships and express appreciation.',
  Scorpio: 'Embrace transformation by letting go of lingering doubts.',
  Sagittarius: 'Adventure calls—be spontaneous and explore.',
  Capricorn: 'Hard work pays off soon; stay disciplined.',
  Aquarius: 'Innovative thinking sparks progress—collaborate openly.',
  Pisces: 'Dreams bring insight; channel creativity into action.'
}

export function DailyHoroscope() {
  const [sign, setSign] = useState<string>('Aries')

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Daily Horoscope</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={sign} onValueChange={setSign}>
          <SelectTrigger>
            <SelectValue placeholder="Select your sign" />
          </SelectTrigger>
          <SelectContent>
            {SIGNS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <motion.p
          key={sign}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg text-muted-foreground"
        >
          {DAILY[sign]}
        </motion.p>
      </CardContent>
    </Card>
  )
}

export default DailyHoroscope
