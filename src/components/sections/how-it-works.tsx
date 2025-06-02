'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Star, BookOpen } from 'lucide-react'

const steps = [
  {
    name: 'Enter Birth Details',
    description: 'Provide your birth date, time, and location for accurate astronomical calculations.',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Generate Your Chart',
    description: 'Our Swiss Ephemeris engine calculates precise planetary positions and house cusps.',
    icon: Star,
    color: 'from-purple-500 to-violet-500',
  },
  {
    name: 'Explore Interpretations',
    description: 'Discover detailed meanings of your planets, houses, and aspects with expert insights.',
    icon: BookOpen,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Track Your Journey',
    description: 'Monitor transits, progressions, and receive personalized astrological guidance.',
    icon: MapPin,
    color: 'from-green-500 to-emerald-500',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get started with your astrological journey in just a few simple steps.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="mx-auto mb-4">
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">{step.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-8" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}