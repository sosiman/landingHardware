import { useEffect, useRef } from 'react'

const HologramGrid = () => {
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
            ctx.clearRect(0, 0, width, height)
            time += 0.025

            const gridSize = 30
            const cols = Math.ceil(width / gridSize) + 1
            const rows = Math.ceil(height / gridSize) + 1
            const offset = time * 20 % gridSize

            // Grid perspectiva
            for (let i = 0; i < rows; i++) {
                const y = i * gridSize - offset
                const perspY = y / height
                const alpha = 0.2 + perspY * 0.3
                const hue = 190 + Math.sin(time + i * 0.2) * 30

                ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${alpha})`
                ctx.lineWidth = 1 + perspY
                ctx.shadowBlur = 8
                ctx.shadowColor = `hsla(${hue}, 100%, 50%, ${alpha})`
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }

            for (let j = 0; j < cols; j++) {
                const x = j * gridSize
                const wave = Math.sin(time * 2 + j * 0.3) * 3
                const hue = 180 + wave * 10

                ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.35)`
                ctx.lineWidth = 1.5
                ctx.shadowBlur = 10
                ctx.shadowColor = `hsla(${hue}, 100%, 50%, 0.5)`
                ctx.beginPath()
                ctx.moveTo(x + wave, 0)
                ctx.lineTo(x - wave, height)
                ctx.stroke()
            }

            // Puntos de intersección brillantes
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if ((i + j) % 3 === 0) {
                        const x = j * gridSize, y = i * gridSize - offset
                        const pulse = 2 + Math.sin(time * 4 + i + j) * 1.5
                        const hue = 200 + Math.sin(time + i * j * 0.1) * 30
                        ctx.fillStyle = `hsla(${hue}, 100%, 80%, 0.9)`
                        ctx.shadowBlur = 15
                        ctx.shadowColor = `hsla(${hue}, 100%, 60%, 1)`
                        ctx.beginPath()
                        ctx.arc(x, y, pulse, 0, Math.PI * 2)
                        ctx.fill()
                    }
                }
            }

            ctx.shadowBlur = 0
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId) }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default HologramGrid
