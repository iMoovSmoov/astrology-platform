'use client'

import { motion } from 'framer-motion'
import { 
  Calculator, 
  Heart, 
  BookOpen, 
  Zap, 
  Shield, 
  Globe,
  Star,
  Moon,
  Sun
} from 'lucide-react'

const features = [
  {
    name: 'Accurate Birth Charts',
    description: 'Professional-grade calculations using Swiss Ephemeris for precise planetary positions and house cusps.',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Compatibility Analysis',
    description: 'Deep synastry and composite chart analysis to understand relationship dynamics and potential.',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Educational Content',
    description: 'Comprehensive learning resources from astrology basics to advanced techniques and interpretations.',
    icon: BookOpen,
    color: 'from-purple-500 to-violet-500',
  },
  {
    name: 'Real-time Transits',
    description: 'Track current planetary movements and receive alerts for significant astrological events.',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Privacy & Security',
    description: 'Your personal data is encrypted and secure. Optional anonymous usage with full data control.',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Global Support',
    description: 'Accurate calculations for any location worldwide with proper timezone and coordinate handling.',
    icon: Globe,
    color: 'from-indigo-500 to-blue-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> astrological insights</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform combines ancient astrological wisdom with modern technology to provide 
              the most accurate and comprehensive astrological experience available.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.name}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{feature.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">{feature.description}</p>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {index % 3 === 0 && <Star className="h-16 w-16 text-primary" />}
                    {index % 3 === 1 && <Moon className="h-16 w-16 text-primary" />}
                    {index % 3 === 2 && <Sun className="h-16 w-16 text-primary" />}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}