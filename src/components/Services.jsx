import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MetallicText from './effects/MetallicText'

// Animated Bot SVG component with custom color
const AnimatedBot = ({ color, glowColor }) => (
  <motion.div className="relative">
    {/* Glow ring behind */}
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
        filter: `blur(8px)`
      }}
    />

    {/* Bot SVG */}
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{
        y: [0, -3, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
    >
      {/* Head */}
      <motion.rect
        x="3" y="11" width="18" height="10" rx="2"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Antenna */}
      <motion.line
        x1="12" y1="11" x2="12" y2="7"
        animate={{ y2: [7, 5, 7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12" cy="5" r="2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        fill={glowColor}
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Left Eye */}
      <motion.circle
        cx="9" cy="16" r="1.5"
        fill={color}
        stroke="none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      {/* Right Eye */}
      <motion.circle
        cx="15" cy="16" r="1.5"
        fill={color}
        stroke="none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
      {/* Mouth */}
      <motion.path
        d="M9 19h6"
        animate={{ d: ["M9 19h6", "M9 18.5 Q12 20 15 18.5", "M9 19h6"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Left Ear */}
      <motion.rect
        x="1" y="14" width="2" height="4" rx="1"
        animate={{ x: [1, 0, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right Ear */}
      <motion.rect
        x="21" y="14" width="2" height="4" rx="1"
        animate={{ x: [21, 22, 21] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>

    {/* Online indicator */}
    <motion.div
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
      style={{
        backgroundColor: '#22c55e',
        borderColor: glowColor
      }}
    >
      <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
    </motion.div>
  </motion.div>
)

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const services = [
    {
      title: "Agente de Ventas",
      description: "Atención 24/7, cualificación de leads y cierre de ventas automático.",
      color: "#3b82f6",        // Azul
      glowColor: "#60a5fa",
      bgGradient: "from-blue-500/20 to-blue-600/5",
      borderColor: "#3b82f6"
    },
    {
      title: "Agente de Cobranza",
      description: "Gestión automatizada de recordatorios, facturación y cobros.",
      color: "#eab308",        // Amarillo
      glowColor: "#facc15",
      bgGradient: "from-yellow-500/20 to-yellow-600/5",
      borderColor: "#eab308"
    },
    {
      title: "Agente de Logística",
      description: "Coordinación de despachos, estatus de envíos y control de stock.",
      color: "#a855f7",        // Morado
      glowColor: "#c084fc",
      bgGradient: "from-purple-500/20 to-purple-600/5",
      borderColor: "#a855f7"
    },
    {
      title: "Agente de Conciliación",
      description: "Revisión automática de transferencias y cuadres de caja.",
      color: "#92400e",        // Marrón
      glowColor: "#b45309",
      bgGradient: "from-amber-700/20 to-amber-800/5",
      borderColor: "#92400e"
    }
  ]

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
    hidden: {
      y: 60,
      opacity: 0,
      filter: "blur(10px)"
    },
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
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl"
          >
            <MetallicText className="chrome-text">
              Nuestros Servicios
            </MetallicText>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-lg"
          >
            A diferencia del software comercial, cada agente se configura individualmente para tu empresa.
            Se integran a tus plataformas web sin complicaciones.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -8
              }}
              className={`group relative p-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden`}
              style={{ borderLeftWidth: '3px', borderLeftColor: service.borderColor }}
            >
              {/* Bot Icon */}
              <div className="flex justify-center mb-6">
                <AnimatedBot color={service.color} glowColor={service.glowColor} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg text-center">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-base text-center">
                {service.description}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${service.glowColor} 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
