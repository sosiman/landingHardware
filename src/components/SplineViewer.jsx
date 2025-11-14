import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

// Lazy load Spline para mejor rendimiento
const Spline = lazy(() => import('@splinetool/react-spline'))

const SplineViewer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8 }}
      className="hidden lg:block absolute bottom-20 left-16 w-60 h-80 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-purple-500/20"
      style={{ zIndex: 1 }}
    >
      <div className="h-full w-full relative">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="text-white text-xs">Cargando...</div>
          </div>
        }>
          <Spline
            scene="https://prod.spline.design/jC8wT6-vOH-i-Q39/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </div>
    </motion.div>
  )
}

export default SplineViewer
