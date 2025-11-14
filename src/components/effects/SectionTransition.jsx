import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SectionTransition = ({ 
  fromColor = "from-black", 
  toColor = "to-black",
  height = "h-32",
  position = "bottom" // "top" o "bottom"
}) => {
  const { scrollYProgress } = useScroll()
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  )

  const gradientDirection = position === "bottom" 
    ? "bg-gradient-to-b" 
    : "bg-gradient-to-t"

  return (
    <motion.div 
      style={{ opacity }}
      className={`absolute ${position}-0 left-0 right-0 ${height} ${gradientDirection} ${fromColor} ${toColor} pointer-events-none z-10`}
    >
      {/* Partículas flotantes para suavizar más */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default SectionTransition
