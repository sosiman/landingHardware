import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Hyperspeed from './components/effects/Hyperspeed'
import { hyperspeedPresets } from './components/effects/Hyperspeed'

const heroImages = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
]

function App() {
  const { scrollYProgress } = useScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const servicesRef = useRef(null)

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(bgInterval)
  }, [])

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* --- CAROUSEL BACKGROUND PARA TODA LA WEB --- */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/80" />
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImages[imageIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url(${heroImages[imageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
        </AnimatePresence>

        {/* Gradientes de color más suaves */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 10% 90%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 80% 10%, rgba(139,92,246,0.20), transparent 55%)",
              "radial-gradient(circle at 40% 50%, rgba(239,68,68,0.18), transparent 55%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 opacity-50 mix-blend-screen"
        />
      </div>

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

      {/* SECCIÓN UNIFICADA: Services + Gallery con el MISMO fondo */}
      <section className="relative">
        {/* Dark overlay para mejorar legibilidad - COMPARTIDO */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Services Section */}
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

    </div>
  )
}

export default App
