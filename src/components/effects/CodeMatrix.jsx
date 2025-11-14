import React, { useRef, useEffect } from 'react'

const CodeMatrix = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let columns = []
    let particles = []
    let mouseX = rect.width / 2
    let mouseY = rect.height / 2
    let animationId

    const codeSymbols = ['<', '>', '{', '}', '(', ')', '[', ']', '=', '+', '-', '*', '/', ';', ':', '.', ',', '|', '&', '!', '?', '#', '$', '@', '%', '^', '~']
    const fontSize = 14
    const columnCount = Math.floor(rect.width / fontSize)

    class Column {
      constructor(x) {
        this.x = x
        this.y = Math.random() * -100
        this.speed = Math.random() * 3 + 2
        this.symbols = []
        this.length = Math.floor(Math.random() * 15) + 10
        
        for (let i = 0; i < this.length; i++) {
          this.symbols.push(codeSymbols[Math.floor(Math.random() * codeSymbols.length)])
        }
        
        this.hue = Math.random() * 60 + 180 // Azules/Cyans
      }

      update() {
        this.y += this.speed
        
        if (this.y - this.length * fontSize > rect.height) {
          this.y = Math.random() * -100
          this.speed = Math.random() * 3 + 2
          this.symbols = []
          for (let i = 0; i < this.length; i++) {
            this.symbols.push(codeSymbols[Math.floor(Math.random() * codeSymbols.length)])
          }
        }

        // Cambio aleatorio de símbolos
        if (Math.random() < 0.05) {
          const idx = Math.floor(Math.random() * this.symbols.length)
          this.symbols[idx] = codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
        }
      }

      draw(ctx) {
        this.symbols.forEach((symbol, i) => {
          const yPos = this.y - i * fontSize
          if (yPos > 0 && yPos < rect.height) {
            const alpha = i === 0 ? 1 : (this.symbols.length - i) / this.symbols.length
            
            // Glow effect
            if (i < 3) {
              ctx.shadowBlur = 15
              ctx.shadowColor = `hsla(${this.hue}, 90%, 70%, ${alpha})`
            }
            
            ctx.fillStyle = `hsla(${this.hue}, 90%, ${70 - i * 2}%, ${alpha * 0.95})`
            ctx.font = `${fontSize}px 'Courier New', monospace`
            ctx.fillText(symbol, this.x, yPos)
            
            if (i < 3) {
              ctx.shadowBlur = 0
            }
          }
        })
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.size = Math.random() * 2 + 1
        this.hue = Math.random() * 60 + 180
        this.life = 1
        this.decay = Math.random() * 0.01 + 0.005
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decay

        // Reacción al mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 80) {
          const force = (80 - distance) / 80
          this.vx -= (dx / distance) * force * 0.5
          this.vy -= (dy / distance) * force * 0.5
        }

        if (this.x < 0 || this.x > rect.width) this.vx *= -1
        if (this.y < 0 || this.y > rect.height) this.vy *= -1
      }

      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, ${this.life * 0.8})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsla(${this.hue}, 90%, 70%, ${this.life})`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      isDead() {
        return this.life <= 0
      }
    }

    // Crear columnas
    for (let i = 0; i < columnCount; i++) {
      columns.push(new Column(i * fontSize))
    }

    // Crear partículas iniciales
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle())
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      
      // Crear partículas en el mouse
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle())
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Actualizar y dibujar columnas
      columns.forEach(column => {
        column.update()
        column.draw(ctx)
      })

      // Actualizar y dibujar partículas
      particles = particles.filter(particle => !particle.isDead())
      
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      // Mantener un número mínimo de partículas
      while (particles.length < 20) {
        particles.push(new Particle())
      }

      // Dibujar conexiones entre partículas cercanas
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const alpha = (1 - distance / 100) * Math.min(particle.life, otherParticle.life)
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha * 0.3})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
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

export default CodeMatrix
