import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeMatrix from './effects/CodeMatrix'

// Componente para renderizar código con syntax highlighting básico
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-3 rounded-lg overflow-hidden bg-gray-900 border border-cyan-500/30">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-cyan-500/20">
        <span className="text-xs text-cyan-300 font-mono">{language || 'code'}</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600/30 rounded text-xs text-cyan-300 transition-colors"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copiado
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copiar
            </>
          )}
        </motion.button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono">{code}</code>
      </pre>
    </div>
  )
}

// Función para parsear markdown y detectar bloques de código
const parseMessageContent = (content) => {
  const parts = []
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Agregar texto antes del bloque de código
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex, match.index)
      })
    }

    // Agregar bloque de código
    parts.push({
      type: 'code',
      language: match[1] || 'code',
      content: match[2].trim()
    })

    lastIndex = match.index + match[0].length
  }

  // Agregar texto restante
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.substring(lastIndex)
    })
  }

  return parts.length > 0 ? parts : [{ type: 'text', content }]
}

const CodexChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de Desarrollo de Software potenciado por GPT-4o. Puedo ayudarte con código, arquitectura, debugging y mejores prácticas. ¿En qué puedo ayudarte hoy?'
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

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.lockthard.es'
      const response = await fetch(`${apiUrl}/api/chat/codex`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ Error del servidor:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        })

        // Crear mensaje de error detallado
        let errorMessage = errorData.error || 'Error al comunicarse con el servidor'
        if (errorData.details) {
          errorMessage += `\n\nDetalles: ${errorData.details}`
        }
        if (errorData.model) {
          errorMessage += `\n\nModelo: ${errorData.model}`
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply
      }])
    } catch (error) {
      console.error('❌ Error completo:', error)
      const errorMessage = error.message || 'Error desconocido al procesar tu mensaje'
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ **Error:**\n\n${errorMessage}\n\n_Por favor, revisa los logs del servidor o contacta al administrador._`
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
              className="w-full max-w-4xl h-[80vh] bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-gray-900/95 rounded-3xl shadow-2xl overflow-hidden border border-cyan-500/30 pointer-events-auto relative"
            >
              {/* CodeMatrix Background */}
              <div className="absolute inset-0 opacity-30">
                <CodeMatrix />
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between p-6 border-b border-cyan-500/30 bg-black/20 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  {/* Code Icon Animated */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
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
                    </svg>
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Desarrollo de Software IA</h2>
                    <p className="text-sm text-cyan-300">Powered by GPT-4o</p>
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
                {messages.map((message, index) => {
                  const [copiedMsg, setCopiedMsg] = useState(false)

                  const copyMessage = () => {
                    navigator.clipboard.writeText(message.content)
                    setCopiedMsg(true)
                    setTimeout(() => setCopiedMsg(false), 2000)
                  }

                  const parsedContent = message.role === 'assistant'
                    ? parseMessageContent(message.content)
                    : [{ type: 'text', content: message.content }]

                  return (
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
                            ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
                            : 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-100'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1">
                            {parsedContent.map((part, partIndex) => (
                              <div key={partIndex}>
                                {part.type === 'text' ? (
                                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{part.content}</p>
                                ) : (
                                  <CodeBlock code={part.content} language={part.language} />
                                )}
                              </div>
                            ))}
                          </div>
                          {message.role === 'assistant' && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={copyMessage}
                              className="flex-shrink-0 p-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 transition-colors"
                              title="Copiar mensaje completo"
                            >
                              {copiedMsg ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                              )}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}

                {isLoading && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                          </motion.svg>
                        </div>
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-cyan-400 rounded-full"
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
              <div className="relative z-10 p-6 border-t border-cyan-500/30 bg-black/20 backdrop-blur-sm">
                <form onSubmit={sendMessage} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pregunta sobre código, arquitectura, debugging..."
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition-all disabled:opacity-50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-8 py-4 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-2xl text-white font-semibold shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
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

export default CodexChat
