import React from 'react';
import { motion } from 'framer-motion';

const CustomAgentIcon = ({ onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-transparent focus:outline-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            style={{ filter: 'drop-shadow(0px 10px 20px rgba(220, 38, 38, 0.4))' }}
        >
            <motion.svg
                width="60"
                height="60"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    y: [0, -8, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Cuerpo Principal (Círculo rojo redondeado) */}
                <circle cx="50" cy="50" r="35" fill="url(#bodyGradient)" />

                {/* Pequeño rectángulo inferior para aplanar la base un poco */}
                <rect x="35" y="70" width="30" height="15" rx="5" fill="#C2183B" />

                {/* Patas (pequeños recuadros inferiores) */}
                <rect x="42" y="80" width="6" height="10" rx="2" fill="#9E1230" />
                <rect x="52" y="80" width="6" height="10" rx="2" fill="#9E1230" />

                {/* Antenas */}
                <motion.path
                    d="M 35 25 Q 30 15 25 18"
                    stroke="#EF4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="transparent"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: '35px', originY: '25px' }}
                />
                <motion.path
                    d="M 65 25 Q 70 15 75 18"
                    stroke="#EF4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="transparent"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: '65px', originY: '25px' }}
                />

                {/* Manos Flotantes */}
                <motion.ellipse
                    cx="12" cy="55" rx="7" ry="5"
                    fill="url(#handGradient)"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
                />
                <motion.ellipse
                    cx="88" cy="55" rx="7" ry="5"
                    fill="url(#handGradient)"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                />

                {/* Ojos Cyan Brillantes */}
                <g>
                    {/* Ojo Izquierdo */}
                    <circle cx="38" cy="45" r="5" fill="#111827" /> {/* Fondo oscuro */}
                    <circle cx="38" cy="45" r="2.5" fill="#06B6D4" style={{ filter: 'drop-shadow(0 0 3px #22D3EE)' }} /> {/* Brillo */}

                    {/* Ojo Derecho */}
                    <circle cx="62" cy="45" r="5" fill="#111827" /> {/* Fondo oscuro */}
                    <circle cx="62" cy="45" r="2.5" fill="#06B6D4" style={{ filter: 'drop-shadow(0 0 3px #22D3EE)' }} /> {/* Brillo */}
                </g>

                {/* Efecto de "Respiración" en los ojos (Parpadeo de luz cyan) */}
                <motion.circle cx="38" cy="45" r="2.5" fill="#67E8F9" filter="blur(2px)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="62" cy="45" r="2.5" fill="#67E8F9" filter="blur(2px)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />

                {/* Definiciones de gradientes */}
                <defs>
                    <radialGradient id="bodyGradient" cx="50%" cy="30%" r="50%" fx="50%" fy="30%">
                        <stop offset="0%" stopColor="#F87171" /> {/* Rojo claro - brillo superior */}
                        <stop offset="60%" stopColor="#DC2626" /> {/* Rojo base */}
                        <stop offset="100%" stopColor="#991B1B" /> {/* Rojo oscuro - sombra inferior */}
                    </radialGradient>

                    <radialGradient id="handGradient" cx="50%" cy="30%" r="50%">
                        <stop offset="0%" stopColor="#F87171" />
                        <stop offset="100%" stopColor="#DC2626" />
                    </radialGradient>
                </defs>
            </motion.svg>
        </motion.button>
    );
};

export default CustomAgentIcon;
