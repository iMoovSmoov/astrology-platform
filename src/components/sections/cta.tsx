'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 px-8 py-16 text-center text-white sm:px-16"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            
            {/* Floating stars */}
            {Array.from({ length: 8 }, (_, i) => (
              <Star
                key={i}
                className={`absolute w-4 h-4 text-white/20 star-twinkle`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Ready to discover your cosmic blueprint?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90"
            >
              Join thousands of users who have unlocked the secrets of their birth charts. 
              Start your astrological journey today with the most accurate calculations available.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-white/90 group"
              >
                <Link href="/chart">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/learn">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-6 text-sm text-white/70"
            >
              No credit card required • Free birth chart • Professional accuracy
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}