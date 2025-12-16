import { useEffect, useRef } from 'react'

const PlasmaOrb = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId, time = 0

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
        resize()
        window.addEventListener('resize', resize)

        const animate = () => {
            const { width, height } = canvas
            const cx = width / 2, cy = height / 2
            ctx.clearRect(0, 0, width, height)
            time += 0.03

            // Rayos de plasma
            for (let i = 0; i < 12; i++) {
                const baseAngle = (i / 12) * Math.PI * 2 + time * 0.5
                ctx.beginPath()
                ctx.moveTo(cx, cy)

                let px = cx, py = cy
                for (let j = 0; j < 8; j++) {
                    const dist = 15 + j * 15
                    const wobble = Math.sin(time * 5 + i + j * 0.5) * 15
                    const angle = baseAngle + wobble * 0.03
                    px = cx + Math.cos(angle) * dist
                    py = cy + Math.sin(angle) * dist
                    ctx.lineTo(px, py)
                }

                const hue = 280 + Math.sin(time + i) * 50
                ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.8)`
                ctx.lineWidth = 3
                ctx.shadowBlur = 20
                ctx.shadowColor = `hsla(${hue}, 100%, 50%, 1)`
                ctx.stroke()
            }

            // Orbe central
            const orbSize = 35 + Math.sin(time * 3) * 8
            for (let layer = 3; layer >= 0; layer--) {
                const size = orbSize + layer * 12
                const hue = 270 + layer * 20
                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size)
                grad.addColorStop(0, `hsla(${hue}, 100%, 85%, ${1 - layer * 0.2})`)
                grad.addColorStop(0.5, `hsla(${hue}, 100%, 60%, ${0.6 - layer * 0.15})`)
                grad.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`)
                ctx.fillStyle = grad
                ctx.shadowBlur = 30
                ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.8)`
                ctx.beginPath()
                ctx.arc(cx, cy, size, 0, Math.PI * 2)
                ctx.fill()
            }

            ctx.shadowBlur = 0
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId) }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default PlasmaOrb
