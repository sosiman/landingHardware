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
    <div className="min-h-screen text-zinc-900 overflow-x-hidden relative bg-[#FDF5E6]">

      {/* Navigation */}
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <Hero />

      {/* SECCIÓN UNIFICADA: Services + Gallery */}
      <section className="relative">
        {/* Services Section */}
        <div>
          <Services />
        </div>

        {/* Gallery Section */}
        <Gallery />
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="fixed top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl -z-10"
      />

    </div>
  )
}

export default App
