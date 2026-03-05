import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, BrainCircuit, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const CustomAgentChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '¡Hola! Soy tu Agente IA. ¿Cómo puedo ayudarte a optimizar tu empresa hoy?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        const systemPrompt = `Eres 'Asistente Agentes IA', el asistente virtual oficial de Agentes IA. Responde siempre en español, de forma concisa, profesional y amigable. Nunca reveles que eres un modelo de IA específico ni menciones marcas como NVIDIA, MiniMax, OpenAI, etc. Si te preguntan qué modelo eres, di que eres el Asistente de Agentes IA.

## SOBRE LA EMPRESA
Agentes IA ayuda a empresas en Venezuela a fortalecer su operatividad y capacidad de respuesta mediante Agentes de Inteligencia Artificial bajo estándares de calidad y estética europea. Implementamos soluciones que asumen tareas críticas en áreas de cobranza, ventas, logística y conciliación de pagos, reduciendo el margen de error y la carga operativa manual. Con esta inversión, transformas gastos variables en una infraestructura digital estable, recuperando tu enfoque estratégico y el recurso más valioso: el tiempo.

Nuestra arquitectura facilita una escalabilidad genuina al neutralizar los obstáculos operativos que frenan la expansión. Esto asegura que el aumento en tu volumen de negocio no se traduzca en un incremento proporcional de tus costos, garantizando un crecimiento fluido, ágil y potenciado por IA.

## PROPUESTA DE VALOR
"Imagínate tener un equipo digital que nunca duerme y se encarga de cobrar a tus clientes, vender tus productos, organizar tus cuentas y coordinar tus envíos sin cometer errores. Te instalamos un sistema inteligente que guarda toda la información de tu negocio en un solo lugar y hace el trabajo pesado por ti. De esta forma, puedes atender el propósito de tu negocio, sin tener que contratar más personal ni estar pegado al teléfono todo el día, recuperando tu tranquilidad y lo más valioso que tienes: tu tiempo."

## SERVICIOS - 4 AGENTES DE IA
1. **Agente de Ventas**: Automatiza el proceso de ventas, seguimiento de leads, cotizaciones y cierre de negocios.
2. **Agente de Cobranzas**: Gestiona la cobranza de forma autónoma, seguimiento de pagos pendientes, recordatorios y conciliación.
3. **Agente de Logística**: Coordina envíos, inventario y cadena de suministro de forma inteligente.
4. **Agente de Conciliación de Pagos**: Reconcilia automáticamente pagos, facturas y movimientos bancarios.

## MODALIDADES
Vendemos agentes tanto en **hardware físico** (servidores y ordenadores dedicados) como en **la nube (cloud)**. Los agentes automatizan procesos y realizan las tareas de un empleado, orquestados por un agente central o una persona desde el móvil, dirigiendo servidores y ordenadores de forma autónoma.

## EQUIPO DE CONTACTO
- **José Alberto Trujillo Plaza** - Master Full Stack AI Engineering - Teléfono: +34 621208980 - Email: albertotplaza@gmail.com
- **Paul** - Teléfono: +56 942875210

## INSTRUCCIONES
- Puedes responder preguntas generales sobre procesos empresariales, automatización, IA y tecnología aunque no estén específicamente en la web.
- Siempre intenta relacionar las respuestas con cómo Agentes IA puede ayudar al usuario.
- Si el usuario quiere contratar o saber más, comparte los datos de contacto del equipo.
- Sé proactivo sugiriendo cómo nuestros agentes pueden resolver problemas específicos del usuario.`;

        const apiMessages = [
            { role: "system", content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
        ];

        try {
            // Auto-detectar backend: en producción usa api.lockthard.es, en local usa localhost
            const isProduction = window.location.hostname.includes('lockthard.es');
            const apiUrl = import.meta.env.VITE_API_URL || (isProduction ? 'https://api.lockthard.es' : 'http://localhost:3001');

            const response = await fetch(`${apiUrl}/api/chat/nvidia`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) throw new Error('Error en la conexión con el servidor');

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            let done = false;
            let fullContent = '';
            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;

                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const dataStr = line.replace('data: ', '').trim();
                            if (dataStr === '[DONE]') {
                                // Limpiar tags <think> del contenido final
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    const lastMessage = newMessages[newMessages.length - 1];
                                    lastMessage.content = lastMessage.content.replace(/<think>[\s\S]*?<\/think>\s*/g, '').trim();
                                    return newMessages;
                                });
                                setIsLoading(false);
                                break;
                            }
                            if (!dataStr) continue;

                            try {
                                const data = JSON.parse(dataStr);
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    const lastMessage = newMessages[newMessages.length - 1];
                                    lastMessage.content = (lastMessage.content || '') + (data.content || '');
                                    return newMessages;
                                });
                            } catch (e) {
                                // Ignore partial JSON parse errors
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, hubo un error temporal. Intenta nuevamente más tarde.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
                className="fixed bottom-24 right-4 md:right-8 z-50 w-[90vw] md:w-[400px] max-w-[450px] h-[75vh] md:h-[600px] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-2xl bg-black/60 flex flex-col"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(139, 92, 246, 0.15)',
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center text-white">
                                <BrainCircuit size={20} />
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                Asistente NV
                                <span className="px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-500/50 text-[10px] text-purple-300">
                                    GLM-5
                                </span>
                            </h3>
                            <p className="text-xs text-slate-300">Disponible</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3 w-full`}
                        >
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-lg glow">
                                    <BrainCircuit size={16} />
                                </div>
                            )}

                            <div
                                className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                {msg.reasoning && (
                                    <div className="mb-2 text-xs text-slate-400 italic bg-white/5 border border-white/10 rounded-xl p-3 w-full">
                                        <span className="flex items-center gap-1 mb-1 font-semibold text-purple-400">
                                            <BrainCircuit size={12} /> Thinking...
                                        </span>
                                        <div className="prose prose-invert max-w-none text-xs">
                                            <ReactMarkdown>
                                                {msg.reasoning}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}

                                {msg.content && (
                                    <div
                                        className={`p-4 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                            : 'bg-white/10 text-slate-200 rounded-tl-sm border border-white/5 shadow-inner'
                                            }`}
                                    >
                                        <div className="prose prose-invert max-w-none prose-sm prose-p:leading-relaxed">
                                            <ReactMarkdown>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                                <span className="text-[10px] text-slate-500 mt-1 px-1">
                                    {msg.role === 'user' ? 'Tú' : 'Agente'}
                                </span>
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && !messages[messages.length - 1]?.content && !messages[messages.length - 1]?.reasoning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start gap-3 w-full"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shrink-0">
                                <BrainCircuit size={16} />
                            </div>
                            <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin text-purple-400" />
                                <span className="text-sm text-slate-300">Conectando...</span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-md">
                    <form
                        onSubmit={handleSubmit}
                        className="relative flex items-center"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-14 py-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 p-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <span className="text-[10px] text-slate-500">
                            Desarrollado con NVIDIA GLM-5 AI
                        </span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CustomAgentChat;
