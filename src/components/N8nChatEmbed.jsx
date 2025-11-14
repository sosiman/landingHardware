import { useEffect, useRef, useState } from 'react'
import '@n8n/chat/style.css'
import { createChat } from '@n8n/chat'

const N8nChatEmbed = ({ isOpen, onClose }) => {
  const chatContainerRef = useRef(null)
  const chatInstanceRef = useRef(null)

  useEffect(() => {
    if (isOpen && chatContainerRef.current && !chatInstanceRef.current) {
      // Crear instancia del chat de n8n
      chatInstanceRef.current = createChat({
        webhookUrl: 'https://n8n.lockthard.es/webhook/e441c669-2611-43ef-8dfa-883508753f46/chat',
        mode: 'fullscreen',
        target: '#n8n-chat-container',
        showWelcomeScreen: true,
        initialMessages: [
          '¡Hola! Soy Sonar-Pro, el asistente IA de Innovate Solutions',
          '¿En qué puedo ayudarte hoy?'
        ],
        i18n: {
          en: {
            title: 'Sonar-Pro - Asistente IA',
            subtitle: 'Conectado con n8n - Disponible 24/7',
            inputPlaceholder: 'Escribe tu mensaje...',
            footer: 'Powered by Innovate Solutions',
            getStarted: 'Iniciar Conversación'
          }
        },
        enableStreaming: false,
        loadPreviousSession: true,
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId'
      })
    }

    // Cleanup cuando se desmonta
    return () => {
      if (chatInstanceRef.current) {
        // n8n chat no tiene método destroy, pero podemos limpiar el contenedor
        if (chatContainerRef.current) {
          chatContainerRef.current.innerHTML = ''
        }
        chatInstanceRef.current = null
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Contenedor del chat con efecto cristal */}
      <div className="relative w-full h-full max-w-4xl max-h-[90vh] m-4 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenedor del chat de n8n */}
        <div
          id="n8n-chat-container"
          ref={chatContainerRef}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default N8nChatEmbed
