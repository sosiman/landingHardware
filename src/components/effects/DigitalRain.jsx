import { useEffect, useRef } from 'react'

const DigitalRain = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
        resize()
        window.addEventListener('resize', resize)

        const chars = '01アイウエオカキクケコサシスセソタチツテト'.split('')
        const columns = Math.floor(canvas.width / 16)
        const drops = Array(columns).fill(0).map(() => Math.random() * -50)

        const animate = () => {
            const { width, height } = canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, width, height)

            drops.forEach((y, i) => {
                const x = i * 16
                const char = chars[Math.floor(Math.random() * chars.length)]
                const brightness = Math.random() > 0.8 ? 100 : 70
                const hue = 120 + Math.sin(y * 0.05 + i) * 20

                ctx.shadowBlur = brightness > 80 ? 15 : 5
                ctx.shadowColor = `hsla(${hue}, 100%, 50%, 1)`
                ctx.fillStyle = `hsla(${hue}, 100%, ${brightness}%, ${brightness / 100})`
                ctx.font = 'bold 14px monospace'
                ctx.fillText(char, x + 2, y)

                drops[i] = y > height ? Math.random() * -50 : y + 16
            })

            ctx.shadowBlur = 0
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId) }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default DigitalRain
