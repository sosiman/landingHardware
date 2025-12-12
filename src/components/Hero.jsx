import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronRight, ArrowRight, Sparkles, Car } from 'lucide-react'
import MetallicText from './effects/MetallicText'
import OrbBot from './OrbBot'
import VariableProximity from './effects/VariableProximity'
import N8nChatEmbed from './N8nChatEmbed'
import RobotModel from './RobotModel'
import CarViewer3D from './CarViewer3D'

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const descriptionRef = useRef(null)

  const [currentText, setCurrentText] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isHardwareTestOpen, setIsHardwareTestOpen] = useState(false)
  const [isNeuralNetworkOpen, setIsNeuralNetworkOpen] = useState(false)
  const [isCarViewerOpen, setIsCarViewerOpen] = useState(false)
  const texts = [
    "Soluciones Tecnológicas",
    "Consultoría Especializada",
    "Innovación Digital",
    "Transformación Digital"
  ]

  const heroImages = [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
  ]

  const floatingShots = []

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo base más suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/80" />

      {/* Imagen de fondo con overlay más transparente */}
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
            backgroundPosition: 'center'
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
        className="absolute inset-0 opacity-50"
      />

      {/* Elementos flotantes más transparentes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/15 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/15 rounded-full blur-xl"
      />

      {/* MODELO 3D - Lado izquierdo absoluto */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:block absolute left-0 top-[15%] w-[500px] h-[850px] z-50"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Contenedor del modelo con efectos de glow */}
        <div className="relative w-full h-full">
          {/* Glow effect detrás del modelo */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-3xl rounded-full"
          />

          {/* Modelo 3D */}
          <div className="relative w-full h-full">
            <RobotModel />
          </div>

          {/* Decoración - Anillos orbitales */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-purple-500/20 rounded-full"
            style={{ transform: 'scale(1.1)' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-blue-500/20 rounded-full"
            style={{ transform: 'scale(0.9) rotateX(60deg)' }}
          />
        </div>
      </motion.div>

      {/* OrbBot - Asistente Virtual Interactivo */}
      <div
        className="hidden lg:block absolute bottom-20 right-16 z-50"
        style={{ willChange: 'transform, opacity' }}
      >
        <OrbBot />
      </div>

      {/* CONTENIDO CENTRADO - Como el original */}
      <motion.div
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-6xl"
      >
        {/* Main Title with Metallic Effect */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block">
              <MetallicText className="chrome-text">
                Innovate
              </MetallicText>
            </span>
            <span className="block">
              <MetallicText className="silver-text">
                Solutions
              </MetallicText>
            </span>
          </h1>
        </motion.div>

        {/* Animated Subtitle with Gold Effect */}
        <motion.div variants={itemVariants} className="mb-8 h-16 flex items-center justify-center">
          <motion.h2
            key={currentText}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="text-2xl md:text-4xl font-light"
          >
            <MetallicText className="gold-text">
              {texts[currentText]}
            </MetallicText>
          </motion.h2>
        </motion.div>

        {/* Description with VariableProximity Effect */}
        <motion.div
          ref={descriptionRef}
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
        >
          <VariableProximity
            label="Transformamos tu visión en realidad digital. Especialistas en consultoría tecnológica, desarrollo de software y optimización de sistemas para empresas que buscan liderar el futuro."
            fromFontVariationSettings="'wght' 300, 'opsz' 9"
            toFontVariationSettings="'wght' 900, 'opsz' 40"
            containerRef={descriptionRef}
            radius={120}
            falloff="gaussian"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            onClick={() => setIsHardwareTestOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold overflow-hidden shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Hardware Test
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => setIsChatOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 border-2 border-purple-500/50 rounded-full text-white font-semibold backdrop-blur-sm hover:border-purple-400 hover:bg-purple-500/10 transition-all shadow-lg flex items-center gap-2 overflow-hidden"
          >
            {/* Efecto de brillo animado */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20"
            />

            {/* Icono animado */}
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={20} className="text-purple-400" />
            </motion.div>

            <span className="relative z-10">Agent</span>

            {/* Partículas flotantes */}
            <motion.div
              animate={{
                y: [-2, 2, -2],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full blur-sm"
            />
          </motion.button>

          <motion.button
            onClick={() => setIsNeuralNetworkOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full text-white font-semibold overflow-hidden shadow-lg flex items-center gap-2"
          >
            {/* Efecto de pulso */}
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-teal-500/30 via-emerald-500/30 to-teal-500/30"
            />

            {/* Icono de red neuronal */}
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="relative z-10"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="12" cy="12" r="3" />
              <circle cx="6" cy="6" r="2" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
              <line x1="9" y1="10.5" x2="7.5" y2="7.5" />
              <line x1="15" y1="10.5" x2="16.5" y2="7.5" />
              <line x1="9" y1="13.5" x2="7.5" y2="16.5" />
              <line x1="15" y1="13.5" x2="16.5" y2="16.5" />
            </motion.svg>

            <span className="relative z-10">Redes Neuronales</span>

            {/* Partículas flotantes múltiples */}
            <motion.div
              animate={{
                y: [-3, 3, -3],
                x: [-2, 2, -2],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-2 right-4 w-1.5 h-1.5 bg-emerald-400 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                y: [3, -3, 3],
                x: [2, -2, 2],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-2 right-6 w-1.5 h-1.5 bg-teal-400 rounded-full blur-sm"
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => setIsCarViewerOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-white font-semibold overflow-hidden shadow-lg flex items-center gap-2"
          >
            {/* Efecto de velocidad */}
            <motion.div
              animate={{
                opacity: [0.2, 0.6, 0.2],
                x: ["-100%", "100%"]
              }}
              transition={{
                opacity: { duration: 2, repeat: Infinity },
                x: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            {/* Icono de coche */}
            <motion.div
              animate={{
                x: [0, 3, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10"
            >
              <Car size={20} />
            </motion.div>

            <span className="relative z-10">Visor 3D</span>

            {/* Partículas de velocidad */}
            <motion.div
              animate={{
                x: [-10, 10],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-1/2 left-0 w-2 h-0.5 bg-orange-400 blur-sm"
            />
            <motion.div
              animate={{
                x: [-10, 10],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              className="absolute top-1/2 left-2 w-2 h-0.5 bg-red-400 blur-sm transform translate-y-1"
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* N8n Chat Embed */}
      <N8nChatEmbed isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Hardware Test Modal */}
      <AnimatePresence>
        {isHardwareTestOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.3)' }}
            onClick={() => setIsHardwareTestOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl h-[600px] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-gray-900/90 to-transparent backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Hardware Test
                </h3>
                <button
                  onClick={() => setIsHardwareTestOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white hover:rotate-90 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Iframe */}
              <iframe
                src="https://cznull.github.io/vsbm"
                className="w-full h-full border-0"
                title="Hardware Test"
                sandbox="allow-scripts allow-same-origin allow-forms"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Neural Network Modal */}
      <AnimatePresence>
        {isNeuralNetworkOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.3)' }}
            onClick={() => setIsNeuralNetworkOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl h-[1040px] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-emerald-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-gray-900/90 to-transparent backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  />
                  Redes Neuronales
                </h3>
                <button
                  onClick={() => setIsNeuralNetworkOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white hover:rotate-90 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Iframe - con permisos completos para interacción */}
              <iframe
                src="https://nn-vis.noelith.dev/"
                className="w-full h-full border-0"
                title="Neural Network Visualization"
                sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-modals"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                style={{
                  pointerEvents: 'auto',
                  touchAction: 'auto'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Car Viewer 3D Modal */}
      <CarViewer3D isOpen={isCarViewerOpen} onClose={() => setIsCarViewerOpen(false)} />
    </section>
  )
}

export default Hero
