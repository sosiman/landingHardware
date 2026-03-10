import React, { useEffect, useRef } from 'react'

const MetallicText = ({
  children,
  className = "",
  speed = 0.2,
  scale = 2,
  shimmer = true
}) => {
  const textRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    const text = textRef.current
    let time = 0

    const animate = () => {
      time += speed * 0.01

      // Dynamic dark metallic gradient
      if (text) {
        // We use dark colors as base for extreme readability on beige
        const baseColor = "rgba(24, 24, 27, 1)" // Zinc-900
        const midColor = "rgba(63, 63, 70, 1)"  // Zinc-700
        const shineColor = "rgba(255, 255, 255, 0.9)" // The metallic sparkle

        const angle = 120 + Math.sin(time) * 30

        text.style.backgroundImage = `linear-gradient(
          ${angle}deg,
          ${baseColor} 0%,
          ${midColor} 25%,
          ${shineColor} 48%,
          ${shineColor} 52%,
          ${midColor} 75%,
          ${baseColor} 100%
        )`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (shimmer) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, scale, shimmer])

  return (
    <span
      ref={textRef}
      className={`metallic-text ${className}`}
      style={{
        backgroundSize: '200% 200%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        // Fallback or static version
        backgroundImage: 'linear-gradient(120deg, #18181b 0%, #3f3f46 45%, #ffffff 50%, #3f3f46 55%, #18181b 100%)',
        // Darker shadow to separate from beige
        textShadow: `0 1px 2px rgba(0, 0, 0, 0.2)`
      }}
    >
      {children}
    </span>
  )
}

export default MetallicText
