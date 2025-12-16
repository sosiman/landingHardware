import { useEffect, useRef } from 'react'

const CosmicPortal = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId, time = 0

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
        resize()
        window.addEventListener('resize', resize)

        const stars = Array.from({ length: 100 }, () => ({
            angle: Math.random() * Math.PI * 2,
            dist: Math.random(),
            speed: 0.5 + Math.random() * 0.5,
            size: 1 + Math.random() * 2
        }))

        const animate = () => {
            const { width, height } = canvas
            const cx = width / 2, cy = height / 2
            ctx.clearRect(0, 0, width, height)
            time += 0.02

            // Anillos del portal
            for (let r = 0; r < 8; r++) {
                const radius = 30 + r * 15 + Math.sin(time * 2 + r) * 5
                const hue = 300 + r * 10 + Math.sin(time + r) * 20
                const alpha = 0.4 - r * 0.04

                ctx.save()
                ctx.translate(cx, cy)
                ctx.rotate(time * (0.5 - r * 0.06) * (r % 2 ? 1 : -1))

                ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha})`
                ctx.lineWidth = 3 - r * 0.2
                ctx.shadowBlur = 15
                ctx.shadowColor = `hsla(${hue}, 100%, 50%, ${alpha})`
                ctx.beginPath()
                ctx.arc(0, 0, radius, 0, Math.PI * 1.5)
                ctx.stroke()
                ctx.restore()
            }

            // Estrellas siendo absorbidas
            stars.forEach(star => {
                star.dist -= 0.008 * star.speed
                if (star.dist <= 0) { star.dist = 1; star.angle = Math.random() * Math.PI * 2 }

                const maxDist = Math.min(width, height) * 0.45
                const x = cx + Math.cos(star.angle + time * 0.3) * star.dist * maxDist
                const y = cy + Math.sin(star.angle + time * 0.3) * star.dist * maxDist
                const alpha = star.dist
                const hue = 280 + star.dist * 60

                ctx.shadowBlur = 10 + (1 - star.dist) * 15
                ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${alpha})`
                ctx.fillStyle = `hsla(${hue}, 100%, 85%, ${alpha})`
                ctx.beginPath()
                ctx.arc(x, y, star.size * (1 - star.dist * 0.5), 0, Math.PI * 2)
                ctx.fill()
            })

            // Núcleo
            const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 25)
            coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)')
            coreGrad.addColorStop(0.3, 'rgba(200, 150, 255, 0.9)')
            coreGrad.addColorStop(1, 'rgba(139, 92, 246, 0)')
            ctx.shadowBlur = 40
            ctx.shadowColor = 'rgba(200, 150, 255, 1)'
            ctx.fillStyle = coreGrad
            ctx.beginPath()
            ctx.arc(cx, cy, 25 + Math.sin(time * 4) * 5, 0, Math.PI * 2)
            ctx.fill()

            ctx.shadowBlur = 0
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId) }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default CosmicPortal
