import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DataFlow from './effects/DataFlow'

const OpenAIImageChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de Procesamiento de Imágenes potenciado por DALL-E 3. Describe la imagen que quieres crear y la generaré para ti.'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const generateImage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.lockthard.es'
      const response = await fetch(`${apiUrl}/api/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage.content
        }),
      })

      if (!response.ok) {
        throw new Error('Error al comunicarse con el servidor')
      }

      const data = await response.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.revisedPrompt || userMessage.content,
        imageUrl: data.imageUrl
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, hubo un error al generar tu imagen. Por favor, intenta de nuevo.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  const ImageIcon = () => (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </motion.svg>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-4xl h-[80vh] bg-gradient-to-br from-gray-900/95 via-green-900/90 to-gray-900/95 rounded-3xl shadow-2xl overflow-hidden border border-green-500/30 pointer-events-auto relative"
            >
              {/* DataFlow Background */}
              <div className="absolute inset-0 opacity-30">
                <DataFlow />
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between p-6 border-b border-green-500/30 bg-black/20 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  {/* Image Icon Animated */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Procesamiento de Imágenes IA</h2>
                    <p className="text-sm text-green-300">Powered by DALL-E 3</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>

              {/* Messages Container */}
              <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-4 h-[calc(80vh-180px)]">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                          : 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-100'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-col">
                        {message.role === 'assistant' && (
                          <div className="flex items-start gap-3 w-full">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                            </div>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap flex-1">{message.content}</p>
                          </div>
                        )}
                        {message.role === 'user' && (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        )}
                        {message.imageUrl && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mt-3 w-full"
                          >
                            <img
                              src={message.imageUrl}
                              alt={message.content}
                              className="w-full rounded-xl shadow-2xl border border-green-500/30"
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </motion.svg>
                        </div>
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="relative z-10 p-6 border-t border-green-500/30 bg-black/20 backdrop-blur-sm">
                <form onSubmit={generateImage} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe la imagen que quieres generar..."
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all disabled:opacity-50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-8 py-4 bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-2xl text-white font-semibold shadow-lg shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    {isLoading ? (
                      <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </motion.svg>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>Generar</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default OpenAIImageChat
