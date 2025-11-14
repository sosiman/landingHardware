import React, { useRef, useEffect } from 'react'

const NeuralNetwork = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let nodes = []
    let mouseX = -1000
    let mouseY = -1000
    let animationId

    class Node {
      constructor() {
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
        this.connections = []
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > rect.width) this.vx *= -1
        if (this.y < 0 || this.y > rect.height) this.vy *= -1

        // Repulsión del mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 80) {
          const force = (80 - distance) / 80
          this.x -= (dx / distance) * force * 3
          this.y -= (dy / distance) * force * 3
        }
      }

      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(168, 85, 247, 0.95)'
        ctx.fill()

        // Glow effect más intenso
        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(168, 85, 247, 0.9)'
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    // Crear nodos
    for (let i = 0; i < 40; i++) {
      nodes.push(new Node())
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Dibujar conexiones
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            const alpha = 1 - distance / 120
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.6})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Actualizar y dibujar nodos
      nodes.forEach(node => {
        node.update()
        node.draw(ctx)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
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

export default NeuralNetwork
