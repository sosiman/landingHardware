import React, { useRef, useEffect } from 'react'

const ShieldField = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let hexagons = []
    let mouseX = rect.width / 2
    let mouseY = rect.height / 2
    let animationId
    let time = 0

    class Hexagon {
      constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.baseSize = size
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseOffset = Math.random() * Math.PI * 2
      }

      update(time) {
        // Efecto de pulso
        this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 2

        // Reacción al mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 80) {
          const force = (80 - distance) / 80
          this.size = this.baseSize * (1 + force * 0.5)
        }
      }

      draw(ctx) {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i
          const x = this.x + Math.cos(angle) * this.size
          const y = this.y + Math.sin(angle) * this.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()

        // Calcular distancia al mouse para el color
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const intensity = Math.max(0, 1 - distance / 150)

        ctx.strokeStyle = `rgba(99, 102, 241, ${0.5 + intensity * 0.7})`
        ctx.lineWidth = 2
        ctx.stroke()

        if (intensity > 0.2) {
          ctx.fillStyle = `rgba(99, 102, 241, ${intensity * 0.25})`
          ctx.fill()
        }
      }
    }

    // Crear patrón hexagonal
    const hexSize = 25
    const horizontalSpacing = hexSize * Math.sqrt(3)
    const verticalSpacing = hexSize * 1.5

    for (let row = 0; row < rect.height / verticalSpacing + 2; row++) {
      for (let col = 0; col < rect.width / horizontalSpacing + 2; col++) {
        const x = col * horizontalSpacing + (row % 2) * (horizontalSpacing / 2)
        const y = row * verticalSpacing
        hexagons.push(new Hexagon(x, y, hexSize))
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      time++
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      hexagons.forEach(hex => {
        hex.update(time)
        hex.draw(ctx)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
}

export default ShieldField
