import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Copy, Check, Code, MessageSquare } from 'lucide-react';

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const detectCodeBlocks = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim()
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          model: 'gpt-4o'
        })
      });

      if (!response.ok) throw new Error('Error en la respuesta');

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.response,
        model: data.model_used
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Error al conectar con el servidor. Verifica que el backend esté corriendo.',
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col border border-red-500/30"
        >
          <div className="flex items-center justify-between p-4 border-b border-red-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center">
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">GPT-4o AI</h2>
                <p className="text-xs text-gray-400">Powered by OpenAI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-400 hover:text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Inicia una conversación con GPT-4o AI</p>
                <p className="text-sm mt-2">Pregunta lo que quieras, puedo ayudarte con código, ideas y más</p>
              </div>
            )}

            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : message.error
                      ? 'bg-red-900/30 border border-red-500/50 text-red-200'
                      : 'bg-gray-800/50 border border-purple-500/30 text-gray-100'
                  }`}
                >
                  {message.role === 'assistant' && !message.error ? (
                    <div className="space-y-3">
                      {detectCodeBlocks(message.content).map((part, partIndex) => (
                        <div key={partIndex}>
                          {part.type === 'code' ? (
                            <div className="relative group">
                              <div className="flex items-center justify-between bg-gray-900/80 px-3 py-2 rounded-t-lg border border-purple-500/30">
                                <div className="flex items-center gap-2">
                                  <Code size={14} className="text-purple-400" />
                                  <span className="text-xs text-purple-400 font-mono">{part.language}</span>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(part.content, `${index}-${partIndex}`)}
                                  className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 hover:bg-purple-600/40 rounded text-xs text-purple-300 transition-colors"
                                >
                                  {copiedIndex === `${index}-${partIndex}` ? (
                                    <>
                                      <Check size={12} />
                                      Copiado
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} />
                                      Copiar
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="bg-gray-950 p-4 rounded-b-lg overflow-x-auto border border-t-0 border-purple-500/30">
                                <code className="text-sm font-mono text-gray-300">{part.content}</code>
                              </pre>
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap">{part.content}</div>
                          )}
                        </div>
                      ))}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-purple-500/20">
                        <span className="text-xs text-gray-500">{message.model || 'claude-sonnet-4-5'}</span>
                        <button
                          onClick={() => copyToClipboard(message.content, `full-${index}`)}
                          className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 hover:bg-purple-600/40 rounded text-xs text-purple-300 transition-colors"
                        >
                          {copiedIndex === `full-${index}` ? (
                            <>
                              <Check size={12} />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              Copiar todo
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-800/50 border border-purple-500/30 rounded-2xl p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-purple-500/30">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje... (Shift+Enter para nueva línea)"
                className="flex-1 bg-gray-800/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all flex items-center gap-2"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Presiona Enter para enviar • Shift+Enter para nueva línea
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatWindow;
