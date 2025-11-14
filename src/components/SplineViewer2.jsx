import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

// Lazy load Spline para mejor rendimiento
const Spline = lazy(() => import('@splinetool/react-spline'))

const SplineViewer2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="hidden lg:block absolute top-28 left-12 w-56 h-72 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-blue-500/20"
      style={{ zIndex: 1 }}
    >
      <div className="h-full w-full relative">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
            <div className="text-white text-xs">Cargando...</div>
          </div>
        }>
          <Spline
            scene="https://prod.spline.design/EBu8QT-Q1vSFVa7v/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
        
        {/* Texto animado en el centro */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            scale: [0.95, 1.05, 0.95],
            rotateZ: [-2, 2, -2]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                textShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)'
              }}
          >
            lockthard
          </h3>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SplineViewer2
