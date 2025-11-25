import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Hyperspeed from './components/effects/Hyperspeed'
import { hyperspeedPresets } from './components/effects/Hyperspeed'
import Galaxy from './components/effects/Galaxy'
import ParticleMorph from './components/ParticleMorph'

function App() {
  const { scrollYProgress } = useScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(false)
  const servicesRef = useRef(null)

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const handleScroll = () => {
      if (servicesRef.current) {
        const servicesTop = servicesRef.current.offsetTop
        const scrollPosition = window.scrollY + window.innerHeight / 2

        // Activa el splash cuando llegas a la sección Services
        setShowSplash(scrollPosition >= servicesTop)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check inicial

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hyperspeed - visible desde Services hacia abajo con tonos morados */}
      {showSplash && (
        <div className="fixed inset-0 pointer-events-none opacity-85 z-0">
          <Hyperspeed
            effectOptions={{
              ...hyperspeedPresets.one,
              colors: {
                roadColor: 0x0a0a0a,
                islandColor: 0x0c0c0c,
                background: 0x000000,
                shoulderLines: 0x4a2a6a,
                brokenLines: 0x4a2a6a,
                leftCars: [0xd856bf, 0x9333ea, 0xc247ac],
                rightCars: [0x6366f1, 0x8b5cf6, 0xa855f7],
                sticks: 0xa855f7
              }
            }}
          />
        </div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* SECCIÓN UNIFICADA: Services + Gallery con el MISMO fondo Galaxy */}
      <section className="relative">
        {/* Galaxy Background Effect - COMPARTIDO por Services Y Gallery */}
        <div className="absolute inset-0 z-0">
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.2}
            glowIntensity={0.4}
            saturation={0.6}
            hueShift={240}
            rotationSpeed={0.05}
            twinkleIntensity={0.4}
            transparent={true}
          />
        </div>

        {/* Dark overlay para mejorar legibilidad - COMPARTIDO */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Services Section - SIN su propio Galaxy */}
        <div ref={servicesRef}>
          <Services />
        </div>

        {/* Gallery Section - SIN su propio fondo */}
        <Gallery />
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="fixed top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10"
      />

      {/* 3D Particle Morph Component - Fixed Top Right */}
      <ParticleMorph />
    </div>
  )
}

export default App
