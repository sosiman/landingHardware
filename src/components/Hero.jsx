import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Building2, Briefcase, TrendingUp } from 'lucide-react'
import MetallicText from './effects/MetallicText'
import RobotModel from './RobotModel'
import CustomAgentIcon from './CustomAgentIcon'
import CustomAgentChat from './CustomAgentChat'

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const descriptionRef = useRef(null)

  const [currentText, setCurrentText] = useState(0)
  const [isNeuralNetworkOpen, setIsNeuralNetworkOpen] = useState(false)
  const [isCustomChatOpen, setIsCustomChatOpen] = useState(false)
  const texts = [
    "Soluciones Tecnológicas",
    "Consultoría Especializada",
    "Innovación Digital",
    "Transformación Digital"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
      {/* El fondo de carrusel ahora vive globalmente en App.jsx */}

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

      {/* MODELO 3D - Adaptado para Móvil (fondo centrado) y Desktop (lado izquierdo) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-[60vh] sm:h-full flex items-center justify-center opacity-30 pointer-events-none z-0 lg:opacity-100 lg:pointer-events-auto lg:top-[15%] lg:w-[500px] lg:h-[850px] lg:z-50 lg:block lg:justify-start"
        style={{ willChange: 'transform, opacity', mixBlendMode: 'screen' }}
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
                Agentes IA
              </MetallicText>
            </span>
            <span className="block">
              <MetallicText className="silver-text">
                para Empresas
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

        {/* Description - Redesigned as a Grid of Cards for better readability */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto"
        >
          {/* Card 1 */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-purple-500/50 transition-colors text-left flex flex-col gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg w-fit">
              <Building2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Estándar Europeo</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ayudamos a empresas en Venezuela a fortalecer su operatividad y capacidad de respuesta mediante Agentes de IA bajo los más altos estándares de calidad.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 transition-colors text-left flex flex-col gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg w-fit">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Automatización Crítica</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Asumimos tareas en cobranza, ventas, logística y conciliación de pagos, reduciendo drásticamente el margen de error y la carga operativa manual.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-emerald-500/50 transition-colors text-left flex flex-col gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg w-fit">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Escalabilidad Genuina</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforma gastos en infraestructura estable. El aumento en volumen de negocio no incrementará tus costos proporcionalmente. Recupera tu tiempo.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >



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

        </motion.div>
      </motion.div>

      {/* Nuevo Asistente IA NV - Right Side */}
      <CustomAgentIcon onClick={() => setIsCustomChatOpen(true)} />
      <CustomAgentChat isOpen={isCustomChatOpen} onClose={() => setIsCustomChatOpen(false)} />

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
    </section>
  )
}

export default Hero
