import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CarViewer3D = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.85)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl h-[80vh] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-black/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-orange-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-gray-900/90 to-transparent backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-orange-500"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M5 11l-2 7h18l-2-7M5 11V6a6 6 0 0112 0v5M5 11h14"/>
                <circle cx="9" cy="18" r="2"/>
                <circle cx="15" cy="18" r="2"/>
              </motion.svg>
              Lamborghini Vision GT - Visor 3D
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white hover:rotate-90 transition-transform duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Iframe Content */}
          <div className="w-full h-full pt-16">
            <iframe
              src="https://playcanvas-react.vercel.app/examples/model-viewer"
              className="w-full h-full border-0"
              title="Lamborghini 3D Model"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              style={{
                pointerEvents: 'auto',
                touchAction: 'auto'
              }}
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-6 py-3 bg-black/60 backdrop-blur-md rounded-full border border-orange-500/30">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-orange-500"
              >
                🖱️
              </motion.span>
              Click y arrastra para rotar • Scroll para zoom • Click derecho para mover
            </p>
          </div>

          {/* Decorative glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CarViewer3D
