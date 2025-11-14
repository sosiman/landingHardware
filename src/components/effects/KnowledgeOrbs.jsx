import React, { useRef, useEffect } from 'react'

const KnowledgeOrbs = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let orbs = []
    let mouseX = rect.width / 2
    let mouseY = rect.height / 2
    let animationId

    class Orb {
      constructor() {
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.radius = Math.random() * 15 + 5
        this.hue = Math.random() * 60 + 140 // Teal/Verde
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Rebote en los bordes
        if (this.x - this.radius < 0 || this.x + this.radius > rect.width) {
          this.vx *= -1
        }
        if (this.y - this.radius < 0 || this.y + this.radius > rect.height) {
          this.vy *= -1
        }

        // Atracción/Repulsión del mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          this.x -= (dx / distance) * force * 1.5
          this.y -= (dy / distance) * force * 1.5
        }

        this.pulsePhase += 0.05
      }

      draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 1

        // Glow exterior
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * pulse * 1.5
        )
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0.6)`)
        gradient.addColorStop(0.5, `hsla(${this.hue}, 80%, 50%, 0.3)`)
        gradient.addColorStop(1, `hsla(${this.hue}, 80%, 40%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * pulse * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Orb interior
        const innerGradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius * pulse
        )
        innerGradient.addColorStop(0, `hsla(${this.hue}, 90%, 80%, 0.9)`)
        innerGradient.addColorStop(1, `hsla(${this.hue}, 80%, 50%, 0.7)`)

        ctx.fillStyle = innerGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Crear orbs
    for (let i = 0; i < 12; i++) {
      orbs.push(new Orb())
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Dibujar conexiones entre orbs cercanos
      orbs.forEach((orb, i) => {
        orbs.slice(i + 1).forEach(otherOrb => {
          const dx = orb.x - otherOrb.x
          const dy = orb.y - otherOrb.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(orb.x, orb.y)
            ctx.lineTo(otherOrb.x, otherOrb.y)
            const alpha = 1 - distance / 100
            ctx.strokeStyle = `rgba(74, 222, 128, ${alpha * 0.2})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      orbs.forEach(orb => {
        orb.update()
        orb.draw(ctx)
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

export default KnowledgeOrbs
