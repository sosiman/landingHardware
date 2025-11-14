import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MetallicText from './effects/MetallicText'
import Galaxy from './effects/Galaxy'
import Services from './Services'
import Gallery from './Gallery'

const ServicesGalleryUnified = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <section className="relative">
      {/* Galaxy Background Effect - COMPARTIDO por ambas secciones */}
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

      {/* Services Content */}
      <div className="relative z-10">
        <Services />
      </div>

      {/* Gallery Content - SIN su propio fondo */}
      <div className="relative z-10">
        <Gallery />
      </div>
    </section>
  )
}

export default ServicesGalleryUnified
