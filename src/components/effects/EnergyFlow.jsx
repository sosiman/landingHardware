import React, { useRef, useEffect } from 'react'
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl'

const EnergyFlow = ({ hue = 140, speed = 1.0 }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const renderer = new Renderer({ alpha: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    container.appendChild(gl.canvas)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width * dpr, height * dpr)
      gl.canvas.style.width = width + 'px'
      gl.canvas.style.height = height + 'px'
    }
    window.addEventListener('resize', resize)
    resize()

    const vertex = `
      attribute vec2 position;
      varying vec2 vUv;
      
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragment = `
      precision highp float;
      
      uniform float uTime;
      uniform vec3 uResolution;
      uniform float uHue;
      uniform float uSpeed;
      varying vec2 vUv;
      
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      void main() {
        vec2 uv = vUv;
        float time = uTime * uSpeed;
        
        // Create energy flow pattern
        vec2 flowDir = normalize(vec2(1.0, 0.5));
        
        float flow = dot(uv, flowDir);
        float flowTime = flow * 3.0 - time * 2.0;
        float energy = sin(flowTime) * 0.5 + 0.5;
        
        // Add perpendicular waves
        vec2 perpDir = normalize(vec2(-0.5, 1.0));
        float perp = dot(uv, perpDir);
        float perpWave = sin(perp * 8.0 + time) * 0.3 + 0.7;
        
        // Create pulses
        float pulse = sin(time * 3.0 + length(uv - vec2(0.5)) * 5.0) * 0.5 + 0.5;
        
        float intensity = energy * perpWave * pulse;
        
        vec3 color = hsv2rgb(vec3(uHue / 360.0, 0.9, intensity * 0.7 + 0.3));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec3(gl.canvas.width, gl.canvas.height, 0) },
        uHue: { value: hue },
        uSpeed: { value: speed }
      }
    })

    const mesh = new Mesh(gl, { geometry, program })

    let time = 0
    const animate = () => {
      time += 0.016 * speed
      program.uniforms.uTime.value = time
      renderer.render({ scene: mesh })
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      container.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [hue, speed])

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

export default EnergyFlow

