import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, MessageCircle } from 'lucide-react'
import Orb from './effects/Orb'

const OrbBot = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isWidgetReady, setIsWidgetReady] = useState(false)

  useEffect(() => {
    // 1. Inject Styles to hide default button
    const style = document.createElement('style')
    style.innerHTML = `
      #anything-llm-embed-chat-button-container {
        display: none !important;
      }
      #anything-llm-embed-chat-container {
        z-index: 9999 !important;
      }
    `
    document.head.appendChild(style)

    // 2. Inject AnythingLLM Script
    const script = document.createElement('script')
    script.dataset.embedId = "cf316f17-0b46-4ae0-83b2-158c758a9ffc"
    script.dataset.baseApiUrl = "https://anything.lockthard.es/api/embed"
    script.src = "https://anything.lockthard.es/embed/anythingllm-chat-widget.min.js"
    script.async = true
    script.onload = () => {
      setIsWidgetReady(true)
      console.log('AnythingLLM Widget Loaded')
    }

    // Check if script already exists
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.body.appendChild(script)
    } else {
      setIsWidgetReady(true)
    }

    return () => {
      // Optional: Cleanup if needed, but usually scripts persist
      document.head.removeChild(style)
    }
  }, [])

  const handleOpenChat = () => {
    // Trigger the hidden button click
    const widgetButton = document.querySelector('#anything-llm-embed-chat-button-container button')
    if (widgetButton) {
      widgetButton.click()
    } else {
      console.warn('AnythingLLM widget button not found yet.')
    }
  }

  return (
    <>
      {/* Orb con Bot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative w-64 h-64 cursor-pointer"
        style={{ willChange: 'transform, opacity' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenChat}
      >
        {/* Efecto Orb de fondo */}
        <div className="absolute inset-0">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={260}
            forceHoverState={isHovered}
          />
        </div>

        {/* Contenedor del Bot sobre el Orb */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Icono del Bot con Glassmorphism */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Círculo de fondo con glassmorphism */}
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-2xl">
              <Bot className="w-12 h-12 text-white drop-shadow-lg" />
            </div>

            {/* Indicador de estado (online) */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white/20 shadow-lg"
            >
              <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
            </motion.div>

            {/* Icono de mensaje flotante */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0,
                rotate: isHovered ? [0, -10, 10, 0] : 0
              }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>

          {/* Texto descriptivo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0.8,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-white font-semibold text-lg drop-shadow-lg">
              Asistente IA
            </p>
            <motion.p
              animate={{
                opacity: isHovered ? 1 : 0
              }}
              className="text-gray-300 text-sm mt-1"
            >
              Haz clic para chatear
            </motion.p>
          </motion.div>

          {/* Partículas flotantes decorativas */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-blue-400/50 rounded-full blur-sm"
              style={{
                top: `${30 + i * 15}%`,
                left: `${20 + i * 25}%`
              }}
            />
          ))}
        </div>

        {/* Anillo pulsante al hacer hover */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.15, 1] : 1,
            opacity: isHovered ? [0.5, 0.2, 0.5] : 0
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-4 border-blue-500/50 rounded-full"
        />
      </motion.div>
    </>
  )
}

export default OrbBot
