import React from 'react'
import { motion } from 'framer-motion'
import { X, Bot } from 'lucide-react'

const ChatBot = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay oscuro detrás del chat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        style={{ right: '-72px' }}
        className="fixed bottom-20 w-96 h-[32rem] backdrop-blur-2xl bg-white/5 rounded-3xl shadow-2xl border border-white/20 flex flex-col z-[61] overflow-hidden"
      >
        {/* Efecto de cristal - capas de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-4 border-b border-white/20 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white/30 shadow-lg shadow-green-400/50"></span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Asistente IA</h3>
              <p className="text-xs text-green-400">● En línea</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        {/* Iframe content */}
        <div className="flex-1 bg-white/5 relative">
          <iframe
            src="https://anything.lockthard.es/embed/cf316f17-0b46-4ae0-83b2-158c758a9ffc"
            className="w-full h-full border-none"
            title="AnythingLLM Assistant"
            allow="clipboard-write"
          />
        </div>
      </motion.div>
    </>
  )
}

export default ChatBot
