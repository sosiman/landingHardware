import React, { useEffect, useRef } from 'react'

const MetallicText = ({ 
  children, 
  className = "",
  speed = 0.3,
  scale = 2,
  shimmer = true 
}) => {
  const textRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    const text = textRef.current
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const rect = text.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    
    let time = 0

    const animate = () => {
      if (!ctx) return
      
      time += speed * 0.01
      
      // Create metallic gradient
      const gradient = ctx.createLinearGradient(
        0, 
        0, 
        canvas.width, 
        canvas.height
      )
      
      // Animated metallic colors
      const offset1 = (Math.sin(time) + 1) / 2
      const offset2 = (Math.sin(time + 2) + 1) / 2
      const offset3 = (Math.sin(time + 4) + 1) / 2
      
      gradient.addColorStop(0, `rgba(200, 200, 220, ${0.3 + offset1 * 0.4})`)
      gradient.addColorStop(0.25, `rgba(255, 255, 255, ${0.8 + offset2 * 0.2})`)
      gradient.addColorStop(0.5, `rgba(180, 180, 200, ${0.5 + offset3 * 0.3})`)
      gradient.addColorStop(0.75, `rgba(255, 255, 255, ${0.9 + offset1 * 0.1})`)
      gradient.addColorStop(1, `rgba(200, 200, 220, ${0.4 + offset2 * 0.3})`)
      
      // Apply to text
      if (text) {
        text.style.backgroundImage = `linear-gradient(
          ${120 + Math.sin(time) * 30}deg,
          rgba(200, 200, 220, 0.4) 0%,
          rgba(255, 255, 255, 0.9) 25%,
          rgba(180, 180, 200, 0.6) 50%,
          rgba(255, 255, 255, 1) 75%,
          rgba(200, 200, 220, 0.5) 100%
        )`
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
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
        backgroundImage: 'linear-gradient(120deg, rgba(200, 200, 220, 0.4) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(180, 180, 200, 0.6) 50%, rgba(255, 255, 255, 1) 75%, rgba(200, 200, 220, 0.5) 100%)',
        animation: 'shimmer 3s ease-in-out infinite',
        textShadow: `
          0 0 10px rgba(255, 255, 255, 0.3),
          0 0 20px rgba(200, 200, 255, 0.2),
          0 0 30px rgba(150, 150, 255, 0.1)
        `
      }}
    >
      {children}
    </span>
  )
}

export default MetallicText
