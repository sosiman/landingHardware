import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import MetallicText from './effects/MetallicText'
import Galaxy from './effects/Galaxy'
import CodeMatrix from './effects/CodeMatrix'
import NeuralNetwork from './effects/NeuralNetwork'
import DataFlow from './effects/DataFlow'
import GeometricMorph from './effects/GeometricMorph'
import ShieldField from './effects/ShieldField'
import KnowledgeOrbs from './effects/KnowledgeOrbs'
import OpenAIChat from './OpenAIChat'
import OpenAIImageChat from './OpenAIImageChat'
import CodexChat from './CodexChat'
import { ThreeDMarquee } from './ui/3d-marquee'
import HyperCube4D from './effects/HyperCube4D'
import QuantumShield from './effects/QuantumShield'
import DataVortex from './effects/DataVortex'
import ErrorBoundary from './ErrorBoundary'

// Iconos animados con React
const CodeIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    animate={{
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <motion.polyline
      points="16 18 22 12 16 6"
      animate={{ x: [0, 2, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.polyline
      points="8 6 2 12 8 18"
      animate={{ x: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

const CpuIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <motion.rect
      x="9" y="9" width="6" height="6"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    />
    <line x1="4" y1="1" x2="4" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="16" y1="1" x2="16" y2="4" />
    <line x1="4" y1="20" x2="4" y2="23" />
    <line x1="10" y1="20" x2="10" y2="23" />
    <line x1="16" y1="20" x2="16" y2="23" />
    <line x1="1" y1="4" x2="4" y2="4" />
    <line x1="1" y1="10" x2="4" y2="10" />
    <line x1="1" y1="16" x2="4" y2="16" />
    <line x1="20" y1="4" x2="23" y2="4" />
    <line x1="20" y1="10" x2="23" y2="10" />
    <line x1="20" y1="16" x2="23" y2="16" />
  </motion.svg>
)

const OpenAIIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    animate={{
      rotate: [0, 360],
      scale: [1, 1.1, 1]
    }}
    transition={{
      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <motion.path
      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
)

const ImageIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    animate={{
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <motion.circle
      cx="8.5" cy="8.5" r="1.5"
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.polyline
      points="21 15 16 10 5 21"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />
    <motion.path
      d="M21 21L16 16L12 20"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
    />
  </motion.svg>
)

const GlobeIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <circle cx="12" cy="12" r="10" />
    <motion.line
      x1="2" y1="12" x2="22" y2="12"
      animate={{ scaleX: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </motion.svg>
)

const ShieldIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    />
    <motion.path
      d="M12 8v4"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <circle cx="12" cy="16" r="1" />
  </motion.svg>
)

const UsersIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="9" cy="7" r="4" />
    <motion.path
      d="M23 21v-2a4 4 0 0 0-3-3.87"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.circle
      cx="16" cy="7" r="4"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isImageChatOpen, setIsImageChatOpen] = useState(false)
  const [isCodexChatOpen, setIsCodexChatOpen] = useState(false)
  const [isTransformacionOpen, setIsTransformacionOpen] = useState(false)
  const [isCiberseguridadOpen, setIsCiberseguridadOpen] = useState(false)
  const [isCapacitacionOpen, setIsCapacitacionOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [pendingChatAction, setPendingChatAction] = useState(null)
  const [passwordError, setPasswordError] = useState(false)

  const handlePasswordProtectedAction = (action) => {
    setPendingChatAction(() => action)
    setIsPasswordModalOpen(true)
    setPasswordInput('')
    setPasswordError(false)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordInput === 'sosi') {
      setIsPasswordModalOpen(false)
      if (pendingChatAction) {
        pendingChatAction()
      }
      setPasswordInput('')
      setPasswordError(false)
      setPendingChatAction(null)
    } else {
      setPasswordError(true)
      setPasswordInput('')
    }
  }

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false)
    setPasswordInput('')
    setPasswordError(false)
    setPendingChatAction(null)
  }

  const services = [
    {
      icon: <CodeIcon />,
      title: "Desarrollo de Software",
      description: "Aplicaciones web y móviles personalizadas con las últimas tecnologías",
      color: "from-blue-500 to-cyan-500",
      CanvasEffect: CodeMatrix,
      onClick: () => handlePasswordProtectedAction(() => setIsCodexChatOpen(true))
    },
    {
      icon: <OpenAIIcon />,
      title: "Consultoría Tecnológica",
      description: "Asesoramiento estratégico para optimizar tus procesos digitales con IA",
      color: "from-purple-500 to-pink-500",
      CanvasEffect: NeuralNetwork,
      onClick: () => handlePasswordProtectedAction(() => setIsChatOpen(true))
    },
    {
      icon: <ImageIcon />,
      title: "Procesamiento de Imágenes",
      description: "Generación y procesamiento de imágenes con IA usando DALL-E 3",
      color: "from-green-500 to-emerald-500",
      CanvasEffect: DataFlow,
      onClick: () => handlePasswordProtectedAction(() => setIsImageChatOpen(true))
    },
    {
      icon: <GlobeIcon />,
      title: "Transformación Digital",
      description: "Modernización completa de infraestructuras y procesos empresariales",
      color: "from-orange-500 to-red-500",
      CanvasEffect: HyperCube4D,
      onClick: () => setIsTransformacionOpen(true)
    },
    {
      icon: <ShieldIcon />,
      title: "Ciberseguridad",
      description: "Protección integral de sistemas y datos empresariales",
      color: "from-indigo-500 to-blue-500",
      CanvasEffect: QuantumShield,
      onClick: () => window.open('https://app.topoexport.com/', '_blank', 'width=1400,height=900,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes')
    },
    {
      icon: <UsersIcon />,
      title: "Web Scraper",
      description: "Turn websites into LLM-ready data",
      color: "from-teal-500 to-green-500",
      CanvasEffect: DataVortex,
      onClick: () => setIsCapacitacionOpen(true)
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
      {/* Galaxy ya NO está aquí - ahora está en App.jsx compartido */}

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
            className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl flex items-center justify-center gap-6"
          >
            {/* Bouncy Easing Curve Visualization */}
            <motion.svg
              width="140"
              height="70"
              viewBox="0 0 140 70"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="hidden md:block"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="25%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="75%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="neonGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main animated curve - bouncy spring effect */}
              <motion.path
                d="M 10 60 L 15 10 L 20 45 L 25 35 L 30 42 L 35 40 L 40 43 L 50 42 L 60 44 L 80 43 L 100 44 L 130 45"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#neonGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.9))' }}
              />

              {/* Thicker glow layer behind */}
              <motion.path
                d="M 10 60 L 15 10 L 20 45 L 25 35 L 30 42 L 35 40 L 40 43 L 50 42 L 60 44 L 80 43 L 100 44 L 130 45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              />

              {/* End point with pulse */}
              <motion.circle
                cx="130"
                cy="45"
                r="4"
                fill="#06b6d4"
                filter="url(#neonGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 2
                }}
              />

              {/* Pulsing ring effect */}
              <motion.circle
                cx="130"
                cy="45"
                r="6"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 2],
                  opacity: [0.7, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: 2.2,
                  repeat: Infinity,
                  repeatDelay: 0.3
                }}
              />
            </motion.svg>

            <MetallicText className="chrome-text">
              Nuestros Servicios
            </MetallicText>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-lg"
          >
            Ofrecemos soluciones tecnológicas integrales que impulsan el crecimiento
            y la innovación en tu empresa
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5
              }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (service.onClick) {
                  service.onClick()
                }
              }}
              className={`group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden ${service.onClick ? 'cursor-pointer hover:shadow-2xl hover:shadow-purple-500/30' : ''
                }`}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
              }}
            >
              {/* Canvas Effect Background or Marquee */}
              {/* Canvas Effect Background or Marquee */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {service.marqueeImages ? (
                  <div className="w-full h-full absolute inset-0">
                    <ThreeDMarquee
                      images={service.marqueeImages}
                      className="!h-full !bg-transparent"
                      cols={4}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 opacity-70 group-hover:opacity-90 transition-opacity duration-500 bg-black/30">
                    <ErrorBoundary>
                      <service.CanvasEffect />
                    </ErrorBoundary>
                  </div>
                )}
              </div>

              {/* Gradient Overlay on Hover */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                whileHover={{ scale: 1.1 }}
              />

              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 text-white shadow-lg z-10`}
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-300 transition-all duration-300 drop-shadow-lg z-10">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 z-10">
                {service.description}
              </p>

              {/* Border Effects */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-white/10 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClosePasswordModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Lock icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </motion.div>

            <h3 className="text-2xl font-bold text-white text-center mb-2">
              Acceso Protegido
            </h3>
            <p className="text-gray-400 text-center mb-6">
              Ingresa la contraseña para acceder a este servicio
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-6">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Contraseña"
                  autoFocus
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border ${passwordError ? 'border-red-500' : 'border-white/10'
                    } text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                />
                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500"
                  >
                    Contraseña incorrecta. Inténtalo de nuevo.
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Acceder
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Codex Chat Modal - Desarrollo de Software */}
      <CodexChat isOpen={isCodexChatOpen} onClose={() => setIsCodexChatOpen(false)} />

      {/* OpenAI Chat Modal - Consultoría Tecnológica */}
      <OpenAIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* OpenAI Image Chat Modal - Procesamiento de Imágenes */}
      <OpenAIImageChat isOpen={isImageChatOpen} onClose={() => setIsImageChatOpen(false)} />

      {/* Web Scraper Modal */}
      {isCapacitacionOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCapacitacionOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-teal-500/20 to-green-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-green-500">
                  <UsersIcon />
                </div>
                <h2 className="text-2xl font-bold text-white">Web Scraper</h2>
              </div>
              <button
                onClick={() => setIsCapacitacionOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-6 flex justify-center"
              >
                <div className="p-6 rounded-full bg-gradient-to-br from-teal-500 to-green-500">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Firecrawl Web Scraper
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Turn websites into LLM-ready data
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://www.firecrawl.dev/', '_blank', 'width=1400,height=900,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes')
                  setIsCapacitacionOpen(false)
                }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold text-lg hover:from-teal-600 hover:to-green-600 transition-all shadow-lg shadow-teal-500/50"
              >
                🔍 Abrir Firecrawl
              </motion.button>

              <p className="text-gray-500 text-sm mt-6">
                La plataforma se abrirá en una ventana separada para una mejor experiencia
              </p>
            </div>
          </motion.div>
        </div>
      )}



      {/* Transformación Digital Modal */}
      {isTransformacionOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsTransformacionOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-orange-500/20 to-red-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                  <GlobeIcon />
                </div>
                <h2 className="text-2xl font-bold text-white">Transformación Digital</h2>
              </div>
              <button
                onClick={() => setIsTransformacionOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-6 flex justify-center"
              >
                <div className="p-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Acceso a Plataforma de Transformación
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Selecciona la plataforma que deseas abrir
              </p>

              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.open('https://messenger.abeto.co/', '_blank', 'width=1400,height=900,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes')
                    setIsTransformacionOpen(false)
                  }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-500/50"
                >
                  📱 Abrir Messenger Abeto
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.open('https://www.airconsole.com/', '_blank', 'width=1400,height=900,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes')
                    setIsTransformacionOpen(false)
                  }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 text-white font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-fuchsia-600 transition-all shadow-lg shadow-purple-500/50"
                >
                  🎮 Abrir AirConsole
                </motion.button>
              </div>

              <p className="text-gray-500 text-sm mt-6">
                Las plataformas se abrirán en ventanas separadas para una mejor experiencia
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default Services
