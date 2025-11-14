import React, { useRef, useEffect } from 'react'

const GeometricMorph = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let shapes = []
    let mouseX = rect.width / 2
    let mouseY = rect.height / 2
    let animationId
    let time = 0

    class Shape {
      constructor() {
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.size = Math.random() * 30 + 10
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
        this.sides = Math.floor(Math.random() * 4) + 3
        this.hue = Math.random() * 60 + 20 // Naranja/Rojo
      }

      update(time) {
        this.rotation += this.rotationSpeed

        // Movimiento ondulante
        this.x += Math.sin(time * 0.001 + this.y * 0.01) * 0.5
        this.y += Math.cos(time * 0.001 + this.x * 0.01) * 0.5

        // Mantener dentro del canvas
        if (this.x < -this.size) this.x = rect.width + this.size
        if (this.x > rect.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = rect.height + this.size
        if (this.y > rect.height + this.size) this.y = -this.size

        // Reacción al mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          const force = (100 - distance) / 100
          this.size = (Math.random() * 30 + 10) * (1 + force)
        }
      }

      draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        ctx.beginPath()
        for (let i = 0; i < this.sides; i++) {
          const angle = (Math.PI * 2 * i) / this.sides
          const x = Math.cos(angle) * this.size
          const y = Math.sin(angle) * this.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()

        ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, 0.3)`
        ctx.fill()
        ctx.strokeStyle = `hsla(${this.hue}, 80%, 70%, 0.6)`
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.restore()
      }
    }

    // Crear formas
    for (let i = 0; i < 15; i++) {
      shapes.push(new Shape())
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      time++
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      shapes.forEach(shape => {
        shape.update(time)
        shape.draw(ctx)
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

export default GeometricMorph
