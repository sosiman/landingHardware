import React, { useRef, useEffect } from 'react'

const DataFlow = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let streams = []
    let mouseX = rect.width / 2
    let mouseY = rect.height / 2
    let animationId

    class DataStream {
      constructor(x) {
        this.x = x
        this.y = Math.random() * rect.height
        this.speed = Math.random() * 2 + 1
        this.length = Math.random() * 30 + 20
        this.hue = Math.random() * 60 + 160 // Verde/Cyan
      }

      update() {
        this.y += this.speed

        // Interacción con el mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 60) {
          const force = (60 - distance) / 60
          this.x += (dx / distance) * force * 2
        }

        if (this.y > rect.height + this.length) {
          this.y = -this.length
          this.x = Math.random() * rect.width
        }
      }

      draw(ctx) {
        for (let i = 0; i < this.length; i++) {
          const alpha = (this.length - i) / this.length
          ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, ${alpha * 0.95})`
          ctx.fillRect(this.x, this.y - i, 3, 3)
          
          // Glow para las partículas principales
          if (i < 5) {
            ctx.shadowBlur = 10
            ctx.shadowColor = `hsla(${this.hue}, 90%, 70%, 0.8)`
            ctx.fillRect(this.x, this.y - i, 3, 3)
            ctx.shadowBlur = 0
          }
        }
      }
    }

    // Crear streams de datos
    for (let i = 0; i < 30; i++) {
      streams.push(new DataStream(Math.random() * rect.width))
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      streams.forEach(stream => {
        stream.update()
        stream.draw(ctx)
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

export default DataFlow
