'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Professional Astrologer',
    content: 'The accuracy of the calculations is outstanding. I use this platform for all my client consultations.',
    rating: 5,
    avatar: 'SC',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Astrology Student',
    content: 'The educational content helped me understand my birth chart deeply. The interpretations are spot-on.',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Emma Thompson',
    role: 'Spiritual Seeker',
    content: 'Finally found a platform that combines accuracy with beautiful design. The transit alerts are incredibly helpful.',
    rating: 5,
    avatar: 'ET',
  },
]

export function Testimonials() {
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
              Trusted by astrologers
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> worldwide</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join thousands of astrologers and enthusiasts who rely on our platform for accurate insights.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border bg-background p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}