import { useEffect, useRef } from 'react'

const AtomicCore = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId, time = 0

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
        resize()
        window.addEventListener('resize', resize)

        const electrons = [
            { orbit: 50, speed: 0.03, offset: 0, tilt: 0.3 },
            { orbit: 70, speed: -0.025, offset: Math.PI * 0.66, tilt: 0.5 },
            { orbit: 90, speed: 0.02, offset: Math.PI * 1.33, tilt: 0.2 }
        ]

        const animate = () => {
            const { width, height } = canvas
            const cx = width / 2, cy = height / 2
            ctx.clearRect(0, 0, width, height)
            time += 0.03

            // Órbitas
            electrons.forEach((e, i) => {
                ctx.save()
                ctx.translate(cx, cy)
                ctx.rotate(e.offset + time * 0.2)
                ctx.scale(1, e.tilt)

                const hue = 40 + i * 30
                ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.3)`
                ctx.lineWidth = 2
                ctx.shadowBlur = 10
                ctx.shadowColor = `hsla(${hue}, 100%, 50%, 0.5)`
                ctx.beginPath()
                ctx.arc(0, 0, e.orbit, 0, Math.PI * 2)
                ctx.stroke()
                ctx.restore()
            })

            // Electrones
            electrons.forEach((e, i) => {
                const angle = time * e.speed * 60 + e.offset
                ctx.save()
                ctx.translate(cx, cy)
                ctx.rotate(e.offset + time * 0.2)
                ctx.scale(1, e.tilt)

                const ex = Math.cos(angle) * e.orbit
                const ey = Math.sin(angle) * e.orbit
                const hue = 40 + i * 30
                const size = 6 + Math.sin(time * 5 + i) * 2

                ctx.shadowBlur = 25
                ctx.shadowColor = `hsla(${hue}, 100%, 60%, 1)`
                ctx.fillStyle = `hsla(${hue}, 100%, 75%, 1)`
                ctx.beginPath()
                ctx.arc(ex, ey, size, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            })

            // Núcleo
            const coreSize = 20 + Math.sin(time * 4) * 5
            const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize + 15)
            coreGrad.addColorStop(0, 'rgba(255, 200, 100, 1)')
            coreGrad.addColorStop(0.5, 'rgba(255, 150, 50, 0.8)')
            coreGrad.addColorStop(1, 'rgba(255, 100, 0, 0)')
            ctx.shadowBlur = 40
            ctx.shadowColor = 'rgba(255, 150, 50, 1)'
            ctx.fillStyle = coreGrad
            ctx.beginPath()
            ctx.arc(cx, cy, coreSize, 0, Math.PI * 2)
            ctx.fill()

            ctx.shadowBlur = 0
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId) }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default AtomicCore
