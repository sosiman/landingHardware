import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

function App() {
  const { scrollYProgress } = useScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">

      {/* Fondo corporativo estático para toda la web */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 via-stone-600 to-amber-700" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Navigation */}
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <Hero />

      {/* SECCIÓN UNIFICADA: Services + Gallery con el MISMO fondo */}
      <section className="relative">
        {/* Dark overlay para mejorar legibilidad - COMPARTIDO */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Services Section */}
        <div>
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
