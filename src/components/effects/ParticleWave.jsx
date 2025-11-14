import React, { useRef, useEffect } from 'react'

const ParticleWave = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let particles = []
    let mouseX = rect.width / 2
    let mouseY = rect.height / 2
    let animationId

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.vx = 0
        this.vy = 0
        this.size = Math.random() * 2 + 1
        this.hue = Math.random() * 60 + 200 // Tonos azules/morados
      }

      update(mouseX, mouseY) {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          this.vx -= (dx / distance) * force * 2
          this.vy -= (dy / distance) * force * 2
        }

        this.vx += (this.baseX - this.x) * 0.05
        this.vy += (this.baseY - this.y) * 0.05
        this.vx *= 0.95
        this.vy *= 0.95

        this.x += this.vx
        this.y += this.vy
      }

      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, 0.95)`
        ctx.fill()
        
        // Agregar glow
        ctx.shadowBlur = 15
        ctx.shadowColor = `hsla(${this.hue}, 90%, 70%, 0.8)`
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    // Crear partículas en forma de onda
    for (let x = 0; x < rect.width; x += 15) {
      for (let y = 0; y < rect.height; y += 15) {
        particles.push(new Particle(x, y))
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      particles.forEach(particle => {
        particle.update(mouseX, mouseY)
        particle.draw(ctx)
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

export default ParticleWave
