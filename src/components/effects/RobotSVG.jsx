import React from 'react'
import { motion } from 'framer-motion'

/**
 * SVG replica of the NexBot robot character (the 3D chatbot).
 * Round body, glowing eyes, side ears, top antenna — matching the GLTF model appearance.
 * 
 * Props:
 *  - color: main body color (hex string, e.g. "#3b82f6")
 *  - eyeColor: eye glow color (default: "#22d3ee" cyan like the original)
 *  - size: width/height in px (default: 80)
 *  - animate: whether to animate (default: true)
 */
const RobotSVG = ({ color = "#ef4444", eyeColor = "#22d3ee", size = 80, animate = true }) => {
    const Wrapper = animate ? motion.div : 'div'
    const wrapperProps = animate ? {
        animate: { y: [0, -6, 0], rotate: [0, 2, -2, 0] },
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    } : {}

    return (
        <Wrapper {...wrapperProps} style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Body gradient */}
                    <radialGradient id={`bodyGrad-${color}`} cx="50%" cy="40%" r="55%">
                        <stop offset="0%" stopColor={color} stopOpacity="1" />
                        <stop offset="70%" stopColor={color} stopOpacity="0.85" />
                        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
                    </radialGradient>
                    {/* Eye glow */}
                    <radialGradient id={`eyeGlow-${color}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={eyeColor} stopOpacity="1" />
                        <stop offset="60%" stopColor={eyeColor} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={eyeColor} stopOpacity="0" />
                    </radialGradient>
                    {/* Body outer glow */}
                    <filter id={`glow-${color}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer glow aura */}
                {animate && (
                    <motion.circle
                        cx="60" cy="58" r="48"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        opacity="0.3"
                        animate={{ r: [48, 52, 48], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}

                {/* Main body - round/oval shape */}
                <ellipse
                    cx="60" cy="60" rx="32" ry="34"
                    fill={`url(#bodyGrad-${color})`}
                    filter={`url(#glow-${color})`}
                />

                {/* Body highlight (top reflection) */}
                <ellipse
                    cx="52" cy="46" rx="14" ry="8"
                    fill="white"
                    opacity="0.15"
                />

                {/* Left ear/arm */}
                {animate ? (
                    <motion.ellipse
                        cx="23" cy="58" rx="7" ry="10"
                        fill={color}
                        opacity="0.9"
                        animate={{ cx: [23, 21, 23] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                ) : (
                    <ellipse cx="23" cy="58" rx="7" ry="10" fill={color} opacity="0.9" />
                )}

                {/* Right ear/arm */}
                {animate ? (
                    <motion.ellipse
                        cx="97" cy="58" rx="7" ry="10"
                        fill={color}
                        opacity="0.9"
                        animate={{ cx: [97, 99, 97] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                ) : (
                    <ellipse cx="97" cy="58" rx="7" ry="10" fill={color} opacity="0.9" />
                )}

                {/* Antenna stem */}
                <line x1="60" y1="26" x2="60" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" />

                {/* Antenna tip - glowing ball */}
                {animate ? (
                    <motion.circle
                        cx="60" cy="12" r="5"
                        fill={eyeColor}
                        animate={{
                            r: [5, 6.5, 5],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        filter={`url(#glow-${color})`}
                    />
                ) : (
                    <circle cx="60" cy="12" r="5" fill={eyeColor} />
                )}

                {/* Left eye - glowing */}
                <circle cx="48" cy="56" r="7" fill="black" opacity="0.4" />
                {animate ? (
                    <motion.circle
                        cx="48" cy="56" r="5.5"
                        fill={`url(#eyeGlow-${color})`}
                        animate={{
                            r: [5.5, 6.5, 5.5],
                            opacity: [0.9, 1, 0.9]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                ) : (
                    <circle cx="48" cy="56" r="5.5" fill={eyeColor} />
                )}
                {/* Left eye inner pupil */}
                <circle cx="48" cy="56" r="2.5" fill="white" opacity="0.9" />

                {/* Right eye - glowing */}
                <circle cx="72" cy="56" r="7" fill="black" opacity="0.4" />
                {animate ? (
                    <motion.circle
                        cx="72" cy="56" r="5.5"
                        fill={`url(#eyeGlow-${color})`}
                        animate={{
                            r: [5.5, 6.5, 5.5],
                            opacity: [0.9, 1, 0.9]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                ) : (
                    <circle cx="72" cy="56" r="5.5" fill={eyeColor} />
                )}
                {/* Right eye inner pupil */}
                <circle cx="72" cy="56" r="2.5" fill="white" opacity="0.9" />

                {/* Mouth - small friendly curve */}
                <path
                    d="M52 70 Q60 76 68 70"
                    stroke={eyeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                />

                {/* Small feet/base */}
                <ellipse cx="50" cy="92" rx="8" ry="4" fill={color} opacity="0.7" />
                <ellipse cx="70" cy="92" rx="8" ry="4" fill={color} opacity="0.7" />
            </svg>
        </Wrapper>
    )
}

export default RobotSVG
