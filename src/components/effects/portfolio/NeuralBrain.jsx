import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

const BrainParticles = () => {
    const pointsRef = useRef()

    // Generate Brain Shape (approximate with sphere + noise distortion)
    const particleCount = 2000
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            // Random point in sphere
            const u = Math.random()
            const v = Math.random()
            const theta = 2 * Math.PI * u
            const phi = Math.acos(2 * v - 1)
            const r = Math.cbrt(Math.random()) * 2 // Volume distribution

            // Brain-like distortion (two lobes)
            let x = r * Math.sin(phi) * Math.cos(theta)
            let y = r * Math.sin(phi) * Math.sin(theta)
            let z = r * Math.cos(phi)

            // Split lobes
            x += (x > 0 ? 0.3 : -0.3)
            // Flatten bottom
            y *= 0.8

            pos[i * 3] = x
            pos[i * 3 + 1] = y
            pos[i * 3 + 2] = z
        }
        return pos
    }, [])

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            // Pulse effect: Scale slightly
            const t = clock.getElapsedTime()
            const scale = 1 + Math.sin(t * 2) * 0.05
            pointsRef.current.scale.set(scale, scale, scale)
            pointsRef.current.rotation.y = t * 0.1
        }
    })

    return (
        <group>
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#a855f7" // Purple AI Color
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Synapse Lines (Connecting random points) - Simplified as static for perf, or dynamic if needed */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.05} />
            </mesh>
        </group>
    )
}

const NeuralBrain = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: false }}
            >
                <color attach="background" args={['#050005']} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <BrainParticles />
                </Float>

                {/* Electric Lighting */}
                <pointLight position={[5, 5, 5]} intensity={2} color="#d8b4fe" />
                <pointLight position={[-5, -5, -5]} intensity={2} color="#a855f7" />
            </Canvas>
        </div>
    )
}

export default NeuralBrain
